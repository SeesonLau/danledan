import { useState, useEffect } from "react";
import { useRef } from "react";
import "@fontsource/montserrat";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faCalendar,
  faNotesMedical,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/patient-homepage/patient-sidebar.module.css";
import Link from "next/link";
import { logout } from "@/config/firebase";
import { useRouter } from "next/router";

function PatientSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/"); // Redirect to the homepage after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <aside className={styles.clinicsidebar}>
        <ul>
          <div className={styles.cliniclogodiv1}>
            {" "}
            <img src="/landing-page-iamge/opto2.png" alt="Clinic Logo" />
          </div>

          <Link href="/patient-homepage" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faHouse} />
              </div>
            </div>
          </Link>

          <Link href="/patient/patient-appointments" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faCalendar} />
              </div>
            </div>
          </Link>

          <Link href="/patient/patient-ehr" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faNotesMedical} />
              </div>
            </div>
          </Link>

          <Link href="/patient/patient-settings" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faGear} />
              </div>
            </div>
          </Link>

          <button onClick={handleLogout} className={styles.cliniclogodiv}>
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </button>
        </ul>
      </aside>
    </div>
  );
}

export default PatientSidebar;
