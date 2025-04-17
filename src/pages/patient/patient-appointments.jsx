import PatientLayout from "@/components/patient-layout";
import styles from "../../styles/patient/patient-appointments.module.css";
import { useAuth } from "@/config/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const PatientAppointments = () => {
  //
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/"); // Redirect if not authenticated
    }
  }, [user, loading]);
  if (user) console.log(user);

  //if (loading) return <h1>Loading...</h1>; // Show a loading state while checking auth
  if (!user) return null;
  //
  return (
    <div className={styles.patientcontainer}>
      <PatientLayout />

      <main className={styles.patientmaincontent}>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            PATIENT Appointments
          </h1>
          <p style={{ fontSize: "1.5rem" }}>
            View patients appointments daniel gwapo123
          </p>
        </div>
      </main>
    </div>
  );
};

export default PatientAppointments;
