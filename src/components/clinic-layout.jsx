import ClinicSidebar from './sidebar/clinicsidebar';


export default function ClinicLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
        <ClinicSidebar />
        <main style={{ flex: 1 }}>
            {children}
        </main>
    </div>
);
}
