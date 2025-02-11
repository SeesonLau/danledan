import { useState, useEffect } from 'react';
import { useRef } from "react";
import "@fontsource/montserrat";
import dynamic from 'next/dynamic';  // Import dynamic from Next.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faCalendar, faNotesMedical, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from '@/styles/clinic-homepage/clinic-sidebar.module.css';

function ClinicSidebar () {

    return (
    <div>
        <aside className={styles.clinicsidebar}>
            <ul>
          <div className={styles.cliniclogodiv1}> <img src="/landing-page-iamge/opto2.png" alt="Clinic Logo" /></div>
          <div className={styles.cliniclogodiv}>
             <div className={styles.clinicicondiv}>
                <FontAwesomeIcon icon={faHouse} />
             </div>
          </div>
          <div className={styles.cliniclogodiv}>
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faCalendar} />
            </div>
          </div>
          <div className={styles.cliniclogodiv}>
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faNotesMedical}/>
            </div>
          </div>
          <div className={styles.cliniclogodiv}>
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faGear}/> 
            </div>
          </div>
          <div className={styles.cliniclogodiv}>
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faRightFromBracket}/>
            </div>
          </div>
        </ul>
      </aside>
      </div>
    );
};


export default ClinicSidebar;