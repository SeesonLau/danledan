import ClinicLayout from "@/components/clinic-layout";

export default function ClinicSettings() {
    return (
       <ClinicLayout>
                   <div style={{ textAlign: 'center', marginTop: '50px' }}>
                       <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Settings</h1>
                       <p style={{ fontSize: '1.5rem' }}>Manage your clinic settings here.</p>
                   </div>
               </ClinicLayout>
      );
}