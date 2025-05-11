import React, { useRef, useState, useEffect } from "react";
import SaveButton from "@/components/save-button";
import { FaEye, FaDownload, FaPrint } from "react-icons/fa";
import PrintEHR from "@/components/export-ehr";
import { useAuth } from "@/config/AuthContext";
import { useRouter } from "next/router";
import {
  addEhrRecord,
  getEhrRecordsByClinic,
  getClinicDoc,
} from "@/config/firestore";
import useSortPatients from "@/components/ehrSortPatients";
import { generateCaseNumber } from "@/config/firestore";
import useAppointments from "./useAppointments";

const useEHR = () => {
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

  const { user, loading } = useAuth();
  const router = useRouter();
  const printRef = useRef();

  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [error, setError] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [newEHRSaved, setNewEHRSaved] = useState(false);

  const [clinicDetails, setClinicDoc] = useState();

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  const viewPatient = (patient) => {
    const ehr = patient.ehr;
    if (!ehr) return;
    setCaseno(ehr.caseno || "");
    setPatientname(`${ehr.firstName} ${ehr.lastName}` || "");
    setBirthdate(
      ehr.date?.toDate ? ehr.date.toDate().toISOString().slice(0, 10) : ""
    );
    setAddress(ehr.address || "");
    setAge(ehr.age || "");
    setPhonenumber(ehr.phonenumber || "");
    setOccupation(ehr.occupation || "");
    setDoctor(ehr.doctor || clinic || "");
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
  };

  const handlePrint = async () => {
    try {
      setIsPrinting(true);
      await PrintEHR(printRef, setIsPrinting, caseno, clinic);
    } finally {
      setIsPrinting(false);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      const fetchClinicDetails = async () => {
        try {
          const data = await getClinicDetails(user.uid);
          setClinicDetails(data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchClinicDetails();
      console.log("Clinic Details: ", clinicDetails);
      setClinic(user.uid);
      setDoctor("");
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
            name: `${ehr.firstName} ${ehr.lastName}`,
            lastVisit: ehr.lastvisit?.toDate
              ? ehr.lastvisit.toDate().toLocaleDateString()
              : "",
            diagnosis: ehr.diagnosis,
            prescription: `${ehr.distanceOD || "-"} / ${ehr.distanceOS || "-"}`,
            ehr,
          }))
        );
        setLoadingPatients(false);
        if (setNewEHRSaved) {
          setNewEHRSaved(false);
        }
      })
      .catch((err) => {
        setError("Failed to fetch patient list.");
        setLoadingPatients(false);
      });
  }, [clinic, newEHRSaved]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading]);

  const handleNewClick = async () => {
    try {
      const newCaseNumber = await generateCaseNumber();
      clearFields();
      setCaseno(newCaseNumber);
    } catch (error) {
      console.error("Failed to generate new case number", error);
      alert(
        "Failed to generate new case number. Please check the console for details."
      );
    }
  };

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
      setNewEHRSaved(true);
      const newRecordId = await addEhrRecord(ehrData);
      window.alert("EHR saved successfully!");
    } catch (err) {
      window.alert(err.message || "Failed to save EHR.");
      setError(err.message || "Failed to save EHR.");
    }
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value === "" ? 0 : parseFloat(value));
  };

  const handleChange = (setter) => (e) => setter(e.target.value);

  const handleBirthChange = (e) => {
    setBirthdate(e.target.value);
    setAge(calculateAge(e.target.value));
  };

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPatients = patients.filter((patient) =>
    (patient.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // For Sorting
  const { sortedPatients, sortByField, sortOrder, sortField } =
    useSortPatients(filteredPatients);

  // Clear EHR
  const clearFields = () => {
    //setCaseno("");
    //setPatientname("");
    //setBirthdate("");
    //setAddress("");
    //setAge("");
    //setPhonenumber("");
    //setOccupation("");
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
    setOF(0);
    setAF(0);
    setLF(0);
    setFF(0);
    setTotal(0);
  };

  return {
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
    loadingPatients,
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
    setLoadingPatients,
    setError,
    sortField,
    sortOrder,
    sortByField,
    sortedPatients,
  };
};

export default useEHR;
