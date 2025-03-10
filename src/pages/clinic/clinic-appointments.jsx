import ClinicLayout from "@/components/clinic-layout";
import styles from "../../styles/clinic/clinic-appointments.module.css";

const ClinicAppointments = () => {
    return (
        <div className={styles.cliniccontainer}>
            <ClinicLayout/>
            <main className={styles.maincontent}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Appointsments</h1>
                    <p style={{ fontSize: '1.5rem' }}>Manage your appointments here.</p>
                </div>
            </main>
        </div>
      );
}

export default ClinicAppointments;