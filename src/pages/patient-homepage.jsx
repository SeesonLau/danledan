import PatientLayout from "@/components/patient-layout";
import styles from "../styles/patient-homepage/patient-homepage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { auth, getFullName } from "../config/firebase";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useAuth } from "@/config/AuthContext";
import { fetchAppointmentPatient } from "@/config/firestore";

// Dynamic imports for Leaflet (Next.js + Vercel safe)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

/*const patientNotifications = [
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
];*/

const PatientHomePage = () => {
  const [customMarkerIcon, setCustomMarkerIcon] = useState(null);
  const [patientNotifications, setNotifications] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const getAppointmentData = async () => {
      try {
        const appointmentData = await fetchAppointmentPatient(user.uid);
        console.log("Appointment Data:", appointmentData);
        setNotifications(appointmentData || []);
        // Do something with the appointment data, e.g., update state, render it
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        // Handle the error, e.g., show a message to the user
      }
    };

    if (user) {
      // Only fetch if patientId is available
      getAppointmentData();
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create the custom marker icon only in the client-side environment (when window is defined)
      const { Icon } = require("leaflet"); // Dynamically import the 'Icon' from leaflet on the client-side
      setCustomMarkerIcon(
        new Icon({
          iconUrl: "/landing-page-iamge/Marker1.png", // Path to your icon image
          iconSize: [38, 38], // Adjust as needed
          iconAnchor: [19, 38], // Bottom center point of the icon
          popupAnchor: [0, -38], // Popup positioning
        })
      );
    }
  }, []);

  const [position] = useState([10.294297039450635, 123.88040590457176]); // Fallback position
  const [position1] = useState([10.314381488873737, 123.8918673410041]); // Wellness Center
  const [position2] = useState([10.282355903597807, 123.9901564268958]); // Cebu Health Center

  //  useEffect(() => {
  //   // Check if geolocation is available
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         console.log("Updated position:", latitude, longitude); // Debugging to check values
  //         setPosition([latitude, longitude]); // Update position state with geolocation
  //         setLoading(false); // Set loading to false after position is updated
  //       },
  //       (error) => {
  //         console.error("Error getting geolocation:", error);
  //         setLoading(false); // Even in case of error, stop loading
  //       },
  //       {
  //         enableHighAccuracy: true,  // Request high accuracy
  //         timeout: 5000,             // Set a timeout in milliseconds
  //         maximumAge: 0              // Don't use a cached position
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //     setLoading(false); // Stop loading if geolocation is not supported
  //   }
  // }, []);

  /*EASTER EGG LOGIC*/
  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(null);

  console.log(auth?.currentUser?.email);

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
  /*END OF EASTER EGG LOGIC*/

  /*FILTER LOGIC IN THE NOTIFICATION*/
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Today");
  const options = ["Today", "Yesterday", "This Week", "This Month"];
  /*END OF FILTER LOGIC IN THE NOTIFICATION*/

  //for Display Name
  // State to hold user's name
  const [fullName, setFullName] = useState("Loading...");
  // Fetch patient's first and last name from Firebase
  useEffect(() => {
    const fetchUserName = async () => {
      if (auth.currentUser) {
        const name = await getFullName(auth.currentUser.uid, "Patient"); // Specify "Patient"
        setFullName(name);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className={styles.patientcontainer}>
      {/* Sidebar */}
      <PatientLayout />

      {/*main content */}
      <main className={styles.patientmaincontent}>
        {/*first div */}
        <div className={styles.patientfirstdiv}>
          <h1 className={styles.hellobar}>Welcome!</h1>

          {/*user container*/}
          <div
            className={styles.userprofilecontainer}
            onClick={handleProfileClick}
          >
            <div className={styles.userprofileicondiv1}>
              <div className={styles.userprofileicon}>
                {/* Do your Profile Picture of the patient backend here replace below icon, unless no profile use this icon below*/}
                <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                {/*  <img src="/landing-page-iamge/house.jpg" alt="Profile" className={styles.userIcon} /> */}
              </div>
            </div>

            <div className={styles.userprofileicondiv2}>
              <p className={styles.userprofileicontext1}>{fullName}</p>
              <p className={styles.userprofileicontext2}>
                {/*i assume all patient are patients so dont change */}
                Patient
              </p>
            </div>
          </div>

          {/*Profile Info Container*/}
          <div className={styles.mapcontainer}>
            <MapContainer
              center={position}
              zoom={15}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={customMarkerIcon}>
                <Popup>You are here.</Popup>
              </Marker>

              {/* WELLNESS CEBU HARDCODED LOCATION */}
              <Marker position={position1} icon={customMarkerIcon}>
                <Popup>Wellness Cebu Clinic</Popup>
              </Marker>

              {/* CEBU HEALTH CENTER HARDCODED LOCATION */}
              <Marker position={position2} icon={customMarkerIcon}>
                <Popup>Cebu Health Center</Popup>
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
              <button
                className={styles.notifpatientbutton}
                onClick={() => setIsOpen(!isOpen)}
              >
                <p className={styles.notifpatientbuttontext}>
                  {selected} &#x2335;
                </p>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <ul className={styles.dropdownMenu}>
                  {" "}
                  {options.map((option) => (
                    <li
                      key={option}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setSelected(option);
                        setIsOpen(false);
                      }}
                    >
                      {" "}
                      {option}{" "}
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
                    <FontAwesomeIcon
                      icon={faUser}
                      className={styles.clinicpicIcon}
                    />
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
