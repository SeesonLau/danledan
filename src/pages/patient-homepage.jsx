import PatientLayout from "@/components/patient-layout";
import styles from "../styles/patient-homepage/patient-homepage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { auth, getFullName } from "../config/firebase";

{
  /*OVERFLOWING PURPOSES DO YOUR BACKEND HERE BROSKI*/
}
const patientNotifications = [
  {
    id: 1,
    name: "Meeting with Eye Doctor at Mercado, Lapu-Lapu",
    time: "5:30pm",
  },
  {
    id: 2,
    name: "Your eye check-up is tomorrow. See you soon!",
    time: "10:30pm",
  },
  { id: 3, name: "Your appointment is confirmed. See you!", time: "5:30pm" },
  {
    id: 4,
    name: "Consultation scheduled. Bring your records!",
    time: "2:00pm",
  },
  { id: 5, name: "Reminder: Follow-up check-up set.", time: "3:15pm" },
  { id: 6, name: "Your request is approved. Arrive on time!", time: "4:45pm" },
  { id: 7, name: "New schedule added for you.", time: "5:30pm" },
  { id: 8, name: "Your session is confirmed. Questions?", time: "5:30pm" },
  { id: 9, name: "Update available for your session.", time: "5:30pm" },
  { id: 10, name: "See you at your appointment!", time: "5:30pm" },
];

const PatientHomePage = () => {

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
      <PatientLayout/>

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
