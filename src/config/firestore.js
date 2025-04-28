import { initializeApp } from "firebase/app";
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
import { db } from "./firebase"; // Your firebase.js must export db
import { determineDiagnosis } from "@/components/getDiagnosis"; // Your diagnosis logic

// --- Collection References ---
const ehrCollGroupRef = collectionGroup(db, "ehr"); // For collectionGroup queries
const ehrCollectionRef = collection(db, "ehr"); // For adding new docs

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

// --- Add EHR Record with Versioning ---
export const addEhrRecord = async (ehrData) => {
  try {
    validateEhrData(ehrData);

    // Get latest version for this caseno
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
      date: Timestamp.fromDate(ehrData.date),
      lastvisit: Timestamp.fromDate(ehrData.lastvisit),
      diagnosis,
      version: newVersion,
    };

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

// --- Update Existing EHR Record ---
export const updateEhrRecord = async (docId, updatedData) => {
  try {
    const docRef = doc(db, "ehr", docId);
    const dataToUpdate = { ...updatedData };

    if (dataToUpdate.date && dataToUpdate.date instanceof Date) {
      dataToUpdate.date = Timestamp.fromDate(dataToUpdate.date);
    }
    if (dataToUpdate.lastvisit && dataToUpdate.lastvisit instanceof Date) {
      dataToUpdate.lastvisit = Timestamp.fromDate(dataToUpdate.lastvisit);
    }

    dataToUpdate.diagnosis = determineDiagnosis(dataToUpdate);

    await updateDoc(docRef, dataToUpdate);
  } catch (error) {
    window.alert("Error updating EHR record: " + error.message);
    throw error;
  }
};

// --- Delete EHR Record ---
export const deleteEhrRecord = async (docId) => {
  try {
    const docRef = doc(db, "ehr", docId);
    await deleteDoc(docRef);
  } catch (error) {
    window.alert("Error deleting EHR record: " + error.message);
    throw error;
  }
};
