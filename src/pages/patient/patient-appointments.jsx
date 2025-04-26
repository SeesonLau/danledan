import PatientLayout from "@/components/patient-layout";
import { useAuth } from "@/config/AuthContext";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/patient/patient-appointments.module.css";

import AppointmentProgressSteps from "@/components/patient/appointments/appointmentProgressSteps.jsx";
import AppointmentLocation from "@/components/patient/appointments/appointmentLocation.jsx";
import ClinicSelection from "@/components/patient/appointments/clinicSelection";
import AppointmentCalendar from "@/components/patient/appointments/appointmentCalendar";
import TimeSlotSelection from "@/components/patient/appointments/timeSlotSelection";
import AppointmentDetailsForm from "@/components/patient/appointments/appointmentDetailsForm";
import AppointmentReview from "@/components/patient/appointments/appointmentReview";
import AppointmentConfirmation from "@/components/patient/appointments/appointmentConfirmation";


const generateTimeSlots = () => {
  const slots = {};
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1); // Start from tomorrow
  
  // Define time slots for each day type
  const mwfTimeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM'
  ];
  
  const ttTimeSlots = [
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM'
  ];

  for (let i = 0; i < 60; i++) { // Generate for next 60 days
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    // Get the appropriate time slots based on day of week
    let daySlots;
    switch(date.getDay()) {
      case 1: // Monday
      case 3: // Wednesday
      case 5: // Friday
        daySlots = [...mwfTimeSlots];
        break;
      case 2: // Tuesday
      case 4: // Thursday
        daySlots = [...ttTimeSlots];
        break;
      default:
        daySlots = [];
    }
    
    slots[formattedDate] = daySlots;
  }
  
  return slots;
};

const availableTimeSlots = generateTimeSlots();

const PatientAppointments = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [clinic, setClinic] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [currentTimeSlots, setCurrentTimeSlots] = useState([]);

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
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setClinic(null);
  };

  const handleDateClick = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  
    if (availableTimeSlots[formattedDate]) {
      setSelectedDate(formattedDate);
      setSelectedTime("");
      setCurrentTimeSlots(availableTimeSlots[formattedDate]);
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

  const handleConfirm = () => {
    setShowReview(true);
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess("Appointment booked successfully!");
      setShowReview(false);
      setCurrentStep(1);
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
      const isAvailable = !isPast && !!availableTimeSlots[formattedDate];
      
      days.push({
        day: i,
        date,
        available: isAvailable,
        formattedDate,
        isPast
      });
    }
    
    const weeks = [];
    while (days.length > 0) {
      weeks.push(days.splice(0, 7));
    }
    
    return weeks;
  };

  const weeks = useMemo(() => renderCalendar(), [currentMonth, currentYear]);
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  if (!user) return null;

  return (
    <div className={styles.appointmentContainer}>
      <PatientLayout>
        <main className={styles.appointmentMain}>
          <h1 className={styles.pageTitle}>Book an Appointment</h1>
          
          <AppointmentProgressSteps currentStep={currentStep} />
          
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

          {currentStep === 1 && (
            <AppointmentLocation 
              province={province}
              city={city}
              handleProvinceChange={handleProvinceChange}
              handleCityChange={handleCityChange}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === 2 && (
            <ClinicSelection 
              city={city}
              clinic={clinic}
              setClinic={setClinic}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === 3 && (
            <div className={styles.datetimeSection}>
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>
                  <i className={`${styles.icon} ${styles.calendarIcon}`}>📅</i> Select Date & Time
                </h2>
                <div className={styles.datetimeContent}>
                  <div className={styles.calendarContainer}>
                    <AppointmentCalendar
                      currentMonth={currentMonth}
                      currentYear={currentYear}
                      navigateMonth={navigateMonth}
                      toggleMonthYearPicker={toggleMonthYearPicker}
                      showMonthYearPicker={showMonthYearPicker}
                      selectMonth={selectMonth}
                      selectYear={selectYear}
                      years={years}
                      weeks={weeks}
                      handleDateClick={handleDateClick}
                      selectedDate={selectedDate}
                    />
                    <div className={styles.calendarLegend}>
                      <div className={styles.legendItem}>
                        <span className={`${styles.legendColorAvailable} ${styles.available}`}></span>
                        <span className={styles.legendText}>Available</span>
                      </div>
                      <div className={styles.legendItem}>
                        <span className={`${styles.legendColorFullyBooked} ${styles.fullyBooked}`}></span>
                        <span className={styles.legendText}>Fully Booked</span>
                      </div>
                      <div className={styles.legendItem}>
                        <span className={`${styles.legendColorNotAvailable} ${styles.notAvailable}`}></span>
                        <span className={styles.legendText}>Not Available</span>
                      </div>
                    </div>
                  </div>

                  {selectedDate && (
                    <TimeSlotSelection
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      currentTimeSlots={currentTimeSlots}
                      handleTimeSelect={handleTimeSelect}
                    />
                  )}
                </div>
              </div>
              <div className={styles.stepNavigation}>
                <button 
                  className={styles.backButton}
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </button>
                <button 
                  className={styles.nextButton}
                  onClick={() => setCurrentStep(4)}
                  disabled={!selectedTime}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <AppointmentDetailsForm
              reason={reason}
              otherReason={otherReason}
              name={name}
              sex={sex}
              email={email}
              contactNumber={contactNumber}
              pdfFile={pdfFile}
              fileInputRef={fileInputRef}
              handleReasonChange={handleReasonChange}
              setOtherReason={setOtherReason}
              setName={setName}
              setSex={setSex}
              setEmail={setEmail}
              setContactNumber={setContactNumber}
              handleFileChange={handleFileChange}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === 5 && !showReview && (
            <AppointmentReview
              clinic={clinic}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              reason={reason}
              otherReason={otherReason}
              name={name}
              sex={sex}
              email={email}
              contactNumber={contactNumber}
              pdfFile={pdfFile}
              setCurrentStep={setCurrentStep}
              handleConfirm={handleConfirm}
            />
          )}

          {showReview && (
            <AppointmentConfirmation
              clinic={clinic}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              reason={reason}
              otherReason={otherReason}
              isSubmitting={isSubmitting}
              setShowReview={setShowReview}
              handleFinalSubmit={handleFinalSubmit}
            />
          )}
        </main>
      </PatientLayout>
    </div>
  );
};

export default PatientAppointments;
