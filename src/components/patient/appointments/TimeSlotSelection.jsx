import styles from "@/styles/patient/patient-appointments.module.css";
const TimeSlotSelection = ({ 
    selectedDate, 
    selectedTime, 
    currentTimeSlots, 
    handleTimeSelect 
  }) => {
    return (
      <div className={styles.timeSlotContainer}>
        <div className={styles.timeSlotHeader}>
          <h3 className={styles.timeSlotTitle}>
            <i className={`${styles.icon} ${styles.clockIcon}`}>⏰</i> Available Time Slots
          </h3>
          <div className={styles.selectedDate}>{selectedDate}</div>
        </div>
        <div className={styles.timeSlotsList}>
          {currentTimeSlots.map((slot) => (
            <button
              key={slot.time}
              className={`${styles.timeSlot} ${
                selectedTime === slot.time ? styles.selected : ''
              } ${slot.bookings >= 3 ? styles.fullyBooked : ''}`}
              onClick={() => slot.bookings < 3 && handleTimeSelect(slot.time)}
              disabled={slot.bookings >= 3}
            >
              {slot.time}
              {slot.bookings > 0 && (
                <span className={styles.bookingCount}>
                  ({slot.bookings}/3 booked)
                </span>
              )}
              {slot.bookings >= 3 && (
                <span className={styles.fullyBookedBadge}>Fully Booked</span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  export default TimeSlotSelection;