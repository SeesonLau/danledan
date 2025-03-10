import PatientLayout from "@/components/patient-layout";
import styles from "../../styles/patient/patient-settings.module.css";

const PatientSettings = () => {
    return (
        <div className={styles.patientcontainer}>
            <PatientLayout/>
            <main className={styles.patientmaincontent}>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Settings HERE </h1>
                        <p style={{ fontSize: '1.5rem' }}>Manage users settings lmao exd gwapo kayko daniel123.</p>
                    </div>
            </main>
        </div>
    );
}

export default PatientSettings;