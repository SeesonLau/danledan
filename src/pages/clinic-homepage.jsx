import { useState, useEffect } from 'react';
import { useRef } from "react";
import styles from '../styles/clinic-homepage/clinic-homepage.module.css';
import "@fontsource/montserrat";
import dynamic from 'next/dynamic';  // Import dynamic from Next.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ClinicSidebar from '../components/sidebar/clinicsidebar.jsx'; // Adjust the path if needed

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
  
  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(null);

  const handleProfileClick = () => {
    if (clickCount + 1 === 3) {
     window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Rickroll after 3rd click
    } else {
     setClickCount((prev) => prev + 1);
    
      // Clear previous timer and set a new one
    if (timer) clearTimeout(timer);
    
    const newTimer = setTimeout(() => {
      setClickCount(0);
    }, 5000); // Reset after 5 seconds

    setTimer(newTimer);
    }
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
        speak("Welcome to the clinic Doctor");
      }, 500);
      hasSpoken.current = true; // Mark it as spoken
    }
  }, []);

  {/*FILTER LOGIC IN THE PATIENT LIST*/}
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Today");
  const options = ["Today", "Yesterday", "This Week", "This Month"];
  {/*END OF FILTER LOGIC IN THE PATIENT LIST*/}
  
  return (
    <div className={styles.cliniccontainer}>
      <ClinicSidebar />
      <main className={styles.maincontent}>
        
        {/* First div layer */}
        <div className={styles.firstdiv}>
          <h1 className={styles.hellobar}>
           Welcome!
          </h1>

          {/* User Container */}
          <div className={styles.userprofilecontainer} onClick={handleProfileClick}>
            <div className={styles.userprofileicondiv1}>
              <div className={styles.userprofileicon}>
                {/* Do your Profile Picture of the doctor backend here */}   
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
             {/* Button */}
              <button className={styles.notifpatientbutton} onClick={() => setIsOpen(!isOpen)}>
                <p className={styles.notifpatientbuttontext}>{selected} &#x2335;</p>
              </button>

              {/* Dropdown Menu */}
              {isOpen && ( <ul className={styles.dropdownMenu}> {options.map((option) => (
               <li key={option} className={styles.dropdownItem} onClick={() => {
                setSelected(option);
                setIsOpen(false); }}>
              {option}
              </li>
               ))}
              </ul>
              )}
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
  );
};

export default ClinicHome;
