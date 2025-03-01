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