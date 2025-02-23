import { useState, useEffect } from 'react';
import { useRef } from "react";
import "@fontsource/montserrat";
import dynamic from 'next/dynamic';  // Import dynamic from Next.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faCalendar, faNotesMedical, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from '@/styles/clinic-homepage/clinic-sidebar.module.css';
import Link from "next/link";

function ClinicSidebar() {
  return (
    <aside className={styles.clinicsidebar}>
      <ul>
        <div className={styles.cliniclogodiv1}>
          <img src="/landing-page-iamge/opto2.png" alt="Clinic Logo" />
        </div>

        <div className={styles.cliniclogodiv}>
          <Link href="/clinic-homepage">
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faHouse} />
            </div>
          </Link>
        </div>

        <div className={styles.cliniclogodiv}>
          <Link href="/clinic/clinic-appointments">
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faCalendar} />
            </div>
          </Link>
        </div>

        <div className={styles.cliniclogodiv}>
          <Link href="/clinic/clinic-ehr">
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faNotesMedical} />
            </div>
          </Link>
        </div>

        <div className={styles.cliniclogodiv}>
          <Link href="/clinic/clinic-settings">
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faGear} />
              <FontAwesomeIcon icon={faRightFromBracket}/>            

            </div>
          </Link>
        </div>

        <div className={styles.cliniclogodiv}>
          <Link href="/">
            <div className={styles.clinicicondiv}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </Link>
        </div>
      </ul>
    </aside>
  );
}

export default ClinicSidebar;