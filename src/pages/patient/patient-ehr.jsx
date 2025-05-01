import React, { useRef, useState, useEffect } from "react";
import PatientLayout from "@/components/patient-layout";
import styles from "../../styles/clinic-ehr/clinic-ehr.module.css";
import { MdAccountCircle } from "react-icons/md";
import { EHR1ReadOnly } from "@/components/ehr-textboxread-only";
import { EHR2ReadOnly } from "@/components/ehr-textboxread-only";
import { EHR3ReadOnly } from "@/components/ehr-textboxread-only";
import { EHR4ReadOnly } from "@/components/ehr-textboxread-only";
import { EHR5ReadOnly } from "@/components/ehr-textboxread-only";
import { FaSearch } from "react-icons/fa";
import { FaEye, FaDownload, FaPrint } from "react-icons/fa";
import { FaTrash } from "react-icons/fa"; 

import PrintEHR from "@/components/export-ehr";
import { useAuth } from "@/config/AuthContext";
//import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  getEhrRecordsByPatient,
  getPatientNameByUid,
} from "@/config/firestore";

const PatientEHR = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/"); // Redirect if not authenticated
    }
  }, [user, loading]);
  if (user) console.log(user);

  //if (loading) return <h1>Loading...</h1>; // Show a loading state while checking auth
  //  if (!user) return null; -SAME ISSUE MO ERROR BECAUSE OF THIS LINE IDK WHY
  //

  useEffect(() => {
    const fetchEhrRecords = async () => {
      try {
        if (!user?.uid) return;

        const records = await getEhrRecordsByPatient(user.uid);
        setEhrRecords(records); // or however you display it

        const name = await getPatientNameByUid(user.uid);
        setPatientName(name); // display full name separately
      } catch (error) {
        console.error(error);
      }
    };

    fetchEhrRecords();
  }, [user]);

  const profileImageUrl = null;

  const printRef = useRef();

  const exportEHR = async (printRef, setIsPrinting) => {
    await PrintEHR(printRef, setIsPrinting, caseno, clinic);

    // Extract form data
    const formData = {
      caseno,
      name,
      date,
      address,
      age,
      clinic,
      phone,
      occupation,
      doctor,
      distanceOD,
      distanceOS,
      nearOD,
      nearOS,
      oldRxOD,
      oldRxOS,
      ODvaU,
      OSvaU,
      ODvaRX,
      OSvaRX,
      pd,
      dbl,
      size1,
      bifocals,
      lens,
      size2,
      remarks,
      segment,
      analyticalfee,
      orthopticfee,
      lensesfee,
      framefee,
      totalfee,
    };

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formData));

    const filename = `${caseno} - ${clinic}.json`;

    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const [caseno, setCaseno] = useState("");
  const [name, setPatientname] = useState("");
  const [date, setBirthdate] = useState("");

  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [clinic, setClinic] = useState("");

  const [phone, setPhonenumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [doctor, setDoctor] = useState("");

  const [distanceOD, setDistanceOD] = useState("");
  const [distanceOS, setDistanceOS] = useState("");
  const [nearOD, setNearOD] = useState("");
  const [nearOS, setNearOS] = useState("");

  const [oldRxOD, setRxOD] = useState("");
  const [oldRxOS, setRxOS] = useState("");
  const [ODvaU, setODvaU] = useState("");
  const [OSvaU, setOSvaU] = useState("");
  const [ODvaRX, setODvaRX] = useState("");
  const [OSvaRX, setOSvaRX] = useState("");

  const [pd, setPD] = useState("");
  const [dbl, setDBL] = useState("");
  const [size1, setSize1] = useState("");
  const [bifocals, setBifocals] = useState("");
  const [lens, setLens] = useState("");
  const [size2, setSize2] = useState("");
  const [remarks, setRemarks] = useState("");

  const [segment, setSegment] = useState("");

  const [analyticalfee, setAF] = useState(0);
  const [orthopticfee, setOF] = useState(0);
  const [lensesfee, setLF] = useState(0);
  const [framefee, setFF] = useState(0);
  const [totalfee, setTotal] = useState(0);

  const handleChange = (setter) => (e) => setter(e.target.value);

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    setter(value === "" ? 0 : parseFloat(value)); // Ensure empty input is treated as 0
  };

  useEffect(() => {
    setTotal(analyticalfee + orthopticfee + lensesfee + framefee);
  }, [analyticalfee, orthopticfee, lensesfee, framefee]);


  //-PLACEHOLDER
  const patients = [
    {
      lastVisit: "15/02/2025",
      diagnosis: "Myopia",
      prescription: "-2.00 / -1.50",
      optometrist: "Dr. Smith",
    },
    {
      lastVisit: "20/02/2025",
      diagnosis: "Hyperopia",
      prescription: "+1.50 / +1.00",
      optometrist: "Dr. Johnson",
    },
    {
      lastVisit: "10/03/2025",
      diagnosis: "Astigmatism",
      prescription: "-1.25 / -0.75",
      optometrist: "Dr. Williams",
    },
    {
      lastVisit: "05/04/2025",
      diagnosis: "Myopia",
      prescription: "-3.00 / -2.50",
      optometrist: "Dr. Brown",
    },
    {
      lastVisit: "12/05/2025",
      diagnosis: "Presbyopia",
      prescription: "+2.00 / +2.00",
      optometrist: "Dr. Davis",
    },
    {
      lastVisit: "25/06/2025",
      diagnosis: "Hyperopia",
      prescription: "+1.75 / +1.25",
      optometrist: "Dr. Miller",
    },
    {
      lastVisit: "30/07/2025",
      diagnosis: "Astigmatism",
      prescription: "-2.00 / -1.00",
      optometrist: "Dr. Wilson",
    },
    {
      lastVisit: "08/08/2025",
      diagnosis: "Myopia",
      prescription: "-1.75 / -1.25",
      optometrist: "Dr. Moore",
    },
    {
      lastVisit: "18/09/2025",
      diagnosis: "Hyperopia",
      prescription: "+2.25 / +1.75",
      optometrist: "Dr. Taylor",
    },
    {
      lastVisit: "05/10/2025",
      diagnosis: "Astigmatism",
      prescription: "-1.50 / -1.00",
      optometrist: "Dr. Anderson",
    },
    {
      lastVisit: "10/11/2025",
      diagnosis: "Myopia",
      prescription: "-2.25 / -1.75",
      optometrist: "Dr. Thomas",
    },
    {
      lastVisit: "15/12/2025",
      diagnosis: "Hyperopia",
      prescription: "+1.25 / +1.00",
      optometrist: "Dr. Jackson",
    },
    {
      lastVisit: "22/01/2026",
      diagnosis: "Presbyopia",
      prescription: "+2.50 / +2.50",
      optometrist: "Dr. White",
    },
    {
      lastVisit: "28/02/2026",
      diagnosis: "Astigmatism",
      prescription: "-1.50 / -0.75",
      optometrist: "Dr. Harris",
    },
    {
      lastVisit: "12/03/2026",
      diagnosis: "Myopia",
      prescription: "-3.25 / -2.75",
      optometrist: "Dr. Martin",
    },
    {
      lastVisit: "20/04/2026",
      diagnosis: "Hyperopia",
      prescription: "+1.75 / +1.50",
      optometrist: "Dr. Thompson",
    },
    {
      lastVisit: "05/05/2026",
      diagnosis: "Astigmatism",
      prescription: "-1.75 / -1.25",
      optometrist: "Dr. Garcia",
    },
    {
      lastVisit: "18/06/2026",
      diagnosis: "Presbyopia",
      prescription: "+2.25 / +2.00",
      optometrist: "Dr. Martinez",
    },
    {
      lastVisit: "25/07/2026",
      diagnosis: "Myopia",
      prescription: "-2.50 / -2.00",
      optometrist: "Dr. Robinson",
    },
    {
      lastVisit: "08/08/2026",
      diagnosis: "Hyperopia",
      prescription: "+1.50 / +1.25",
      optometrist: "Dr. Clark",
    },
  ];

  //-PLACEHOLDER
  const viewPatient = (patient) => {
    if (patient.lastVisit == "15/02/2025") {
      setCaseno(patient.caseNo || "0001");
      setPatientname(patient.name || "John Doe");
      setBirthdate(patient.birthdate || "01/01/1990");
      setAddress(patient.address || "123 Main St, City");
      setAge(patient.age || "30");
      setClinic(patient.clinic || "City Clinic");
      setPhonenumber(patient.phone || "123-456-7890");
      setOccupation(patient.occupation || "Engineer");
      setDoctor(patient.doctor || "Dr. Smith");
      setDistanceOD(patient.distanceOD || "20/40");
      setDistanceOS(patient.distanceOS || "20/30");
      setNearOD(patient.nearOD || "N5");
      setNearOS(patient.nearOS || "N6");
      setRxOD(patient.oldRxOD || "-2.00");
      setRxOS(patient.oldRxOS || "-1.75");
      setODvaU(patient.ODvaU || "20/40");
      setOSvaU(patient.OSvaU || "20/30");
      setODvaRX(patient.ODvaRX || "20/25");
      setOSvaRX(patient.OSvaRX || "20/20");
      setPD(patient.pd || "62");
      setDBL(patient.dbl || "18");
      setSize1(patient.size1 || "52");
      setBifocals(patient.bifocals || "Yes");
      setLens(patient.lens || "Polycarbonate");
      setSize2(patient.size2 || "54");
      setSegment(patient.segment || "Flat Top 28");
    } else if (patient.lastVisit == "20/02/2025") {
      setCaseno(patient.caseNo || "0001");
      setPatientname(patient.name || "John Doe");
      setBirthdate(patient.birthdate || "01/01/1990");
      setAddress(patient.address || "123 Main St, City");
      setAge(patient.age || "30");
      setClinic(patient.clinic || "Town Medical Center");
      setPhonenumber(patient.phone || "987-654-3210");
      setOccupation(patient.occupation || "Teacher");
      setDoctor(patient.doctor || "Dr. Johnson");
      setDistanceOD(patient.distanceOD || "20/50");
      setDistanceOS(patient.distanceOS || "20/40");
      setNearOD(patient.nearOD || "N7");
      setNearOS(patient.nearOS || "N8");
      setRxOD(patient.oldRxOD || "-1.50");
      setRxOS(patient.oldRxOS || "-1.25");
      setODvaU(patient.ODvaU || "20/50");
      setOSvaU(patient.OSvaU || "20/40");
      setODvaRX(patient.ODvaRX || "20/30");
      setOSvaRX(patient.OSvaRX || "20/25");
      setPD(patient.pd || "64");
      setDBL(patient.dbl || "20");
      setSize1(patient.size1 || "50");
      setBifocals(patient.bifocals || "No");
      setLens(patient.lens || "High-Index");
      setSize2(patient.size2 || "56");
      setSegment(patient.segment || "Round Top 22");
    }
  };

  useEffect(() => {
    const fetchEhrRecords = async () => {
      try {
        if (!user?.uid) return;

        const records = await getEhrRecordsByPatient(user.uid);
        setEhrRecords(records); // or however you display it

        const name = await getPatientNameByUid(user.uid);
        setPatientName(name); // display full name separately
      } catch (error) {
        console.error(error);
      }
    };

    fetchEhrRecords();
  }, [user]);
  
  // Search
const [searchTerm, setSearchTerm] = useState("");
const filteredPatients = patients.filter((patient) =>
  (patient.optometrist || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
  (patient.lastVisit || "").toLowerCase().includes(searchTerm.toLowerCase())
);

// Clear EHR
const clearFields = () => {
  setCaseno("");
  setPatientname("");
  setBirthdate("");
  setAddress("");
  setAge("");
  setPhonenumber("");
  setOccupation("");
  setDoctor("");
  setDistanceOD("");
  setDistanceOS("");
  setNearOD("");
  setNearOS("");
  setRxOD("");
  setRxOS("");
  setODvaU("");
  setOSvaU("");
  setODvaRX("");
  setOSvaRX("");
  setPD("");
  setDBL("");
  setSize1("");
  setBifocals("");
  setLens("");
  setSize2("");
  setSegment("");
  setRemarks("");
  setClinic("");
  setOF(0);
  setAF(0);
  setLF(0);
  setFF(0);
  setTotal(0);
};


  return (
    <div className={styles.recordContainer}>
      <PatientLayout />
      <main className={styles.maincontent}>
        <div className={styles.firstdiv}>
          <div className={styles.headerContainer}>
            <h1 className={styles.header}>My EHR</h1>
            <div className={styles.buttonGroup}>
              <button
                className={styles.button}
                onClick={() => exportEHR(printRef, setIsPrinting)}
              >
                <FaPrint />
              </button>
              <button
                  className={styles.button}
                  onClick={clearFields}
                >
                  <FaTrash />
                </button>
            </div>
          </div>
          <div
            ref={printRef}
            className={`${styles.ehrContainer} ${
              isPrinting ? styles.printMode : ""
            }`}
          >
            <div className={styles.div1}>
              <div className={styles.profilePhoto}>
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                ) : (
                  <MdAccountCircle className={styles.profileIcon} />
                )}
              </div>
              <div className={styles.profileColumn}>
                <EHR1ReadOnly
                  label="Case No."
                  value={caseno}
                  readOnly
                  disabled
                />
                <EHR1ReadOnly
                  label="Patient Name"
                  value={name}
                  readOnly
                  disabled
                />
                <EHR1ReadOnly
                  label="Address"
                  value={address}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className={styles.div2}>
              <div className={styles.profileRow}>
                <div className={styles.profileColumn}>
                  <EHR1ReadOnly label="Age" value={age} readOnly disabled />
                  <EHR1ReadOnly
                    label="Phone No."
                    value={phone}
                    readOnly
                    disabled
                  />
                  <EHR1ReadOnly
                    label="Occupation"
                    value={occupation}
                    readOnly
                    disabled
                  />
                </div>

                <div className={styles.profileColumn}>
                  <EHR1ReadOnly
                    label="Birth Date"
                    value={date}
                    readOnly
                    disabled
                  />
                  <EHR1ReadOnly
                    label="Clinic"
                    value={clinic}
                    readOnly
                    disabled
                  />
                  <EHR1ReadOnly
                    label="Doctor"
                    value={doctor}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className={styles.div3}>
              <div className={styles.horizontalFormat}>
                <div class={styles.rxContainer}>
                  <div class={styles.rxNew}>
                    <span class={styles.rxTitle}>NEW</span>
                    <span class={styles.rxSymbol}>℞</span>
                    <div class={styles.verticalLabelRight1}>DISTANCE</div>
                    <div class={styles.verticalLabelRight2}>NEAR</div>
                  </div>
                  <div class={styles.rxOld}>
                    <span class={styles.rxTitle}>OLD</span>
                    <span class={styles.rxSymbol}>℞</span>
                  </div>
                </div>
                <div className={styles.oContainer}>
                  <div className={styles.oCard}>
                    <EHR2ReadOnly
                      label="O.D"
                      value={distanceOD}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className={styles.oCard}>
                    <EHR2ReadOnly
                      label="O.S"
                      value={distanceOS}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className={styles.oCard}>
                    <EHR2ReadOnly
                      label="O.D"
                      value={nearOD}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className={styles.oCard}>
                    <EHR2ReadOnly
                      label="O.S"
                      value={nearOS}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className={styles.oCard}>
                    <EHR2ReadOnly
                      label="O.D"
                      value={oldRxOD}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.div4}>
              <div className={styles.horizontalFormat}>
                <div className={styles.vSegmentContainer}>
                  <div className={styles.horizontalContainer}>
                    <div className={styles.vCard}>
                      <EHR3ReadOnly
                        label="V.A UNAIDED"
                        value={ODvaU}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className={styles.vCard}>
                      <EHR3ReadOnly
                        label="V.A WITH RX"
                        value={ODvaRX}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                  <div className={styles.horizontalContainer}>
                    <div className={styles.vCard}>
                      <EHR3ReadOnly
                        label="V.A UNAIDED"
                        value={OSvaU}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className={styles.vCard}>
                      <EHR3ReadOnly
                        label="V.A WITH RX"
                        value={OSvaRX}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                  <div className={styles.segmentCard}>
                    <h1 className={styles.segmentText}>SEGMENT</h1>
                    <input
                      type="text"
                      value={segment}
                      onChange={handleChange(setSegment)}
                      readOnly
                      tabIndex={-1}
                      style={{
                        background: "transparent",
                        margin: "0.8rem",
                        marginBottom: "1.5rem",
                        padding: "0.3em",
                        color: "#559DDC",
                        textAlign: "center",
                        width: "85%",
                        border: "none",
                        lineHeight: "3",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  <div className={styles.oCard}>
                    <EHR2ReadOnly
                      label="O.S"
                      value={oldRxOS}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
                <div className={styles.glassesContainer}>
                  <div className={styles.glassesCard}>
                    <div className={styles.horizontalFormat2}>
                      <EHR4ReadOnly label="P.D." value={pd} readOnly disabled />
                      <EHR4ReadOnly label="DBL" value={dbl} readOnly disabled />
                    </div>
                  </div>
                  <div className={styles.glassesCard}>
                    <EHR4ReadOnly
                      label="SIZE"
                      value={size1}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className={styles.glassesCard}>
                    <div className={styles.horizontalFormat2}>
                      <EHR4ReadOnly
                        label="BIFOCALS"
                        value={bifocals}
                        readOnly
                        disabled
                      />
                      <EHR4ReadOnly
                        label="LENS"
                        value={lens}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                  <div className={styles.glassesCard}>
                    <EHR4ReadOnly
                      label="SIZE"
                      value={size2}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.div5}>
              <div className={styles.remarksContainer}>
                <EHR5ReadOnly
                  label="Remarks"
                  value={remarks}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className={styles.div6}>
              <div className={styles.horizontalFormat}>
                <div className={styles.saveContainer}></div>

                <div className={styles.feesContainer}>
                  <div className={styles.horizontalFormat}>
                    <div className={styles.feeslabelCard}>
                      <h1 className={styles.feesText2}>ANALYTICAL FEE</h1>
                    </div>
                    <div className={styles.feesCard}>
                      <input
                        type="text"
                        value={analyticalfee}
                        onChange={handleInputChange(setAF)}
                        readOnly
                        tabIndex={-1}
                        style={{
                          background: "transparent",
                          fontSize: "1rem",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "85%",
                          border: "none",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.horizontalFormat}>
                    <div className={styles.feeslabelCard}>
                      <h1 className={styles.feesText2}>ORTHOPTIC FEE</h1>
                    </div>
                    <div className={styles.feesCard}>
                      <input
                        type="text"
                        value={orthopticfee}
                        onChange={handleInputChange(setOF)}
                        readOnly
                        tabIndex={-1}
                        style={{
                          background: "transparent",
                          fontSize: "1rem",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "85%",
                          border: "none",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.horizontalFormat}>
                    <div className={styles.feeslabelCard}>
                      <h1 className={styles.feesText}>LENSES</h1>
                    </div>
                    <div className={styles.feesCard}>
                      <input
                        type="text"
                        value={lensesfee}
                        onChange={handleInputChange(setLF)}
                        readOnly
                        tabIndex={-1}
                        style={{
                          background: "transparent",
                          fontSize: "1rem",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "85%",
                          border: "none",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.horizontalFormat}>
                    <div className={styles.feeslabelCard}>
                      <h1 className={styles.feesText}>FRAME</h1>
                    </div>
                    <div className={styles.feesCard}>
                      <input
                        type="text"
                        value={framefee}
                        onChange={handleInputChange(setFF)}
                        readOnly
                        tabIndex={-1}
                        style={{
                          background: "transparent",
                          fontSize: "1rem",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "85%",
                          border: "none",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.horizontalFormat}>
                    <div className={styles.feeslabelCard}>
                      <h1 className={styles.feesText2}>TOTAL FEE</h1>
                    </div>
                    <div className={styles.feesCard}>
                      <input
                        type="text"
                        value={totalfee}
                        readOnly
                        tabIndex={-1}
                        style={{
                          background: "transparent",
                          fontSize: "1rem",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "85%",
                          border: "none",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.seconddiv}>
          <div className={styles.topBar}>
            <h1 className={styles.header2}>Record History</h1>
              <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                  <FaSearch className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search by Visit Date or Optometrist..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>
            </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Visit Date</th>
                  <th className={styles.th}>Diagnosis</th>
                  <th className={styles.th}>Prescription</th>
                  <th className={styles.th}>Optometrist</th>
                  
                </tr>
              </thead>
              <tbody>
               {filteredPatients.map((patient, index) => (
                  <tr
                    key={index}
                    className={styles.tr}
                    onClick={() => viewPatient(patient)}
                  >
                    <td className={styles.td}>{patient.lastVisit}</td>
                    <td className={styles.td}>{patient.diagnosis}</td>
                    <td className={styles.td}>{patient.prescription}</td>
                    <td className={styles.td}>{patient.optometrist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientEHR;
