import ClinicLayout from "@/components/clinic-layout";
import styles from "../../styles/clinic/clinic-ehr.module.css";

const ClinicEHR = () => {
    return (
        <div className={styles.cliniccontainer}>
            <ClinicLayout/>
            <main className={styles.maincontent}>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Electronic Health Records (EHR)</h1>
                    <p style={{ fontSize: '1.5rem' }}>View and manage patient records.</p>
                </div>
            </main>
        </div>
    );
}

export default ClinicEHR;