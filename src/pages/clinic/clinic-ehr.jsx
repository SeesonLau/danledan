import React, { useRef, useState, useEffect } from "react";
import ClinicLayout from "@/components/clinic-layout";
import styles from "../../styles/clinic-ehr/clinic-ehr.module.css";
import { MdAccountCircle } from "react-icons/md";
import {
  EHRTextbox,
  EHR2Textbox,
  EHR3Textbox,
  EHR4Textbox,
  EHR5Textbox,
} from "@/components/ehr-textbox";
import SaveButton from "@/components/save-button";
import { FaEye, FaDownload, FaPrint } from "react-icons/fa";
import PrintEHR from "@/components/export-ehr";
import { useAuth } from "@/config/AuthContext";
import { useRouter } from "next/router";
import { addEhrRecord, getEhrRecordsByClinic } from "@/config/firestore";
import { determineDiagnosis } from "@/components/getDiagnosis";
import { Timestamp } from "firebase/firestore";

const ClinicEHR = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const printRef = useRef();

  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [error, setError] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const [clinic, setClinic] = useState("");

  // EHR Fields
  const [caseno, setCaseno] = useState("");
  const [name, setPatientname] = useState("");
  const [date, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
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
  const [segment, setSegment] = useState("");
  const [remarks, setRemarks] = useState("");
  const [analyticalfee, setAF] = useState(0);
  const [orthopticfee, setOF] = useState(0);
  const [lensesfee, setLF] = useState(0);
  const [framefee, setFF] = useState(0);
  const [totalfee, setTotal] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value === "" ? 0 : parseFloat(value));
  };

  const handleChange = (setter) => (e) => setter(e.target.value);

  useEffect(() => {
    if (user && user.uid) {
      setClinic(user.uid);
    }
  }, [user]);

  useEffect(() => {
    setTotal(analyticalfee + orthopticfee + lensesfee + framefee);
  }, [analyticalfee, orthopticfee, lensesfee, framefee]);

  useEffect(() => {
    if (!clinic) return;
    setLoadingPatients(true);
    getEhrRecordsByClinic(clinic)
      .then((records) => {
        setPatients(
          records.map((ehr) => ({
            caseNo: ehr.caseno,
            name: ehr.patientname,
            lastVisit: ehr.lastvisit?.toDate
              ? ehr.lastvisit.toDate().toLocaleDateString()
              : "",
            diagnosis: ehr.diagnosis,
            prescription: `${ehr.distanceOD || "-"} / ${ehr.distanceOS || "-"}`,
            ehr,
          }))
        );
        setLoadingPatients(false);
      })
      .catch((err) => {
        setError("Failed to fetch patient list.");
        setLoadingPatients(false);
      });
  }, [clinic]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading]);

  const handleSaveClick = async () => {
    setError(null);
    try {
      if (!caseno || !name || !date || !address || !clinic) {
        window.alert("Please fill in all required fields.");
        return;
      }

      const ehrData = {
        caseno,
        patientname: name,
        date: date ? new Date(date) : new Date(),
        address,
        age: Number(age),
        clinic,
        phonenumber: phone,
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
        orthopticfee: Number(orthopticfee),
        analyticalfee: Number(analyticalfee),
        lensesfee: Number(lensesfee),
        framefee: Number(framefee),
        totalfee: Number(totalfee),
        lastvisit: new Date(),
      };

      const newRecordId = await addEhrRecord(ehrData);
      window.alert("EHR saved successfully!");

      // Build new patient locally
      const newPatient = {
        caseNo: ehrData.caseno,
        name: ehrData.patientname,
        lastVisit: new Date().toLocaleDateString(),
        diagnosis: determineDiagnosis(ehrData),
        prescription: `${ehrData.distanceOD || "-"} / ${
          ehrData.distanceOS || "-"
        }`,
        ehr: {
          ...ehrData,
          id: newRecordId,
          lastvisit: Timestamp.fromDate(new Date()),
          version: 1,
        },
      };

      setPatients((prevPatients) => [newPatient, ...prevPatients]);
    } catch (err) {
      window.alert(err.message || "Failed to save EHR.");
      setError(err.message || "Failed to save EHR.");
    }
  };

  const viewPatient = (patient) => {
    const ehr = patient.ehr;
    if (!ehr) return;
    setCaseno(ehr.caseno || "");
    setPatientname(ehr.patientname || "");
    setBirthdate(
      ehr.date?.toDate ? ehr.date.toDate().toISOString().slice(0, 10) : ""
    );
    setAddress(ehr.address || "");
    setAge(ehr.age || "");
    setPhonenumber(ehr.phonenumber || "");
    setOccupation(ehr.occupation || "");
    setDoctor(ehr.doctor || "");
    setDistanceOD(ehr.distanceOD || "");
    setDistanceOS(ehr.distanceOS || "");
    setNearOD(ehr.nearOD || "");
    setNearOS(ehr.nearOS || "");
    setRxOD(ehr.oldRxOD || "");
    setRxOS(ehr.oldRxOS || "");
    setODvaU(ehr.ODvaU || "");
    setOSvaU(ehr.OSvaU || "");
    setODvaRX(ehr.ODvaRX || "");
    setOSvaRX(ehr.OSvaRX || "");
    setPD(ehr.pd || "");
    setDBL(ehr.dbl || "");
    setSize1(ehr.size1 || "");
    setBifocals(ehr.bifocals || "");
    setLens(ehr.lens || "");
    setSize2(ehr.size2 || "");
    setSegment(ehr.segment || "");
    setRemarks(ehr.remarks || "");
    setOF(ehr.orthopticfee || 0);
    setAF(ehr.analyticalfee || 0);
    setLF(ehr.lensesfee || 0);
    setFF(ehr.framefee || 0);
    setTotal(ehr.totalfee || 0);
  };

  const importEHR = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);

          setCaseno(data.caseno || "");
          setPatientname(data.name || "");
          setBirthdate(data.date || "");
          setAddress(data.address || "");
          setAge(data.age || "");
          if (!clinic) {
            setClinic(data.clinic || "");
          } // protect clinic uid
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
          setSegment(data.segment || "");
          setRemarks(data.remarks || "");
          setAF(data.analyticalfee || 0);
          setOF(data.orthopticfee || 0);
          setLF(data.lensesfee || 0);
          setFF(data.framefee || 0);
          setTotal(data.totalfee || 0);

          alert("Form data successfully imported!");
        } catch (err) {
          alert("Error parsing JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const exportEHR = async () => {
    // Export JSON
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
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "formData.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  const downloadAnchor = document.createElement("a");
  };

  const handlePrint = async () => {
    try {
      setIsPrinting(true);
      await PrintEHR(printRef, setIsPrinting, caseno, clinic);
    } finally {
      setIsPrinting(false);
    }
  };

  // Render
  return (
    <div className={styles.recordContainer}>
      <ClinicLayout />
      <main className={styles.maincontent}>
        <div className={styles.firstdiv}>
          <h1 className={styles.header}>EHR</h1>
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
                  <EHRTextbox label="Clinic" value={clinic} readOnly disabled />
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
                        margin: "0.8rem",
                        marginBottom: "1.5rem",
                        padding: "0.3em",
                        color: "#559DDC",
                        textAlign: "center",
                        width: "85%",
                        border: "none",
                        lineHeight: "3",
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
                      <EHR4Textbox
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
                    <EHR4Textbox
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
                <div className={styles.saveContainer}>
                  <div className={styles.hideContainer} data-html2canvas-ignore>
                    <SaveButton label="Save" onClick={handleSaveClick} />
                  </div>
                </div>
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
                        style={{
                          background: "transparent",
                          fontSize: "1rem",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "85%",
                          border: "none",
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
                        style={{
                          background: "transparent",
                          fontSize: "1rem",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "85%",
                          border: "none",
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
                          fontSize: "1rem",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "85%",
                          border: "none",
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
                          fontSize: "1rem",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "85%",
                          border: "none",
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
                        style={{
                          background: "transparent",
                          fontSize: "1rem",
                          color: "#559DDC",
                          textAlign: "center",
                          width: "85%",
                          border: "none",
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
          <h1 className={styles.header}>Patient List</h1>
          <div className={styles.tableContainer}>
            {loadingPatients ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                Loading...
              </div>
            ) : error ? (
              <div style={{ color: "red", textAlign: "center" }}>{error}</div>
            ) : (
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
                        <button className={styles.button} onClick={handlePrint}>
                          <FaPrint />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClinicEHR;
