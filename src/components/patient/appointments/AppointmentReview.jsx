import styles from "@/styles/patient/patient-appointments.module.css";
const AppointmentReview = ({
    clinic,
    selectedDate,
    selectedTime,
    reason,
    otherReason,
    name,
    sex,
    email,
    contactNumber,
    pdfFile,
    setCurrentStep,
    handleConfirm
  }) => {
    return (
      <div className={styles.reviewSectionContainer}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>
            <i className={`${styles.icon} ${styles.reviewIcon}`}>📋</i> Review Your Appointment
          </h2>
          <div className={styles.reviewGrid}>
            <div className={styles.reviewColumn}>
              <div className={styles.reviewBlock}>
                <h3 className={styles.reviewSubtitle}>Location & Clinic</h3>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Clinic:</span>
                  <span className={styles.reviewValue}>{clinic?.name}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Address:</span>
                  <span className={styles.reviewValue}>{clinic?.address}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Contact:</span>
                  <span className={styles.reviewValue}>{clinic?.contact}</span>
                </div>
              </div>
            </div>
  
            <div className={styles.reviewColumn}>
              <div className={styles.reviewBlock}>
                <h3 className={styles.reviewSubtitle}>Appointment Details</h3>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Date:</span>
                  <span className={styles.reviewValue}>{selectedDate}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Time:</span>
                  <span className={styles.reviewValue}>{selectedTime}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Reason:</span>
                  <span className={styles.reviewValue}>
                    {reason === "Other (Please specify)" ? otherReason : reason}
                  </span>
                </div>
              </div>
            </div>
  
            <div className={styles.reviewColumn}>
              <div className={styles.reviewBlock}>
                <h3 className={styles.reviewSubtitle}>Your Information</h3>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Name:</span>
                  <span className={styles.reviewValue}>{name}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Sex:</span>
                  <span className={styles.reviewValue}>{sex}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Email:</span>
                  <span className={styles.reviewValue}>{email}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Contact Number:</span>
                  <span className={styles.reviewValue}>{contactNumber}</span>
                </div>
                {pdfFile && (
                  <div className={styles.reviewRow}>
                    <span className={styles.reviewLabel}>Attached File:</span>
                    <span className={styles.reviewValue}>{pdfFile.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stepNavigation}>
          <button 
            className={styles.backButton}
            onClick={() => setCurrentStep(4)}
          >
            Back
          </button>
          <button
            className={styles.submitButton}
            onClick={handleConfirm}
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    );
  };
  
  export default AppointmentReview;
  