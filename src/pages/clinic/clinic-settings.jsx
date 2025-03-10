import ClinicLayout from "@/components/clinic-layout";
import styles from "../../styles/clinic/clinic-settings.module.css"; //

const ClinicSettings = () => {
    return (
        <div className={styles.cliniccontainer}>
        <ClinicLayout/>
            <main className={styles.maincontent}>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Settings</h1>
                    <p style={{ fontSize: '1.5rem' }}>Manage your clinic settings here.</p>
                </div>
            </main>
        </div>
      );
}

export default ClinicSettings;