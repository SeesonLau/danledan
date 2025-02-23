import ClinicSidebar from '../components/sidebar/clinicsidebar.jsx'; // Adjust the path if needed
import styles from '../styles/patient-homepage/patient-homepage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

{/*OVERFLOWING PURPOSES DO YOUR BACKEND HERE BROSKI*/}
const patientNotifications = [
  { id: 1, name: "Meeting with Eye Doctor at Mercado, Lapu-Lapu", time: "5:30pm" },
  { id: 2, name: "Your eye check-up is tomorrow. See you soon!", time: "10:30pm" },
  { id: 3, name: "Your appointment is confirmed. See you!", time: "5:30pm" },
  { id: 4, name: "Consultation scheduled. Bring your records!", time: "2:00pm" },
  { id: 5, name: "Reminder: Follow-up check-up set.", time: "3:15pm" },
  { id: 6, name: "Your request is approved. Arrive on time!", time: "4:45pm" },
  { id: 7, name: "New schedule added for you.", time: "5:30pm" },
  { id: 8, name: "Your session is confirmed. Questions?", time: "5:30pm" },
  { id: 9, name: "Update available for your session.", time: "5:30pm" },
  { id: 10, name: "See you at your appointment!", time: "5:30pm" }
]; 

const PatientHomePage = () => {
  
  const position = [10.294187716769942, 123.88035066423207];
  const [userPosition, setUserPosition] = useState(position); // Start with default position

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);
  

  const clinicposition = [10.294187716769942, 123.88035066423207];

  const [clickCount, setClickCount] = useState(0);
  const handleProfileClick = () => {
    if (clickCount + 1 === 3) {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Rickroll after 3rd click
    } else {
      setClickCount(clickCount + 1);
    }
  };

  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41], // Default Leaflet icon size
    iconAnchor: [12, 41], // Ensures the point of the marker is correctly positioned
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Today");
  const options = ["Today", "Yesterday", "This Week", "This Month"];

  return (

    <div className={styles.patientcontainer}>
      {/* Sidebar */}
      <ClinicSidebar />

      {/*main content */}
      <main className={styles.patientmaincontent}>

        {/*first div */}
        <div className={styles.patientfirstdiv}>
          <h1 className={styles.hellobar}>
            Welcome!
          </h1>

          {/*user container*/}
          <div className={styles.userprofilecontainer} onClick={handleProfileClick}>
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

          {/*Profile Info Container*/}
          <div className={styles.mapcontainer}>
          <MapContainer center={userPosition} zoom={15} style={{ height: "100%", width: "100%", borderRadius: "10px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={clinicposition} icon={customIcon}>
                <Popup>Clinic Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Second div layer */}
        <div className={styles.seconddiv}>          
          <div className={styles.notiftext}>
            <p className={styles.notifpatienttext}>Notification</p>
            <div className={styles.notifpatientbuttondiv}>
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

export default PatientHomePage;
