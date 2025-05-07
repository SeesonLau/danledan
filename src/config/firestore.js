import {
  getFirestore,
  collection,
  collectionGroup,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";
import { determineDiagnosis } from "@/components/getDiagnosis";

// --- Collection References ---
const ehrCollGroupRef = collectionGroup(db, "ehr");
const ehrCollectionRef = collection(db, "ehr");
const patientsCollectionRef = collection(db, "patients");

// --- Required Fields for EHR ---
const requiredFields = [
  "caseno",
  "patientname",
  "date",
  "address",
  "age",
  "clinic",
  "phonenumber",
  "occupation",
  "doctor",
  "distanceOD",
  "distanceOS",
  "nearOD",
  "nearOS",
  "oldRxOD",
  "oldRxOS",
  "ODvaU",
  "OSvaU",
  "ODvaRX",
  "OSvaRX",
  "pd",
  "dbl",
  "size1",
  "bifocals",
  "lens",
  "size2",
  "remarks",
  "segment",
  "orthopticfee",
  "analyticalfee",
  "lensesfee",
  "framefee",
  "totalfee",
  "lastvisit",
];

// --- Validate EHR Data ---
function validateEhrData(ehrData) {
  for (const field of requiredFields) {
    if (
      ehrData[field] === undefined ||
      ehrData[field] === null ||
      ehrData[field] === ""
    ) {
      throw new Error(`Field "${field}" is required.`);
    }
  }
  if (!(ehrData.date instanceof Date))
    throw new Error("Invalid or missing 'date'.");
  if (!(ehrData.lastvisit instanceof Date))
    throw new Error("Invalid or missing 'lastvisit'.");
}

// --- Find Patient UID ---
async function findPatientUid(firstName, lastName) {
  const q = query(
    patientsCollectionRef,
    where("firstName", "==", firstName),
    where("lastName", "==", lastName),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return doc.id; // If you store "uid" field inside patient doc, use doc.data().uid
  }
  throw new Error(`Patient ${firstName} ${lastName} not found.`);
}

// --- Get Patient Full Name by UID ---
export async function getPatientNameByUid(uid) {
  const docRef = doc(db, "patients", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return `${data.firstName} ${data.lastName}`;
  }
  return "Unknown Patient";
}

// --- Add EHR Record with Versioning ---
export const addEhrRecord = async (ehrData) => {
  try {
    validateEhrData(ehrData);

    const [firstName, lastName] = ehrData.patientname.split(" ");
    const patientUid = await findPatientUid(firstName, lastName);

    const q = query(
      ehrCollectionRef,
      where("clinic", "==", ehrData.clinic),
      where("caseno", "==", ehrData.caseno),
      limit(1)
    );
    const snapshot = await getDocs(q);

    let newVersion = 1;
    if (!snapshot.empty) {
      const latest = snapshot.docs[0].data();
      newVersion = (latest.version || 1) + 1;
    }

    const diagnosis = determineDiagnosis(ehrData);

    const dataToSave = {
      ...ehrData,
      firstName,
      lastName,
      patientUid,
      date: Timestamp.fromDate(ehrData.date),
      lastvisit: Timestamp.fromDate(ehrData.lastvisit),
      diagnosis,
      version: newVersion,
    };

    delete dataToSave.patientname; // (optional) remove old patientname

    const docRef = await addDoc(ehrCollectionRef, dataToSave);
    return docRef.id;
  } catch (error) {
    window.alert("Error adding EHR record: " + error.message);
    throw error;
  }
};

// --- Fetch Latest EHRs by Clinic ---
export const getEhrRecordsByClinic = async (clinicId) => {
  try {
    if (!clinicId) throw new Error("Clinic ID is required.");

    const q = query(ehrCollGroupRef, where("clinic", "==", clinicId));
    const querySnapshot = await getDocs(q);

    const recordsByCase = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        !recordsByCase[data.caseno] ||
        data.version > recordsByCase[data.caseno].version
      ) {
        recordsByCase[data.caseno] = { id: doc.id, ...data };
      }
    });

    return Object.values(recordsByCase);
  } catch (error) {
    window.alert("Error fetching EHR records by clinic: " + error.message);
    throw error;
  }
};

// --- Get Single EHR Record by ID ---
export const getEhrRecordById = async (docId) => {
  try {
    const docRef = doc(db, "ehr", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    window.alert("Error getting EHR record by ID: " + error.message);
    throw error;
  }
};

// --- Get EHRs by Patient UID ---
export const getEhrRecordsByPatient = async (patientUid) => {
  try {
    if (!patientUid) throw new Error("Patient UID is required.");

    const q = query(ehrCollGroupRef, where("patientUid", "==", patientUid));
    const querySnapshot = await getDocs(q);

    const recordsByCase = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        !recordsByCase[data.caseno] ||
        data.version > recordsByCase[data.caseno].version
      ) {
        recordsByCase[data.caseno] = { id: doc.id, ...data };
      }
    });

    return Object.values(recordsByCase);
  } catch (error) {
    window.alert("Error fetching EHR records by patient: " + error.message);
    throw error;
  }
};

// (Other functions like getEhrRecordsByClinic, getEhrRecordById, updateEhrRecord, deleteEhrRecord remain unchanged)

// --- Save Appointment ---
export const saveAppointment = async (appointmentData) => {
  try {
    if (!appointmentData || typeof appointmentData !== "object") {
      throw new Error("Invalid appointment data.");
    }

    const appointmentsCollectionRef = collection(db, "appointments");

    const dataToSave = {
      ...appointmentData,
      createdAt: Timestamp.now(), // Add a server timestamp
    };

    const docRef = await addDoc(appointmentsCollectionRef, dataToSave);
    return docRef.id;
  } catch (error) {
    window.alert("Error saving appointment: " + error.message);
    throw error;
  }
};
