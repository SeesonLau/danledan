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
  EHR6Textbox,
} from "@/components/ehr-textbox";
import SaveButton from "@/components/save-button";
import { FaEye, FaDownload, FaPrint } from "react-icons/fa";
import PrintEHR from "@/components/export-ehr";
import { useAuth } from "@/config/AuthContext";
import { useRouter } from "next/router";
import { addEhrRecord, getEhrRecordsByClinic } from "@/config/firestore";
import { determineDiagnosis } from "@/components/getDiagnosis";
import { Timestamp } from "firebase/firestore";
import { FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import useSortPatients from "@/components/ehrSortPatients";
import { generateCaseNumber } from "@/config/firestore";
import useEHR from "@/components/hooks/useEHR";

const ClinicEHR = () => {
  const {
    caseno,
    name,
    date,
    address,
    age,
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
    segment,
    remarks,
    analyticalfee,
    orthopticfee,
    lensesfee,
    framefee,
    totalfee,
    profileImageUrl,
    clinic,
    setCaseno,
    setPatientname,
    setBirthdate,
    setAddress,
    setAge,
    setPhonenumber,
    setOccupation,
    setDoctor,
    setDistanceOD,
    setDistanceOS,
    setNearOD,
    setNearOS,
    setRxOD,
    setRxOS,
    setODvaU,
    setOSvaU,
    setODvaRX,
    setOSvaRX,
    setPD,
    setDBL,
    setSize1,
    setBifocals,
    setLens,
    setSize2,
    setSegment,
    setRemarks,
    setAF,
    setOF,
    setLF,
    setFF,
    setTotal,
    setProfileImageUrl,
    setClinic,
    calculateAge,
    viewPatient,
    importEHR,
    exportEHR,
    handlePrint,
    handleNewClick,
    handleSaveClick,
    searchTerm,
    filteredPatients,
    clearFields,
    setSearchTerm,
    error,
    isPrinting,
    setIsPrinting,
    patients,
    handleInputChange,
    handleBirthChange,
    handleChange,
    user,
    loading,
    router,
    printRef,
    setPatients,
    loadingPatients,
    setLoadingPatients,
    setError,
    sortField,
    sortOrder,
    sortByField,
    sortedPatients,
  } = useEHR();

  // Render
  return (
    <div className={styles.recordContainer}>
      <ClinicLayout />
      <main className={styles.maincontent}>
        <div className={styles.firstdiv}>
          <div className={styles.headerContainer}>
            <h1 className={styles.header}>EHR</h1>
            <div className={styles.buttonGroup}>
              <button
                className={styles.button}
                onClick={() => document.getElementById("file-input").click()}
              >
                <FaDownload />
              </button>
              <button
                className={styles.button}
                onClick={() => exportEHR(printRef, setIsPrinting)}
              >
                <FaPrint />
              </button>
              <button className={styles.button} onClick={clearFields}>
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
                <EHRTextbox
                  label="Case No."
                  value={caseno}
                  onChange={handleChange(setCaseno)}
                  disabled
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
                    disabled
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
                  <EHR6Textbox
                    label="Birth Date"
                    value={date}
                    onChange={handleBirthChange}
                  />
                  <EHRTextbox
                    label="Clinic"
                    value={clinic}
                    onChange={handleChange(setClinic)}
                    disabled
                  />
                  <EHRTextbox
                    label="Doctor"
                    value={doctor}
                    onChange={handleChange(setDoctor)}
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
                    <SaveButton label="New" onClick={handleNewClick} />
                  </div>
                </div>
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
                        onChange={handleInputChange(setTotal)}
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
          <div className={styles.topBar}>
            <h1 className={styles.header2}>Patient List</h1>
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search by Case No. or Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
          </div>
          <div className={styles.tableContainer}>
            {loadingPatients ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                Loading...
              </div> /*: error ? (
              <div style={{ color: "red", textAlign: "center" }}>{error}</div>
            ) */
            ) : (
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th
                      className={styles.th}
                      onClick={() => sortByField("caseNo")}
                      style={{ cursor: "pointer" }}
                    >
                      Case No.{" "}
                      {sortField === "caseNo"
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </th>
                    <th
                      className={styles.th}
                      onClick={() => sortByField("otherColumn")}
                      style={{ cursor: "pointer" }}
                    >
                      Patient Name
                    </th>
                    <th
                      className={styles.th}
                      onClick={() => sortByField("otherColumn")}
                      style={{ cursor: "pointer" }}
                    >
                      Last Visit
                    </th>
                    <th
                      className={styles.th}
                      onClick={() => sortByField("otherColumn")}
                      style={{ cursor: "pointer" }}
                    >
                      Diagnosis
                    </th>
                    <th
                      className={styles.th}
                      onClick={() => sortByField("otherColumn")}
                      style={{ cursor: "pointer" }}
                    >
                      Prescription
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPatients.map((patient, index) => (
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
