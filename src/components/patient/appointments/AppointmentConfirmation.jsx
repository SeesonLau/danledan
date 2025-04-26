import styles from "@/styles/patient/patient-appointments.module.css";
const AppointmentConfirmation = ({
    clinic,
    selectedDate,
    selectedTime,
    reason,
    otherReason,
    isSubmitting,
    setShowReview,
    handleFinalSubmit
  }) => {
    return (
      <div className={styles.confirmationModal}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Confirm Your Appointment</h2>
          <div className={styles.modalBody}>
            <p className={styles.confirmationText}>Please confirm your appointment details:</p>
            <div className={styles.confirmationDetails}>
              <div className={styles.confirmationRow}>
                <span className={styles.confirmationLabel}>Clinic:</span>
                <span className={styles.confirmationValue}>{clinic?.name}</span>
              </div>
              <div className={styles.confirmationRow}>
                <span className={styles.confirmationLabel}>Date & Time:</span>
                <span className={styles.confirmationValue}>{selectedDate} at {selectedTime}</span>
              </div>
              <div className={styles.confirmationRow}>
                <span className={styles.confirmationLabel}>Reason:</span>
                <span className={styles.confirmationValue}>
                  {reason === "Other (Please specify)" ? otherReason : reason}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.modalActions}>
            <button
              className={styles.modalCancel}
              onClick={() => setShowReview(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className={styles.modalConfirm}
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
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
    );
  };
  
  export default AppointmentConfirmation;
  