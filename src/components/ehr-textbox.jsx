import React from "react";
import styles from "../styles/clinic-ehr/clinic-ehr-textbox.module.css";

export const EHRTextbox = ({ label, value, onChange }) => {
  return (
    <div className={styles.ehrTextbox}>
      <label className={styles.ehrTextboxLabel}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.ehrTextboxContent}
      />
    </div>
  );
};

export const EHR2Textbox = ({ label, value, onChange }) => {
  return (
    <div className={styles.ehrTextbox2}>
      <label className={styles.ehrTextboxLabel2}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.ehrTextboxContent}
      />
    </div>
  );
};

export const EHR3Textbox = ({ label, value, onChange }) => {
  return (
    <div className={styles.ehrTextbox3}>
      <label className={styles.ehrTextboxLabel3}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.ehrTextboxContent}
      />
    </div>
  );
};

export const EHR4Textbox = ({ label, value, onChange }) => {
  return (
    <div className={styles.ehrTextbox4}>
      <label className={styles.ehrTextboxLabel4}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.ehrTextboxContent4}
      />
    </div>
  );
};

export const EHR5Textbox = ({ label, value, onChange }) => {
  return (
    <div className={styles.ehrTextbox5}>
      <label className={styles.ehrTextboxLabel5}>{label}</label>
      <textarea
        className={styles.ehrTextarea5}
        value={value}
        onChange={onChange}
        rows="4"
        cols="50"
      />
    </div>
  );
};
