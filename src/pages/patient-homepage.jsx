import PatientSidebar from '../components/sidebar/patientsidebar'; // Adjust the path if needed
import styles from '../styles/patient-homepage/patient-homepage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const patientName = ["Gregory House"];

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

  {/*EASTER EGG LOGIC*/}
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

  {/*END OF EASTER EGG LOGIC*/}
  
  {/*USER AND CLINIC LOCATION LOGIC */}
  const [userPosition, setUserPosition] = useState([10.294187716769942, 123.88035066423207]); // Default position (clinic)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition = [pos.coords.latitude, pos.coords.longitude];
          setUserPosition(newPosition);
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        { enableHighAccuracy: true } // This forces the browser to get a more precise location
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  
  const clinicposition = [10.294187716769942, 123.88035066423207];

  {/*MARKER ICON LOGIC IN MAP FOR CSS BECAUSE MARKER FROM LIBRARY IS BUGGED*/}
  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41], // Default Leaflet icon size
    iconAnchor: [12, 41], // Ensures the point of the marker is correctly positioned
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  {/* END OF USER AND CLINIC LOCATION LOGIC */}

  {/*FILTER LOGIC IN THE NOTIFICATION*/}
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Today");
  const options = ["Today", "Yesterday", "This Week", "This Month"];
  {/*END OF FILTER LOGIC IN THE NOTIFICATION*/}

  return (

    <div className={styles.patientcontainer}>
      {/* Sidebar */}
      <PatientSidebar/>

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
                {/* Do your Profile Picture of the patient backend here replace below icon, unless no profile use this icon below*/}
                <FontAwesomeIcon icon={faUser} className={styles.userIcon}/>
                {/*<img src="/landing-page-iamge/house.jpg" alt="Profile" className={styles.userIcon}/>*/}
              </div>
            </div>
            
            <div className={styles.userprofileicondiv2}>
              <p className={styles.userprofileicontext1}>
                {patientName}
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
              <Marker position={userPosition} icon={customIcon}>
                <Popup>Your Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Second div layer */}
        <div className={styles.seconddiv}>          
          <div className={styles.notiftext}>
            <p className={styles.notifpatienttext}>Notification</p>         
            <div className={styles.notifpatientbuttondiv}>
             {/* Button */}
              <button className={styles.notifpatientbutton} onClick={() => setIsOpen(!isOpen)}>
                <p className={styles.notifpatientbuttontext}>{selected} &#x2335;</p>
              </button>

              {/* Dropdown Menu */}
              {isOpen && ( 
              <ul className={styles.dropdownMenu}> {options.map((option) => (
               <li key={option} className={styles.dropdownItem} onClick={() => {setSelected(option); setIsOpen(false); }}> {option} </li>))}
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

export default PatientHomePage;
