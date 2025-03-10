import PatientLayout from "@/components/patient-layout";
import styles from "../../styles/patient/patient-ehr.module.css";

const PatientEHR = () => {
    return (
        <div className={styles.patientcontainer}>
            <PatientLayout/>

            <main className={styles.patientmaincontent}>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>PATIENT Electronic Health Records (EHR)</h1>
                    <p style={{ fontSize: '1.5rem' }}>View and manage patient records.</p>
                </div>
            </main>

        </div>
    );
}

export default PatientEHR;