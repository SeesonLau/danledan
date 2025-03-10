import PatientLayout from "@/components/patient-layout";
import styles from "../../styles/patient/patient-appointments.module.css";

const PatientAppointments = () => {
    return (
        <div className={styles.patientcontainer}>
            <PatientLayout/>

            <main className={styles.patientmaincontent}>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>PATIENT Appointments</h1>
                    <p style={{ fontSize: '1.5rem' }}>View patients appointments daniel gwapo123</p>
                </div>
            </main>
            
        </div>
    );
}

export default PatientAppointments;