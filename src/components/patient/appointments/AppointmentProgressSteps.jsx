import styles from "@/styles/patient/patient-appointments.module.css";

const AppointmentProgressSteps = ({ currentStep }) => {
    const steps = ['Location', 'Clinic', 'Date', 'Time', 'Details', 'Review'];
    
    return (
      <div className={styles.progressSteps}>
        {steps.map((step, index) => (
          <div 
            key={step}
            className={`${styles.step} ${currentStep > index + 1 ? styles.completed : ''} ${currentStep === index + 1 ? styles.active : ''}`}
          >
            <div className={styles.stepIndicator}>{index + 1}</div>
            <span className={styles.stepLabel}>{step}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default AppointmentProgressSteps;