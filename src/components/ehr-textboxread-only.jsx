import React from "react";
import styles from "../styles/clinic-ehr/clinic-ehr-textbox.module.css";
import { useRef } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa'; 

export const EHR1ReadOnly = ({ label, value, onChange, readOnly, disabled }) => {
    return (
      <div className={styles.ehrTextbox}>
        <label className={styles.ehrTextboxLabel}>{label}</label>
        <input
           type="text"
           value={value}
           onChange={onChange}
           className={styles.ehrTextboxContent}
           readOnly={readOnly}
           disabled={disabled}
        />
      </div>
    );
  };
  

export const EHR2ReadOnly = ({ label, value, onChange, readOnly, disabled }) => {
  return (
    <div className={styles.ehrTextbox2}>
      <label className={styles.ehrTextboxLabel2}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.ehrTextboxContent}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export const EHR3ReadOnly = ({ label, value, onChange, readOnly, disabled }) => {
  return (
    <div className={styles.ehrTextbox3}>
      <label className={styles.ehrTextboxLabel3}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.ehrTextboxContent3}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export const EHR4ReadOnly = ({ label, value, onChange, readOnly, disabled }) => {
  return (
    <div className={styles.ehrTextbox4}>
      <label className={styles.ehrTextboxLabel4}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.ehrTextboxContent4}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export const EHR5ReadOnly = ({ label, value, onChange, readOnly, disabled }) => {
  return (
    <div className={styles.ehrTextbox5}>
      <label className={styles.ehrTextboxLabel5}>{label}</label>
      <textarea
        className={styles.ehrTextarea5}
        value={value}
        onChange={onChange}
        rows="4"
        cols="50"
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export const EHR6ReadOnly = ({ label, value, onChange }) => {
  const inputRef = useRef(null);

  const handleIconClick = () => {

    inputRef.current?.showPicker?.(); 
    inputRef.current?.focus();   
  };

  return (
    <div className={styles.ehrTextbox6}>
      <label className={styles.ehrTextboxLabel}>{label}</label>
      <div className={styles.ehrTextboxWrapper}>
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={onChange}
          className={styles.ehrTextboxContent6}
        />
        <FaRegCalendarAlt
          className={styles.calendarIcon}
          onClick={handleIconClick}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};
