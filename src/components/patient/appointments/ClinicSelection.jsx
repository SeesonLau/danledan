import styles from "@/styles/patient/patient-appointments.module.css";
const ClinicSelection = ({ city, clinic, setClinic, setCurrentStep }) => {
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
  
    return (
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>
          <i className={`${styles.icon} ${styles.clinicIcon}`}>🏥</i> Clinic Details
        </h2>
        <div className={styles.formContent}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Clinic Name</label>
            <select
              className={styles.formInput}
              onChange={(e) => {
                const selectedClinic = clinics[city]?.find(
                  clinic => clinic.name === e.target.value
                );
                setClinic(selectedClinic);
              }}
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
        <div className={styles.stepNavigation}>
          <button 
            className={styles.backButton}
            onClick={() => setCurrentStep(1)}
          >
            Back
          </button>
          <button 
            className={styles.nextButton}
            onClick={() => setCurrentStep(3)}
            disabled={!clinic}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default ClinicSelection;
