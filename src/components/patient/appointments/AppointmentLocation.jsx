import styles from "@/styles/patient/patient-appointments.module.css";
const AppointmentLocation = ({ province, city, handleProvinceChange, handleCityChange, setCurrentStep }) => {
    const provinces = {
      "Metro Manila": ["Quezon City", "Manila", "Makati"],
      Cebu: ["Cebu City", "Mandaue", "Lapu-Lapu"],
      Davao: ["Davao City", "Panabo", "Tagum"],
    };
  
    return (
      <div className={styles.formSection}>
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
                <option key={prov} value={prov}>{prov}</option>
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
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.stepNavigation}>
          <button 
            className={styles.nextButton}
            onClick={() => setCurrentStep(2)}
            disabled={!province || !city}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default AppointmentLocation;
  