import "@fontsource/montserrat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCalendar,
  faNotesMedical,
  faGear,
  faRightFromBracket,
  faBars
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
      <aside className={styles.clinicsidebar}>
          <div className={styles.cliniclogodiv1}>
            {" "}
            <img src="/landing-page-iamge/opto2.png" alt="Clinic Logo" />
          </div>

          {/*Mobile Mode*/}
          <div className={styles.mobilesidebarcontainer}>             
            <Link href="/patient-homepage" passHref legacyBehavior>
              <div className={styles.mobilebuttoncontainer}>
                <div className={styles.mobilebutton}>
                  <FontAwesomeIcon icon={faHouse} />
                </div>
              </div>
            </Link>

            <Link href="/patient/patient-appointments" passHref legacyBehavior>
            <div className={styles.mobilebuttoncontainer}>
              <div className={styles.mobilebutton}>
                <FontAwesomeIcon icon={faCalendar} />
              </div>
            </div>
            </Link>

            <Link href="/patient/patient-ehr" passHref legacyBehavior>
            <div className={styles.mobilebuttoncontainer}>
              <div className={styles.mobilebutton}>
                <FontAwesomeIcon icon={faNotesMedical} />
              </div>
            </div>
            </Link>

            <Link href="/patient/patient-settings" passHref legacyBehavior>
              <div className={styles.mobilebuttoncontainer}>
                <div className={styles.mobilebutton}>
                  <FontAwesomeIcon icon={faGear} />
                </div>
              </div>
            </Link>

            <div className={styles.mobilebuttoncontainer} onClick={handleLogout}>
              <div className={styles.mobilebutton}>
                <FontAwesomeIcon icon={faRightFromBracket}/>
              </div>
            </div>
          </div>
          {/*Mobile Mode*/}

          <Link href="/patient-homepage" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faHouse} />
                <span className={styles.buttonText}>
                  Home
                </span>
              </div>
            </div>
          </Link>

          <Link href="/patient/patient-appointments" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faCalendar}/>
                <span className={styles.buttonText}>
                  APPT.
                </span>
              </div>
            </div>
          </Link>

          <Link href="/patient/patient-ehr" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faNotesMedical} />
                <span className={styles.buttonText}>
                  EHR
                </span>
              </div>
            </div>
          </Link>

          <Link href="/patient/patient-settings" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faGear} />
                <span className={styles.buttonText}>
                  Settings
                </span>
              </div>
            </div>
          </Link>

          <div onClick={handleLogout} className={styles.cliniclogodiv}>
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span className={styles.buttonText}>
                Log-out
              </span>
            </div>
          </div>
      </aside>
  );
}

export default PatientSidebar;
