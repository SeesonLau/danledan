import "@fontsource/montserrat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCalendar, faNotesMedical, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from '@/styles/clinic-homepage/clinic-sidebar.module.css';
import Link from 'next/link';

function ClinicSidebar () {

    return (
    <div>
        <aside className={styles.clinicsidebar}>
            <ul>
          <div className={styles.cliniclogodiv1}>
             <img src="/landing-page-iamge/opto2.png" alt="Clinic Logo" />
          </div>

          <Link href="/clinic-homepage" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faHouse} />
              </div>
            </div>
          </Link>
          
          <Link href="/clinic/clinic-appointments" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faCalendar} />
              </div>
            </div>
          </Link>

          <Link href="/clinic/clinic-ehr" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faNotesMedical}/>
              </div>
            </div>
          </Link>

          <Link href="/clinic/clinic-settings" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faGear}/> 
              </div>
            </div>
          </Link>

          <Link href="/" passHref>
            <div className={styles.cliniclogodiv}>
              <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faRightFromBracket}/>            
              </div>
            </div>
          </Link>

        </ul>
      </aside>
    </div>
  );
};


export default ClinicSidebar;