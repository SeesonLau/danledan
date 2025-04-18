import ClinicLayout from "@/components/clinic-layout";
import styles from "../../styles/clinic/clinic-settings.module.css"; //
import { useAuth } from "@/config/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ClinicSettings = () => {
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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Settings</h1>
          <p style={{ fontSize: "1.5rem" }}>
            Manage your clinic settings here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ClinicSettings;
