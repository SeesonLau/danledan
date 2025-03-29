import PatientSidebar from './sidebar/patientsidebar';

export default function PatientLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
        <PatientSidebar />
        <main style={{ flex: 1 }}>
            {children}
        </main>
    </div>
);
}
