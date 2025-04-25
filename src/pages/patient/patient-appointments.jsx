import PatientLayout from "@/components/patient-layout";
import { useAuth } from "@/config/AuthContext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/patient/patient-appointments.module.css";

const provinces = {
  "Metro Manila": ["Quezon City", "Manila", "Makati"],
  Cebu: ["Cebu City", "Mandaue", "Lapu-Lapu"],
  Davao: ["Davao City", "Panabo", "Tagum"],
};

const clinics = {
  "Quezon City": [
    { name: "Quezon Clinic", address: "123 Quezon Ave", contact: "09123456789" },
    { name: "HealthFirst QC", address: "456 Commonwealth", contact: "09223456789" },
  ],
  "Cebu City": [
    { name: "Cebu Health Center", address: "789 Osmena Blvd", contact: "09323456789" },
    { name: "Wellness Cebu", address: "321 Mango Ave", contact: "09423456789" },
  ],
  "Davao City": [
    { name: "Davao Medical", address: "654 Roxas Blvd", contact: "09523456789" },
    { name: "Southern Care", address: "987 San Pedro", contact: "09623456789" },
  ],
};

const appointmentReasons = [
  "Claiming of Eyeglasses",
  "Checkup",
  "Follow-up Consultation",
  "Medical Certificate",
  "Laboratory Test",
  "Vaccination",
  "Dental Checkup",
  "Eye Examination",
  "Physical Therapy",
  "Other (Please specify)"
];

const generateTimeSlots = () => {
  const slots = {};
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  
  for (let i = 0; i < 60; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    const slotCount = 3 + Math.floor(Math.random() * 3);
    const daySlots = [];
    
    for (let j = 0; j < slotCount; j++) {
      const hour = 8 + Math.floor(Math.random() * 8);
      const minute = Math.random() > 0.5 ? 0 : 30;
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour;
      
      daySlots.push(`${displayHour}:${minute === 0 ? '00' : '30'} ${period}`);
    }
    
    slots[formattedDate] = daySlots.sort((a, b) => {
      const timeToMinutes = (time) => {
        const [timePart, period] = time.split(' ');
        const [hours, minutes] = timePart.split(':').map(Number);
        return (period === 'PM' && hours !== 12 ? hours + 12 : hours) * 60 + minutes;
      };
      return timeToMinutes(a) - timeToMinutes(b);
    });
  }
  
  return slots;
};

const availableTimeSlots = generateTimeSlots();

const PatientAppointments = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  // Location and Clinic State
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [clinic, setClinic] = useState(null);
  
  // Appointment State
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  
  // Patient Information
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  
  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setCity("");
    setClinic(null);
    resetAppointmentDetails();
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setClinic(null);
    resetAppointmentDetails();
  };

  const handleClinicSelect = (e) => {
    const selectedClinic = clinics[city]?.find(
      (clinic) => clinic.name === e.target.value
    );
    setClinic(selectedClinic);
    resetAppointmentDetails();
  };

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };

  const resetAppointmentDetails = () => {
    setSelectedDate("");
    setSelectedTime("");
    setReason("");
    setOtherReason("");
    setError("");
  };

  const handleDateClick = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    if (availableTimeSlots[formattedDate]) {
      setSelectedDate(formattedDate);
      setSelectedTime("");
      setError("");
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setError("");
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    if (e.target.value !== "Other (Please specify)") {
      setOtherReason("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      setError("Please upload a PDF file only");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!province || !city || !clinic) {
      setError("Please select a clinic location");
      return;
    }
    
    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time");
      return;
    }
    
    if (!reason) {
      setError("Please select a reason for your appointment");
      return;
    }
    
    if (reason === "Other (Please specify)" && !otherReason.trim()) {
      setError("Please specify your reason for appointment");
      return;
    }
    
    if (!name || !sex || !email || !contactNumber) {
      setError("Please fill in all required patient information");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError("");
      
      // In a real app, you would upload the file and submit the form data here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess("Appointment booked successfully!");
      resetAppointmentDetails();
    } catch (err) {
      setError(err.message || "Failed to book appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const selectMonth = (monthIndex) => {
    setCurrentMonth(monthIndex);
    setShowMonthYearPicker(false);
  };

  const selectYear = (year) => {
    setCurrentYear(year);
    setShowMonthYearPicker(false);
  };

  const toggleMonthYearPicker = () => {
    setShowMonthYearPicker(!showMonthYearPicker);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateWithin4Days = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fourDaysLater = new Date(today);
    fourDaysLater.setDate(today.getDate() + 4);
    
    return date >= today && date <= fourDaysLater;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      const isPast = date < new Date();
      const isWithin4Days = isDateWithin4Days(date);
      
      days.push({
        day: i,
        date,
        available: !isPast && !isWithin4Days && !!availableTimeSlots[formattedDate],
        formattedDate,
        isPast,
        isWithin4Days
      });
    }
    
    const weeks = [];
    while (days.length > 0) {
      weeks.push(days.splice(0, 7));
    }
    
    return weeks;
  };

  const weeks = renderCalendar();
  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long' });
  const currentDate = new Date();
  const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() + i);

  if (!user) return null;

  return (
    <div className={styles.appointmentContainer}>
      <PatientLayout>
        <main className={styles.appointmentMain}>
          <h1 className={styles.pageTitle}>Book an Appointment</h1>
          
          <div className={styles.appointmentGrid}>
            {/* Left Column - Location and Clinic Details */}
            <div className={styles.leftColumn}>
              <div className={`${styles.formSection} ${styles.uniformSection}`}>
                <h2 className={styles.sectionTitle}>
                  <i className={`${styles.icon} ${styles.locationIcon}`}>📍</i> Select Location
                </h2>
                <div className={styles.formContent}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Country</label>
                    <input type="text" value="Philippines" readOnly className={styles.formInput} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Province</label>
                    <select
                      className={styles.formInput}
                      value={province}
                      onChange={handleProvinceChange}
                    >
                      <option value="">Select Province</option>
                      {Object.keys(provinces).map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>City</label>
                    <select
                      className={styles.formInput}
                      value={city}
                      onChange={handleCityChange}
                      disabled={!province}
                    >
                      <option value="">Select City</option>
                      {provinces[province]?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.formSection} ${styles.uniformSection}`}>
                <h2 className={styles.sectionTitle}>
                  <i className={`${styles.icon} ${styles.clinicIcon}`}>🏥</i> Clinic Details
                </h2>
                <div className={styles.formContent}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Clinic Name</label>
                    <select
                      className={styles.formInput}
                      onChange={handleClinicSelect}
                      disabled={!city}
                    >
                      <option value="">Select Clinic</option>
                      {clinics[city]?.map((clinic) => (
                        <option key={clinic.name} value={clinic.name}>
                          {clinic.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Clinic Address</label>
                    <input
                      type="text"
                      value={clinic?.address || ""}
                      readOnly
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Contact Number</label>
                    <input
                      type="text"
                      value={clinic?.contact || ""}
                      readOnly
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Date/Time and Appointment Details */}
            <div className={styles.rightColumn}>
              <div className={`${styles.formSection} ${styles.uniformSection}`}>
                <h2 className={styles.sectionTitle}>
                  <i className={`${styles.icon} ${styles.calendarIcon}`}>📅</i> Select Date & Time
                </h2>
                <div className={styles.formContent}>
                  <div className={styles.availabilityInfo}>
                    <span className={styles.earliestAvailable}>
                      <i className={styles.infoIcon}>ℹ️</i> Earliest available: <strong>{Object.keys(availableTimeSlots).sort()[0]}</strong>
                    </span>
                  </div>
                  
                  <div className={styles.calendarSection}>
                    <div className={styles.calendarContainer}>
                      <div className={styles.calendarHeader}>
                        <button className={styles.navButton} onClick={() => navigateMonth('prev')}>
                          <span className={styles.chevron}>‹</span>
                        </button>
                        <button className={styles.monthYearDisplay} onClick={toggleMonthYearPicker}>
                          {monthName} {currentYear}
                        </button>
                        <button className={styles.navButton} onClick={() => navigateMonth('next')}>
                          <span className={styles.chevron}>›</span>
                        </button>
                      </div>
                      
                      {showMonthYearPicker ? (
                        <div className={styles.monthYearPicker}>
                          <div className={styles.monthGrid}>
                            {Array.from({ length: 12 }).map((_, i) => (
                              <button
                                key={i}
                                className={`${styles.monthOption} ${i === currentMonth ? styles.selected : ''}`}
                                onClick={() => selectMonth(i)}
                              >
                                {new Date(currentYear, i).toLocaleDateString('en-US', { month: 'short' })}
                              </button>
                            ))}
                          </div>
                          <div className={styles.yearList}>
                            {years.map((year) => (
                              <button
                                key={year}
                                className={`${styles.yearOption} ${year === currentYear ? styles.selected : ''}`}
                                onClick={() => selectYear(year)}
                              >
                                {year}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className={styles.weekdays}>
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                              <div key={day} className={styles.weekday}>{day}</div>
                            ))}
                          </div>
                          <div className={styles.daysGrid}>
                            {weeks.map((week, weekIndex) => (
                              <div key={weekIndex} className={styles.weekRow}>
                                {week.map((day, dayIndex) => (
                                  <button
                                    key={dayIndex}
                                    className={`${styles.dayCell} ${day ? 
                                      day.isPast ? styles.past : 
                                      day.isWithin4Days ? styles.within4Days : 
                                      day.available ? styles.available : styles.unavailable 
                                      : styles.empty} 
                                      ${selectedDate === day?.formattedDate ? styles.selected : ''}`}
                                    onClick={() => day && !day.isPast && !day.isWithin4Days && handleDateClick(day.date)}
                                    disabled={day?.isPast || day?.isWithin4Days || !day?.available}
                                  >
                                    {day?.day || ''}
                                  </button>
                                ))}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      
                      <div className={styles.calendarLegend}>
                        <div className={styles.legendItem}>
                          <span className={`${styles.legendColor} ${styles.available}`}></span>
                          <span>Available</span>
                        </div>
                        <div className={styles.legendItem}>
                          <span className={`${styles.legendColor} ${styles.unavailable}`}></span>
                          <span>Fully Booked</span>
                        </div>
                        <div className={styles.legendItem}>
                          <span className={`${styles.legendColor} ${styles.within4Days}`}></span>
                          <span>Within 4 Days</span>
                        </div>
                        <div className={styles.legendItem}>
                          <span className={`${styles.legendColor} ${styles.past}`}></span>
                          <span>Past Date</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedDate && (
                      <div className={styles.timeSlotSection}>
                        <h3 className={styles.timeSlotTitle}>
                          <i className={`${styles.icon} ${styles.clockIcon}`}>⏰</i> Available Time Slots
                        </h3>
                        <div className={styles.timeSlotsVertical}>
                          {availableTimeSlots[selectedDate]?.map((time) => (
                            <div key={time} className={styles.timeSlotRadio}>
                              <input
                                type="radio"
                                id={`time-${time}`}
                                name="appointment-time"
                                value={time}
                                checked={selectedTime === time}
                                onChange={() => handleTimeSelect(time)}
                              />
                              <label htmlFor={`time-${time}`}>
                                <span className={styles.timeDisplay}>{time}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className={`${styles.formSection} ${styles.uniformSection}`}>
                <h2 className={styles.sectionTitle}>
                  <i className={`${styles.icon} ${styles.detailsIcon}`}>📝</i> Appointment Details
                </h2>
                <div className={styles.formContent}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Reason for Appointment</label>
                    <select
                      className={styles.formInput}
                      value={reason}
                      onChange={handleReasonChange}
                    >
                      <option value="">Select Reason</option>
                      {appointmentReasons.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {reason === "Other (Please specify)" && (
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Please specify</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        value={otherReason}
                        onChange={handleOtherReasonChange}
                        placeholder="Enter your reason"
                      />
                    </div>
                  )}
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name <span className={styles.required}>*</span></label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Sex <span className={styles.required}>*</span></label>
                    <select
                      className={styles.formInput}
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                    >
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email <span className={styles.required}>*</span></label>
                    <input
                      type="email"
                      className={styles.formInput}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Contact Number <span className={styles.required}>*</span></label>
                    <input
                      type="tel"
                      className={styles.formInput}
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="Enter your contact number"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Upload PDF File</label>
                    <div className={styles.fileUpload}>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf"
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        className={styles.uploadButton}
                        onClick={() => fileInputRef.current.click()}
                      >
                        {pdfFile ? pdfFile.name : "Choose PDF File"}
                      </button>
                    </div>
                  </div>
                  
                  {error && (
                    <div className={`${styles.alert} ${styles.alertDanger}`}>
                      <i className={styles.alertIcon}>⚠️</i> {error}
                    </div>
                  )}
                  
                  {success && (
                    <div className={`${styles.alert} ${styles.alertSuccess}`}>
                      <i className={styles.alertIcon}>✓</i> {success}
                    </div>
                  )}
                  
                  <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={isSubmitting || !selectedDate || !selectedTime || !reason || !clinic || 
                      (reason === "Other (Please specify)" && !otherReason) || !name || !sex || !email || !contactNumber}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner}></span> Booking...
                      </>
                    ) : (
                      "Confirm Appointment"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PatientLayout>
    </div>
  );
};

export default PatientAppointments;
