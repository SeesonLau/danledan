/*
import React, { useRef, useState, useEffect } from "react";
import ClinicLayout from "@/components/clinic-layout";
import styles from "../../styles/clinic-ehr/clinic-ehr.module.css";
import { MdAccountCircle } from "react-icons/md";
import { EHRTextbox } from "@/components/ehr-textbox";
import { EHR2Textbox } from "@/components/ehr-textbox";
import { EHR3Textbox } from "@/components/ehr-textbox";
import { EHR4Textbox } from "@/components/ehr-textbox";
import { EHR5Textbox } from "@/components/ehr-textbox";
import SaveButton from "@/components/save-button";
import { FaEye, FaDownload, FaPrint } from "react-icons/fa";
import ExportEHR from "@/components/ehr-to-pdf";
import { useAuth } from "@/config/AuthContext";
import { useRouter } from "next/router";

const ClinicEHR = () => {
  //
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/"); // Redirect if not authenticated
    }
  }, [user, loading]);
  if (user) console.log(user);

  //if (loading) return <h1>Loading...</h1>; // Show a loading state while checking auth
  if (!user) return null;
  //
  const profileImageUrl = null;

  const printRef = useRef();

  const importEHR = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);

          // Populate the form fields with imported data
          setCaseno(data.caseno || "");
          setPatientname(data.name || "");
          setDate(data.date || "");
          setAddress(data.address || "");
          setAge(data.age || "");
          setClinic(data.clinic || "");
          setPhonenumber(data.phone || "");
          setOccupation(data.occupation || "");
          setDoctor(data.doctor || "");
          setDistanceOD(data.distanceOD || "");
          setDistanceOS(data.distanceOS || "");
          setNearOD(data.nearOD || "");
          setNearOS(data.nearOS || "");
          setRxOD(data.oldRxOD || "");
          setRxOS(data.oldRxOS || "");
          setODvaU(data.ODvaU || "");
          setOSvaU(data.OSvaU || "");
          setODvaRX(data.ODvaRX || "");
          setOSvaRX(data.OSvaRX || "");
          setPD(data.pd || "");
          setDBL(data.dbl || "");
          setSize1(data.size1 || "");
          setBifocals(data.bifocals || "");
          setLens(data.lens || "");
          setSize2(data.size2 || "");
          setRemarks(data.remarks || "");
          setOF(data.orthopticfee || "");
          setAF(data.analyticalfee || "");
          setLF(data.lensesfee || "");
          setFF(data.framefee || "");
          setTotalfee(data.totalfee || "");

          alert("Form data successfully imported!");
        } catch (err) {
          alert("Error parsing JSON file. Please select a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const exportEHR = async (printRef) => {
    // Export to PDF logic here
    await ExportEHR(printRef);

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

    // Save form data as a JSON file
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formData));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "formData.json");
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

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    setter(value === "" ? 0 : parseFloat(value)); // Ensure empty input is treated as 0
  };

  useEffect(() => {
    setTotal(analyticalfee + orthopticfee + lensesfee + framefee);
  }, [analyticalfee, orthopticfee, lensesfee, framefee]);

  const handleChange = (setter) => (e) => setter(e.target.value);

  //-PLACEHOLDER
  const patients = [
    {
      caseNo: "0001",
      name: "John Doe",
      lastVisit: "15/02/2025",
      diagnosis: "Myopia",
      prescription: "-2.00 / -1.50",
    },
    {
      caseNo: "0002",
      name: "Jane Smith",
      lastVisit: "20/02/2025",
      diagnosis: "Hyperopia",
      prescription: "+1.50 / +1.00",
    },
    {
      caseNo: "0003",
      name: "Michael Johnson",
      lastVisit: "10/03/2025",
      diagnosis: "Astigmatism",
      prescription: "-1.25 / -0.75",
    },
    {
      caseNo: "0004",
      name: "Emily Davis",
      lastVisit: "05/04/2025",
      diagnosis: "Myopia",
      prescription: "-3.00 / -2.50",
    },
    {
      caseNo: "0005",
      name: "David Brown",
      lastVisit: "12/05/2025",
      diagnosis: "Presbyopia",
      prescription: "+2.00 / +2.00",
    },
    {
      caseNo: "0006",
      name: "Olivia Wilson",
      lastVisit: "25/06/2025",
      diagnosis: "Hyperopia",
      prescription: "+1.75 / +1.25",
    },
    {
      caseNo: "0007",
      name: "Sophia Martinez",
      lastVisit: "30/07/2025",
      diagnosis: "Astigmatism",
      prescription: "-2.00 / -1.00",
    },
    {
      caseNo: "0008",
      name: "Ethan Taylor",
      lastVisit: "08/08/2025",
      diagnosis: "Myopia",
      prescription: "-1.75 / -1.25",
    },
    {
      caseNo: "0009",
      name: "Charlotte White",
      lastVisit: "18/09/2025",
      diagnosis: "Hyperopia",
      prescription: "+2.25 / +1.75",
    },
    {
      caseNo: "0010",
      name: "Liam Anderson",
      lastVisit: "05/10/2025",
      diagnosis: "Astigmatism",
      prescription: "-1.50 / -1.00",
    },
    {
      caseNo: "0011",
      name: "Benjamin Clark",
      lastVisit: "10/11/2025",
      diagnosis: "Myopia",
      prescription: "-2.25 / -1.75",
    },
    {
      caseNo: "0012",
      name: "Emma Garcia",
      lastVisit: "15/12/2025",
      diagnosis: "Hyperopia",
      prescription: "+1.25 / +1.00",
    },
    {
      caseNo: "0013",
      name: "Lucas Harris",
      lastVisit: "22/01/2026",
      diagnosis: "Presbyopia",
      prescription: "+2.50 / +2.50",
    },
    {
      caseNo: "0014",
      name: "Ava Moore",
      lastVisit: "28/02/2026",
      diagnosis: "Astigmatism",
      prescription: "-1.50 / -0.75",
    },
    {
      caseNo: "0015",
      name: "Mason Hall",
      lastVisit: "12/03/2026",
      diagnosis: "Myopia",
      prescription: "-3.25 / -2.75",
    },
    {
      caseNo: "0016",
      name: "Mia Young",
      lastVisit: "20/04/2026",
      diagnosis: "Hyperopia",
      prescription: "+1.75 / +1.50",
    },
    {
      caseNo: "0017",
      name: "James Walker",
      lastVisit: "05/05/2026",
      diagnosis: "Astigmatism",
      prescription: "-1.75 / -1.25",
    },
    {
      caseNo: "0018",
      name: "Isabella King",
      lastVisit: "18/06/2026",
      diagnosis: "Presbyopia",
      prescription: "+2.25 / +2.00",
    },
    {
      caseNo: "0019",
      name: "William Wright",
      lastVisit: "25/07/2026",
      diagnosis: "Myopia",
      prescription: "-2.50 / -2.00",
    },
    {
      caseNo: "0020",
      name: "Amelia Scott",
      lastVisit: "08/08/2026",
      diagnosis: "Hyperopia",
      prescription: "+1.50 / +1.25",
    },
  ];

  // Function to handle row click -   //-PLACEHOLDER
  const viewPatient = (patient) => {
    if (patient.caseNo === "0001") {
      setCaseno(patient.caseNo);
      setPatientname(patient.name);
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
    } else if (patient.caseNo === "0002") {
      setCaseno(patient.caseNo);
      setPatientname(patient.name);
      setBirthdate(patient.birthdate || "02/02/1985");
      setAddress(patient.address || "456 Elm St, Town");
      setAge(patient.age || "38");
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

  return (
    <div className={styles.recordContainer}>
      <ClinicLayout />
      <main className={styles.maincontent}>
        <div className={styles.firstdiv}>
          <h1 className={styles.header}>EHR</h1>
          <div ref={printRef} className={styles.ehrContainer}>
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
                <EHRTextbox
                  label="Case No."
                  value={caseno}
                  onChange={handleChange(setCaseno)}
                />
                <EHRTextbox
                  label="Patient Name"
                  value={name}
                  onChange={handleChange(setPatientname)}
                />

                <EHRTextbox
                  label="Address"
                  value={address}
                  onChange={handleChange(setAddress)}
                />
              </div>
            </div>

            <div className={styles.div2}>
              <div className={styles.profileRow}>
                <div className={styles.profileColumn}>
                  <EHRTextbox
                    label="Age"
                    value={age}
                    onChange={handleChange(setAge)}
                  />
                  <EHRTextbox
                    label="Phone No."
                    value={phone}
                    onChange={handleChange(setPhonenumber)}
                  />
                  <EHRTextbox
                    label="Occupation"
                    value={occupation}
                    onChange={handleChange(setOccupation)}
                  />
                </div>

                <div className={styles.profileColumn}>
                  <EHRTextbox
                    label="Birth Date"
                    value={date}
                    onChange={handleChange(setBirthdate)}
                  />
                  <EHRTextbox
                    label="Clinic"
                    value={clinic}
                    onChange={handleChange(setClinic)}
                  />
                  <EHRTextbox
                    label="Doctor"
                    value={doctor}
                    onChange={handleChange(setDoctor)}
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
                    <EHR2Textbox
                      label="O.D"
                      value={distanceOD}
                      onChange={handleChange(setDistanceOD)}
                    />
                  </div>
                  <div className={styles.oCard}>
                    <EHR2Textbox
                      label="O.S"
                      value={distanceOS}
                      onChange={handleChange(setDistanceOS)}
                    />
                  </div>
                  <div className={styles.oCard}>
                    <EHR2Textbox
                      label="O.D"
                      value={nearOD}
                      onChange={handleChange(setNearOD)}
                    />
                  </div>
                  <div className={styles.oCard}>
                    <EHR2Textbox
                      label="O.S"
                      value={nearOS}
                      onChange={handleChange(setNearOS)}
                    />
                  </div>
                  <div className={styles.oCard}>
                    <EHR2Textbox
                      label="O.D"
                      value={oldRxOD}
                      onChange={handleChange(setRxOD)}
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
                      <EHR3Textbox
                        label="V.A UNAIDED"
                        value={ODvaU}
                        onChange={handleChange(setODvaU)}
                      />
                    </div>
                    <div className={styles.vCard}>
                      <EHR3Textbox
                        label="V.A WITH RX"
                        value={ODvaRX}
                        onChange={handleChange(setODvaRX)}
                      />
                    </div>
                  </div>
                  <div className={styles.horizontalContainer}>
                    <div className={styles.vCard}>
                      <EHR3Textbox
                        label="V.A UNAIDED"
                        value={OSvaU}
                        onChange={handleChange(setOSvaU)}
                      />
                    </div>
                    <div className={styles.vCard}>
                      <EHR3Textbox
                        label="V.A WITH RX"
                        value={OSvaRX}
                        onChange={handleChange(setOSvaRX)}
                      />
                    </div>
                  </div>
                  <div className={styles.segmentCard}>
                    <h1 className={styles.segmentText}>SEGMENT</h1>
                    <input
                      type="text"
                      value={segment}
                      onChange={handleChange(setSegment)}
                      style={{
                        background: "transparent",
                        margin: "10px",
                        padding: "10px",
                        color: "#559DDC",
                        textAlign: "center",
                        width: "93%",
                      }}
                    />
                  </div>
                  <div className={styles.oCard}>
                    <EHR2Textbox
                      label="O.S"
                      value={oldRxOS}
                      onChange={handleChange(setRxOS)}
                    />
                  </div>
                </div>
                <div className={styles.glassesContainer}>
                  <div className={styles.glassesCard}>
                    <div className={styles.horizontalFormat2}>
                      <EHR4Textbox
                        label="P.D."
                        value={pd}
                        onChange={handleChange(setPD)}
                      />
                      <EHR2Textbox
                        label="DBL"
                        value={dbl}
                        onChange={handleChange(setDBL)}
                      />
                    </div>
                  </div>
                  <div className={styles.glassesCard}>
                    <EHR4Textbox
                      label="SIZE"
                      value={size1}
                      onChange={handleChange(setSize1)}
                    />
                  </div>
                  <div className={styles.glassesCard}>
                    <div className={styles.horizontalFormat2}>
                      <EHR4Textbox
                        label="BIFOCALS"
                        value={bifocals}
                        onChange={handleChange(setBifocals)}
                      />
                      <EHR4Textbox
                        label="LENS"
                        value={lens}
                        onChange={handleChange(setLens)}
                      />
                    </div>
                  </div>
                  <div className={styles.glassesCard}>
                    <EHR2Textbox
                      label="SIZE"
                      value={size2}
                      onChange={handleChange(setSize2)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.div5}>
              <div className={styles.remarksContainer}>
                <EHR5Textbox
                  label="Remarks"
                  value={remarks}
                  onChange={handleChange(setRemarks)}
                />
              </div>
            </div>

            <div className={styles.div6}>
              <div className={styles.horizontalFormat}>
                <div className={styles.saveContainer}></div>

                <div className={styles.feesContainer}>
                  <div className={styles.horizontalFormat}>
                    <div className={styles.feeslabelCard}>
                      <h1 className={styles.feesText}>ANALYTICAL FEE</h1>
                    </div>
                    <div className={styles.feesCard}>
                      <input
                        type="text"
                        value={analyticalfee}
                        onChange={handleInputChange(setAF)}
                        style={{
                          background: "transparent",
                          margin: "10px",
                          fontSize: "17px",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "93%",
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.horizontalFormat}>
                    <div className={styles.feeslabelCard}>
                      <h1 className={styles.feesText}>ORTHOPTIC FEE</h1>
                    </div>
                    <div className={styles.feesCard}>
                      <input
                        type="text"
                        value={orthopticfee}
                        onChange={handleInputChange(setOF)}
                        style={{
                          background: "transparent",
                          margin: "10px",
                          fontSize: "17px",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "93%",
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
                        style={{
                          background: "transparent",
                          margin: "10px",
                          fontSize: "17px",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "93%",
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
                        style={{
                          background: "transparent",
                          margin: "10px",
                          fontSize: "17px",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "93%",
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.horizontalFormat}>
                    <div className={styles.feeslabelCard}>
                      <h1 className={styles.feesText}>TOTAL FEE</h1>
                    </div>
                    <div className={styles.feesCard}>
                      <input
                        type="text"
                        value={totalfee}
                        style={{
                          background: "transparent",
                          margin: "10px",
                          fontSize: "17px",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "93%",
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
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Case No.</th>
                  <th className={styles.th}>Patient Name</th>
                  <th className={styles.th}>Last Visit</th>
                  <th className={styles.th}>Diagnosis</th>
                  <th className={styles.th}>Prescription</th>
                  <th className={styles.th} style={{ textAlign: "center" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={index}
                    className={styles.tr}
                    onClick={() => viewPatient(patient)}
                  >
                    <td className={styles.td}>{patient.caseNo}</td>
                    <td
                      className={styles.td}
                      style={{ fontWeight: "bold", color: "#004085" }}
                    >
                      {patient.name}
                    </td>
                    <td className={styles.td}>{patient.lastVisit}</td>
                    <td className={styles.td}>{patient.diagnosis}</td>
                    <td className={styles.td}>{patient.prescription}</td>
                    <td
                      className={`${styles.td} ${styles.actions}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className={styles.button}
                        onClick={() => viewPatient(patient)}
                      >
                        <FaEye />
                      </button>
                      <input
                        id="file-input"
                        type="file"
                        accept=".json"
                        onChange={importEHR}
                        style={{ display: "none" }}
                      />
                      <button
                        className={styles.button}
                        onClick={() =>
                          document.getElementById("file-input").click()
                        }
                      >
                        <FaDownload />
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => exportEHR(printRef)}
                      >
                        <FaPrint />
                      </button>
                    </td>
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

export default ClinicEHR;
*/

import ClinicLayout from "@/components/clinic-layout";

export default function ClinicEHR() {
    return (
        <ClinicLayout>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Electronic Health Records (EHR)</h1>
                <p style={{ fontSize: '1.5rem' }}>View and manage patient records.</p>
            </div>
        </ClinicLayout>
    );
}