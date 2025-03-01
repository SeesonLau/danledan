import PatientLayout from "@/components/patient-layout";
export default function PatientEHR() {
    return (
        <PatientLayout>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>PATIENT Electronic Health Records (EHR)</h1>
                        <p style={{ fontSize: '1.5rem' }}>View and manage patient records.</p>
                    </div>
        </PatientLayout>
    );
}