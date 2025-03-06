import "@fontsource/montserrat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faCalendar,
  faNotesMedical,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/clinic-homepage/clinic-sidebar.module.css";
import Link from "next/link";
import { logout } from "@/config/firebase";
import { useRouter } from "next/router";

function ClinicSidebar() {
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
            <img src="/landing-page-iamge/opto2.png" alt="Clinic Logo" />
          </div>

          <Link href="/clinic-homepage" passHref>
            <div className={styles.cliniclogodiv}>
              <button className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faHouse} />
                <span className={styles.buttonText}>
                  Home
                </span>
              </button>
            </div>
          </Link>

          <Link href="/clinic/clinic-appointments" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faCalendar}/>
                <span className={styles.buttonText}>
                  APPT.
                </span>
              </div>
            </div>
          </Link>

          <Link href="/clinic/clinic-ehr" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faNotesMedical} />
                <span className={styles.buttonText}>
                  EHR
                </span>
              </div>
            </div>
          </Link>

          <Link href="/clinic/clinic-settings" passHref>
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
          
        </ul>
      </aside>
    </div>
  );
}

export default ClinicSidebar;
