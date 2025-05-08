import styles from "@/styles/patient/patient-appointments.module.css";
import { useAuth } from "@/config/AuthContext";
import { useState, useEffect } from "react";
import { getPatientDoc } from "@/config/firestore";
const AppointmentDetailsForm = ({
  reason,
  otherReason,
  name,
  sex,
  email,
  contactNumber,
  pdfFile,
  fileInputRef,
  handleReasonChange,
  setOtherReason,
  setName,
  setSex,
  setEmail,
  setContactNumber,
  handleFileChange,
  setCurrentStep,
}) => {
  const appointmentReasons = [
    "Claiming of Eyeglasses",
    "Checkup",
    "Follow-up Consultation",
    "Medical Certificate",
    "Laboratory Test",
    "Vaccination",
    "Dental Checkup",
    "Eye Examination",
    "Physical Therapy",
    "Other (Please specify)",
  ];

  const { user } = useAuth();
  const [patientData, setPatientData] = useState(null);
  useEffect(() => {
    const fetchPatientData = async () => {
      if (!user?.uid) {
        //  handle the case where there is no patientId
        console.log("Patient ID is required to fetch data.");

        return;
      }
      try {
        const data = await getPatientDoc(user.uid);

        console.log(data);
        if (data) {
          setPatientData(data);

          setName(data.name || "");
          setSex(data.sex || "");
          setEmail(data.email || "");
          setContactNumber(data.contact || "");
        } else {
          console.log(`Patient with ID "${user.uid}" not found.`);
        }
      } catch (err) {
        console.log(err); // Use the error thrown by getPatientDocumentById
      }
    };

    fetchPatientData();
  }, [user.uid]);

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>
        <i className={`${styles.icon} ${styles.detailsIcon}`}>📝</i> Appointment
        Details
      </h2>
      <div className={styles.formContent}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Reason for Appointment</label>
          <select
            className={styles.formInput}
            value={reason}
            onChange={handleReasonChange}
          >
            <option value="">Select Reason</option>
            {appointmentReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        {reason === "Other (Please specify)" && (
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Please specify</label>
            <input
              type="text"
              className={styles.formInput}
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              placeholder="Enter your reason"
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Full Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.formInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Sex <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.formInput}
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Contact Number <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            className={styles.formInput}
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your contact number"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Upload Previous Diagnosis in PDF File
          </label>
          <div className={styles.fileUpload}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              style={{ display: "none" }}
            />
            <button
              type="button"
              className={styles.uploadButton}
              onClick={() => fileInputRef.current.click()}
            >
              {pdfFile ? pdfFile.name : "Choose PDF File"}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.stepNavigation}>
        <button className={styles.backButton} onClick={() => setCurrentStep(3)}>
          Back
        </button>
        <button
          className={styles.nextButton}
          onClick={() => setCurrentStep(5)}
          disabled={
            !reason ||
            (reason === "Other (Please specify)" && !otherReason) ||
            !name ||
            !sex ||
            !email ||
            !contactNumber
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetailsForm;
