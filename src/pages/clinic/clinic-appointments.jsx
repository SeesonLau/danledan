import ClinicLayout from "@/components/clinic-layout";

export default function ClinicAppointments() {
    return (
       <ClinicLayout>
                   <div style={{ textAlign: 'center', marginTop: '50px' }}>
                       <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Appointsments</h1>
                       <p style={{ fontSize: '1.5rem' }}>Manage your appointments here.</p>
                   </div>
        </ClinicLayout>
      );
}