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
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { determineDiagnosis } from "@/components/getDiagnosis";

// Fetching Clinics from Firestore
export const getClinics = async (province, city) => {
  try {
    const clinicsRef = collection(db, "clinics");
    let q = clinicsRef;

    if (province) {
      q = query(q, where("province", "==", province));
    }
    if (city) {
      q = query(q, where("city", "==", city));
    }

    const querySnapshot = await getDocs(q);
    const clinics = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        name: data.clinicName,
        address: data.address,
        contact: data.phone,
        id: doc.id,
      };
    });

    return {
      [city]: clinics, // Return an object with a 'city' property
    };
  } catch (error) {
    console.error("Error getting clinics:", error);
    return { clinics: [] }; // Return an object with an empty 'clinics' array on error
  }
};

export const getPatientDoc = async (patientId) => {
  try {
    // Create a reference to the patient document in the "patients" collection
    const patientDocRef = doc(db, "patients", patientId);

    // Retrieve the document using getDoc()
    const patientDocSnapshot = await getDoc(patientDocRef);
    const patient = patientDocSnapshot.data();

    // Check if the document exists
    if (patientDocSnapshot.exists()) {
      // Return the document data as an object
      return {
        name: `${patient.firstName || ""} ${patient.middleName || ""} ${
          patient.lastName || ""
        }`,
        sex: patient.sex,
        email: patient.email,
        contact: patient.phone,
      };
    } else {
      // Document does not exist
      return null;
    }
  } catch (error) {
    // Handle errors appropriately
    console.error("Error retrieving patient document:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const getClinicDoc = async (clinicId) => {
  try {
    // Create a reference to the patient document in the "patients" collection
    const clinicDocRef = doc(db, "clinics", clinicId);

    // Retrieve the document using getDoc()
    const clinicDocSnapshot = await getDoc(clinicDocRef);
    const clinic = clinicDocSnapshot.data();

    // Check if the document exists
    if (clinicDocSnapshot.exists()) {
      // Return the document data as an object
      return {
        name: clinic.clinicName,
        licenseNumber: clinic.licenseNumber,
        email: clinic.email,
        contact: clinic.phone,
        id: clinicDocSnapshot.id,
      };
    } else {
      // Document does not exist
      return null;
    }
  } catch (error) {
    // Handle errors appropriately
    console.error("Error retrieving patient document:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

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

const ehrCollGroupRef = collectionGroup(db, "ehr");
const ehrCollectionRef = collection(db, "ehr");
const patientsCollectionRef = collection(db, "patients");

// --- Add EHR Record with Versioning ---
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
    return doc.id; // Or doc.data().uid if you store UID in the patient doc
  }
  return null; // Return null if no patient is found
}

async function findClinicInfo(clinicId) {
  const q = query(
    patientsCollectionRef,
    where("firstName", "==", firstName),
    where("lastName", "==", lastName),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return doc.id; // Or doc.data().uid if you store UID in the patient doc
  }
  return null; // Return null if no patient is found
}

export const addEhrRecord = async (ehrData) => {
  try {
    validateEhrData(ehrData);

    const [firstName, lastName] = ehrData.patientname.split(" ");
    const patientUid = await findPatientUid(firstName, lastName);

    const q = query(
      ehrCollGroupRef,
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

export const saveEHRRecord = async (appointmentData) => {
  try {
    if (!appointmentData || typeof appointmentData !== "object") {
      throw new Error("Invalid appointment data.");
    }

    const appointmentsCollectionRef = collection(db, "ehr");

    const dataToSave = {
      ...appointmentData,
    };

    const docRef = await addDoc(appointmentsCollectionRef, dataToSave);
    return docRef.id;
  } catch (error) {
    window.alert("Error saving appointment: " + error.message);
    throw error;
  }
};

export const generateCaseNumber = async () => {
  try {
    const ehrCollectionRef = collection(db, "ehr");
    const caseNumbersQuery = query(
      ehrCollectionRef,
      orderBy("caseno", "asc") // Order by case number ascending
    );
    const caseNumbersSnapshot = await getDocs(caseNumbersQuery);

    let latestCaseNumber = "CASE-0000"; // Default value

    if (!caseNumbersSnapshot.empty) {
      // Get all case numbers into an array.
      const caseNumbers = caseNumbersSnapshot.docs.map(
        (doc) => doc.data().caseno
      );
      //get the last case number
      latestCaseNumber = caseNumbers[caseNumbers.length - 1];
    }

    // Parse and increment
    const numericPart = parseInt(latestCaseNumber.slice(5), 10);
    const nextNumericPart = numericPart + 1;
    const newCaseNumber = `CASE-${nextNumericPart.toString().padStart(4, "0")}`;

    return newCaseNumber;
  } catch (error) {
    console.error("Error generating case number:", error);
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

// --- Get EHRs by Patient UID ---
export const getEhrRecordsByPatient = async (patientId) => {
  try {
    if (!patientId) throw new Error("Patient ID is required.");

    const q = query(ehrCollGroupRef, where("patientUid", "==", patientId));
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

export const fetchAppointmentClinic = async (clinicId) => {
  try {
    const appointmentsRef = collection(db, "appointments"); // Get reference to the 'appointments' collection
    const q = query(appointmentsRef, where("clinic.id", "==", clinicId)); // Create a query to filter by clinicId

    const querySnapshot = await getDocs(q); // Execute the query

    const appointments = querySnapshot.docs.map((doc) => {
      // Map each document to an object containing its ID and data
      const info = doc.data();
      console.log(info);
      //console.log(info.clinic.date);
      let mm, dd, yy;

      /*if (info?.clinic?.date) {
        const months = {
          January: 0,
          February: 1,
          March: 2,
          April: 3,
          May: 4,
          June: 5,
          July: 6,
          August: 7,
          September: 8,
          October: 9,
          November: 10,
          December: 11,
        };

        const parts = info.clinic.date.split(" ");
        const monthName = parts[0];
        const day = parseInt(parts[1].replace(",", ""), 10); // Remove the comma and parse
        const year = parseInt(parts[2], 10);
        const month = months[monthName];
        const date = new Date(year, month, day);

        mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        dd = String(date.getDate()).padStart(2, "0");
        yy = String(date.getFullYear()).slice(-2);
      }*/

      return {
        id: doc.id,
        name: `${info.reason} at ${info.name} on ${info.date} `,
        time: `${info.time}`,
        date: info.date,
      };
    });
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const fetchAppointmentPatient = async (patientId) => {
  try {
    const appointmentsRef = collection(db, "appointments"); // Get reference to the 'appointments' collection
    const q = query(appointmentsRef, where("userUid", "==", patientId)); // Create a query to filter by patientId

    const querySnapshot = await getDocs(q); // Execute the query

    const appointments = querySnapshot.docs.map((doc) => {
      // Map each document to an object containing its ID and data
      const info = doc.data();
      console.log(info);
      //console.log(info.clinic.date);
      let mm, dd, yy;

      /*if (info?.date) {
        const months = {
          January: 0,
          February: 1,
          March: 2,
          April: 3,
          May: 4,
          June: 5,
          July: 6,
          August: 7,
          September: 8,
          October: 9,
          November: 10,
          December: 11,
        };

        const parts = info.date.split(" ");
        const monthName = parts[0];
        const day = parseInt(parts[1].replace(",", ""), 10); // Remove the comma and parse
        const year = parseInt(parts[2], 10);
        const month = months[monthName];
        const date = new Date(year, month, day);

        mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        dd = String(date.getDate()).padStart(2, "0");
        yy = String(date.getFullYear()).slice(-2);
      }*/

      return {
        id: doc.id,
        name: `${info.reason} at ${info.clinic.name} on ${info.date} `,
        time: `${info.time}`,
        date: info.date,
      };
    });
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const getAppointmentClinic = async (clinicId) => {
  try {
    const appointmentsRef = collection(db, "appointments");

    const q = query(appointmentsRef, where("clinic.id", "==", clinicId)); // Only filter by clinicId

    const querySnapshot = await getDocs(q);

    const appointments = [];
    console.log(querySnapshot);
    querySnapshot.forEach(async (item) => {
      const appData = item.data();

      const patientDocRef = doc(db, "patients", appData.userUid);
      const patientDocSnapshot = await getDoc(patientDocRef);
      const patient = patientDocSnapshot.data();

      appointments.push({
        id: item.id,
        patientId: appData.userUid,
        patientName: appData.name,
        sex: appData.sex,
        email: appData.email,
        contactNumber: appData.contactNumber,
        appointmentDate: appData.date,
        appointmentTime: appData.time,
        reason: appData.reason,
        otherReason: appData.otherReason,
        status: appData.status,
        pdfFile: "",
        createdAt: appData.createdAt,
        clinic: appData.clinic,
        birthDate: patient.birthDate || "",
        address:
          `${patient.address}, ${patient.city}, ${patient.province}` || "",
        age: patient.age || "",
      });
    });

    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);

    return [];
  }
};

export const updateAppointment = async (appointmentId) => {
  try {
    const appointmentRef = doc(db, "appointments", appointmentId);
    const updatedData = {
      status: "Cancelled",
    };
    await updateDoc(appointmentRef, updatedData);
  } catch (error) {
    console.error("Error updating appointment:", error);
  }
};
