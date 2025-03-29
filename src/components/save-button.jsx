import React from "react";
import styles from "../styles/clinic-ehr/clinic-ehr.module.css";

const SaveButton = ({ label }) => {
    return (
      <button className={styles.saveButton1}>
        {label}
      </button>
    );
  };

export default SaveButton;
