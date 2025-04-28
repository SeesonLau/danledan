import React from "react";
import styles from "../styles/clinic-ehr/clinic-ehr.module.css";

export default function SaveButton({ label, onClick }) {
  return (
    <button className={styles.saveButton1} onClick={onClick}>
      {label}
    </button>
  );
}
