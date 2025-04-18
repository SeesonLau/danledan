import ClinicLayout from "@/components/clinic-layout";
import styles from "../../styles/clinic/clinic-appointments.module.css";
import { useAuth } from "@/config/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ClinicAppointments = () => {
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
    <div className={styles.cliniccontainer}>
      <ClinicLayout />
      <main className={styles.maincontent}>
        <div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            Appointsments
          </h1>
          <p style={{ fontSize: "1.5rem" }}>Manage your appointments here.</p>
        </div>
      </main>
    </div>
  );
};

export default ClinicAppointments;
