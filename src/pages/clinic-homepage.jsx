import { useState, useEffect } from 'react';
import { useRef } from "react";
import styles from '../styles/clinic-homepage/clinic-homepage.module.css';
import "@fontsource/montserrat";
import dynamic from 'next/dynamic';  // Import dynamic from Next.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faCalendar, faNotesMedical, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ClinicSidebar from '../components/sidebar/clinicsidebar.jsx'; // Adjust the path if needed
import ClinicLayout from "@/components/clinic-layout";

{/*OVERFLOWING PURPOSES DO YOUR BACKEND HERE BROSKI*/}
const patientNotifications = [
  { id: 1, name: "i love joy arenas", time: "5:30pm" },
  { id: 2, name: "i love joy arenas", time: "5:30pm" },
  { id: 3, name: "i love joy arenas", time: "5:30pm" },
  { id: 4, name: "Daniel M. Montesclaros", time: "2:00pm" },
  { id: 5, name: "Charles Luis Gaid", time: "3:15pm" },
  { id: 6, name: "Jamel Hadjirasul", time: "4:45pm" },
  { id: 7, name: "John Laurence Sison", time: "5:30pm" },
  { id: 8, name: "Dawson Alegarbes", time: "5:30pm" },
  { id: 9, name: "Dan Adlawan", time: "5:30pm" },
  { id: 10, name: "Joy Arenas", time: "5:30pm" },
]; 

const ClinicHome = () => {
  const playRickroll = () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  };

  const hasSpoken = useRef(false); // Prevents double execution
  useEffect(() => {
    if (!hasSpoken.current) {
      const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1; // Normal speed
        utterance.pitch = 2; // Normal pitch
        utterance.volume = 1; // Full volume
        // Ensure speech synthesis is ready before speaking
        if (synth.speaking) {
          synth.cancel(); // Stop any ongoing speech
        }
        synth.speak(utterance);
      };
      // Delay speaking slightly to ensure speech synthesis is ready
      setTimeout(() => {
        speak("Welcome to the clinic Doctor Julian Semblante");
      }, 500);
      hasSpoken.current = true; // Mark it as spoken
    }
  }, []);
  
  return (
    <ClinicLayout>
    <div className={styles.cliniccontainer}>
      <main className={styles.maincontent}>
        
        {/* First div layer */}
        <div className={styles.firstdiv}>
          <h1 className={styles.hellobar}>
           Welcome!
          </h1>

          {/* User Container */}
          <div className={styles.userprofilecontainer} onClick={playRickroll}>
            <div className={styles.userprofileicondiv1}>
              <div className={styles.userprofileicon}>   
                <FontAwesomeIcon icon={faUser} className={styles.userIcon}/>
              </div>
            </div>
            
            <div className={styles.userprofileicondiv2}>
              <p className={styles.userprofileicontext1}>
                {/*Doctor Name Logic here */}
                Dr. Quack Quack
              </p>
              <p className={styles.userprofileicontext2}>
                {/*i assume all doctors here are already optometrist so dont change */}
                Optometrist
              </p>
            </div>
          </div>

          {/* Calendar Container 
          <div className={styles.calendar}>
          </div> */}

          {/* Map Container */}
          <div className={styles.mapcontainer}>
            <h3 className={styles.maptitle}>Visits for Today</h3>
            <h3 className={styles.mapvisits}>
              {/*Visits for today LOGIC here*/}
              100
            </h3>
            
            <div className={styles.mapsquarediv}>
              {/*New Patients Box */}
              <div className={styles.mapsquare1}>
                <div className={styles.newoldpatient}>
                  {/*Title Here*/}
                  <p className={styles.newoldpatienttitle}>
                    New Patients
                  </p>
                </div>
                <div className={styles.newoldpatientnumber}>
                  <p className={styles.newoldpatientnumbertitle}>
                    {/*BACKEND HERE FOR HOW MANY NEW PATIENTS WE HAVE*/}
                    100
                  </p>
                </div>
              </div>
              
              {/*Old Patients Box */}
              <div className={styles.mapsquare2}>
                <div className={styles.newoldpatient}>
                  {/*Title Here*/}
                  <p className={styles.newoldpatienttitle}>
                    Old Patients
                  </p>
                </div>
                <div className={styles.newoldpatientnumber}>
                  <p className={styles.newoldpatientnumbertitle}>
                    {/*BACKEND HERE FOR HOW MANY NEW PATIENTS WE HAVE*/}
                    100
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Second div layer */}
        <div className={styles.seconddiv}>          
          <div className={styles.notiftext}>
            <p className={styles.notifpatienttext}>Patient List</p>
            <div className={styles.notifpatientbuttondiv}>
              <button className={styles.notifpatientbutton}>
                <p className={styles.notifpatientbuttontext}>Today {/*&#x25BC;*/} &#x2335;</p>
              </button>
            </div>
          </div>

            {/* Notification Messages */}
            <div className={styles.notifwrapper}>
              {patientNotifications.map((patient) => (
              <div key={patient.id} className={styles.notifmessage}>

                {/* Profile Picture */}
                <div className={styles.patientnotifpicdiv}>
                  <div className={styles.patientnotifpic}>
                    {/* Profile icon or backend image */}
                    <FontAwesomeIcon icon={faUser} className={styles.clinicpicIcon} />
                  </div>  
                </div>

                {/* Patient Name */}
                <div className={styles.clinicpatientnamediv}>
                  <p className={styles.clinicpatientname}>{patient.name}</p>
                </div>

                {/* Appointment Time */}
                <div className={styles.clinicpatienttimediv}>
                  <div className={styles.clinicpatienttimecontainer}>
                    <p className={styles.clinicpatienttime}>{patient.time}</p>
                  </div>
              </div>

            </div>
            ))}
          </div>
        </div>

      </main>
    </div>
    </ClinicLayout>
  );
};

export default ClinicHome;
