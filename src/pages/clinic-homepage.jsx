import { useState, useEffect } from "react";
import { useRef } from "react";
import styles from "../styles/clinic-homepage/clinic-homepage.module.css";
import "@fontsource/montserrat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ClinicLayout from "@/components/clinic-layout";
import { auth, getFullName } from "../config/firebase";
import { fetchAppointmentClinic } from "@/config/firestore";
import { useAuth } from "@/config/AuthContext";
import { useRouter } from "next/router";

const oldpVisit = 50;
const newpVisit = 50;

/*const patientNotifications = [
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
];*/

const ClinicHome = () => {
  const { user, loading, profile, isProfileComplete, isSaved } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/"); // Redirect if not authenticated
    }
  }, [user, loading]);
  console.log(profile);
  useEffect(() => {
    if (!isProfileComplete && !isSaved) {
      router.replace("/clinic/clinic-settings"); // Redirect if not authenticated
    }
  }, [isProfileComplete, isSaved]);

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

  /*FILTER LOGIC IN THE PATIENT LIST*/
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Today");
  const options = ["Today", "Yesterday", "This Week", "This Month"];
  /*END OF FILTER LOGIC IN THE PATIENT LIST*/

  //notifications fetching

  const [todayVisit, setTodayVisit] = useState(0);
  const [alltimeVisit, setAlltimeVisit] = useState(0);
  const [patientNotifications, setNotifications] = useState([]);
  function filterAppointmentsByDate(appointments, filterOption) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const parseDate = (dateString) => {
      if (!dateString || typeof dateString !== "string") return null;
      const parts = dateString.split(", ");
      if (parts.length !== 2) return null;
      const dayMonth = parts[0].split(" ");
      if (dayMonth.length !== 2) return null;
      const monthString = dayMonth[0];
      const day = parseInt(dayMonth[1], 10);
      const year = parseInt(parts[1], 10);
      const monthIndex = new Date(
        Date.parse(monthString + " 1, 2000")
      ).getMonth();
      return isNaN(monthIndex) || isNaN(day) || isNaN(year)
        ? null
        : new Date(year, monthIndex, day);
    };

    const isSameDay = (d1, d2) =>
      d1 && d2 && d1.toDateString() === d2.toDateString();
    const isWithinWeek = (d) =>
      d &&
      d >= startOfWeek &&
      d <= today &&
      d <= new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    const isWithinMonth = (d) =>
      d &&
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth();

    return appointments.filter((appt) => {
      const apptDate = appt?.date ? parseDate(appt.date) : null;
      if (!apptDate) return false;

      switch (filterOption) {
        case "Today":
          return isSameDay(apptDate, today);
        case "Tomorrow":
          return isSameDay(apptDate, tomorrow);
        case "This Week":
          return isWithinWeek(apptDate);
        case "This Month":
          return isWithinMonth(apptDate);
        default:
          return true;
      }
    });
  }
  function countCompleteAppointments(appointments) {
    return appointments.filter((appt) => appt.status === "Complete").length;
  }
  useEffect(() => {
    const getAppointmentData = async () => {
      try {
        const appointmentData = await fetchAppointmentClinic(user.uid);
        console.log("Appointment Data:", appointmentData);
        const filteredAppointments = filterAppointmentsByDate(
          appointmentData || [],
          selected
        );
        setNotifications(filteredAppointments);
        //for visit count
        const AppointmentsToday = countCompleteAppointments(
          filterAppointmentsByDate(appointmentData || [], "Today")
        );
        const AppointmentsTomorrow =
          countCompleteAppointments(filteredAppointments);
        // Do something with the appointment data, e.g., update state, render it
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        // Handle the error, e.g., show a message to the user
      }
    };

    if (user) {
      // Only fetch if clinicId is available
      getAppointmentData();
    }
  }, [user, selected]);

  //for Display Name
  // State to hold user's name
  const [fullName, setFullName] = useState("Loading...");
  // Fetch patient's first and last name from Firebase
  useEffect(() => {
    const fetchUserName = async () => {
      if (auth.currentUser) {
        const name = await getFullName(auth.currentUser.uid, "Clinic"); // Specify "Clinic"
        setFullName(name);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className={styles.cliniccontainer}>
      <ClinicLayout />
      <main className={styles.maincontent}>
        {/* First div layer */}
        <div className={styles.firstdiv}>
          <h1 className={styles.hellobar}>Welcome!</h1>

          {/* User Container */}
          <div
            className={styles.userprofilecontainer}
            onClick={handleProfileClick}
          >
            <div className={styles.userprofileicondiv1}>
              <div className={styles.userprofileicon}>
                {/* Do your Profile Picture of the doctor backend here */}
                <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
              </div>
            </div>

            <div className={styles.userprofileicondiv2}>
              <p className={styles.userprofileicontext1}>Dr. {fullName}</p>
              <p className={styles.userprofileicontext2}>Optometrist</p>
            </div>
          </div>

          {/* Map Container */}
          <div className={styles.mapcontainer}>
            <h3 className={styles.maptitle}>Visits for Today</h3>
            <h3 className={styles.mapvisits}>{todayVisit}</h3>
          </div>
          <div className={styles.mapcontainer}>
            <h3 className={styles.maptitle}>Total Visits up to Date</h3>
            <h3 className={styles.mapvisits}>{alltimeVisit}</h3>
          </div>
        </div>

        {/* Second div layer */}
        <div className={styles.seconddiv}>
          <div className={styles.notiftext}>
            <p className={styles.notifpatienttext}>Patient List</p>
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

export default ClinicHome;
