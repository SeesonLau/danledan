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
          {currentTimeSlots.map((time) => (
            <button
              key={time}
              className={`${styles.timeSlot} ${selectedTime === time ? styles.selected : ''}`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default TimeSlotSelection;
