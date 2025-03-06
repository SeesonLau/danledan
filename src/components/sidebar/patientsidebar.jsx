import "@fontsource/montserrat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCalendar, faNotesMedical, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from '@/styles/patient-homepage/patient-sidebar.module.css';
import Link from 'next/link';

function PatientSidebar () {

    return (
    <div>
        <aside className={styles.clinicsidebar}>
            <ul>
          <div className={styles.cliniclogodiv1}> <img src="/landing-page-iamge/opto2.png" alt="Clinic Logo" /></div>
          
          <Link href="/patient-homepage" passHref>
            <div className={styles.cliniclogodiv}>
              <button className={styles.clinicicondiv}>
                  <FontAwesomeIcon icon={faHouse} />
                  <span className={styles.buttonText}>Home</span>
              </button>
            </div>
          </Link>

          <Link href="/patient/patient-appointments" passHref>
            <div className={styles.cliniclogodiv}>
              <button className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faCalendar} />
                <span className={styles.buttonText}>APPT</span>
              </button>
            </div>
          </Link>

          <Link href="/patient/patient-ehr" passHref>
            <div className={styles.cliniclogodiv}>
              <button className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faNotesMedical}/>
                <span className={styles.buttonText}>EHR</span>
              </button>
            </div>
          </Link>

          <Link href="/patient/patient-settings" passHref>
          <div className={styles.cliniclogodiv}>
              <button className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faGear}/>
                <span className={styles.buttonText}>Settings</span>
              </button>
            </div>
          </Link>

          <Link href="/" passHref>
            <div className={styles.cliniclogodiv}>
              <button className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faRightFromBracket}/>      
                <span className={styles.buttonText}>Log-out</span>      
              </button>
            </div>
          </Link>

        </ul>
      </aside>
    </div>
  );
};


export default PatientSidebar;