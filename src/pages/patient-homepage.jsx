import ClinicSidebar from '../components/sidebar/clinicsidebar.jsx'; // Adjust the path if needed
import styles from '../styles/patient-homepage/patient-homepage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const PatientHomePage = () => {
  const playRickroll = () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  };
  return (

    <div className={styles.patientcontainer}>
      {/* Sidebar */}
      <ClinicSidebar />

      {/*main content */}
      <main className={styles.patientmaincontent}>

        {/*first div */}
        <div className={styles.patientfirstdiv}>

          {/*user container*/}
          <div className={styles.userprofilecontainer} onClick={playRickroll}>
            <div className={styles.userprofileicondiv1}>
              <div className={styles.userprofileicon}>   
                <FontAwesomeIcon icon={faUser} className={styles.userIcon}/>
              </div>
            </div>
            
            <div className={styles.userprofileicondiv2}>
              <p className={styles.userprofileicontext1}>
                {/*patient Name Logic here */}
                Gregory House
              </p>
              <p className={styles.userprofileicontext2}>
                {/*i assume all patient are patients so dont change */}
                Patient
              </p>
            </div>
          </div>

        </div>

        {/*second div*/}
        <div className={styles.patientseconddiv}>

        </div>

      </main>
    </div>
  );
};

export default PatientHomePage;
