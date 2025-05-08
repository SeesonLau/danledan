import { useMediaQuery } from "react-responsive";
import ClinicLayout from "@/components/clinic-layout";
import styles from "@/styles/clinic/clinic-appointments.module.css";
import Head from "next/head";
import AppointmentsTable from "@/components/clinic/appointments/appointmentsTable";
import AppointmentsFilters from "@/components/clinic/appointments/appointmentsFilter";
import AppointmentModal from "@/components/clinic/appointments/appointmentModal";
import useAppointments from "@/components/hooks/useAppointments";
import Pagination from "@/components/clinic/appointments/pagination";
import { useEffect, useState } from "react";

const ClinicAppointments = () => {
  const [isDesktop, setIsDesktop] = useState(null);

  const {
    currentAppointments,
    dateFilter,
    statusFilter,
    searchTerm,
    sortConfig,
    currentPage,
    totalPages,
    selectedAppointment,
    showModal,
    setDateFilter,
    setStatusFilter,
    setSearchTerm,
    requestSort,
    setCurrentPage,
    handleStatusChange,
    handleViewAppointment,
    closeModal,
  } = useAppointments();

  const AppointmentsContent = () => (
    <>
      <Head>
        <title>Clinic Appointments</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Patient Appointments</h1>
          <button
            className={styles.refreshButton}
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>

        <AppointmentsFilters
          dateFilter={dateFilter}
          statusFilter={statusFilter}
          searchTerm={searchTerm}
          onDateChange={setDateFilter}
          onStatusChange={setStatusFilter}
          onSearchChange={setSearchTerm}
        />

        <AppointmentsTable
          appointments={currentAppointments}
          sortConfig={sortConfig}
          onSort={requestSort}
          onStatusChange={handleStatusChange}
          onView={handleViewAppointment}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {showModal && (
          <AppointmentModal
            appointment={selectedAppointment}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );

  useEffect(() => {
    const checkIsDesktop = () => window.innerWidth >= 1024;
    setIsDesktop(checkIsDesktop());

    const handleResize = () => setIsDesktop(checkIsDesktop());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop === null) return null; // or show a loader while checking screen size
  return isDesktop ? (
    <ClinicLayout>
      <AppointmentsContent />
    </ClinicLayout>
  ) : (
    <div className={styles.clinicContainer}>
      <ClinicLayout />
      <main className={styles.mainContent}>
        <AppointmentsContent />
      </main>
    </div>
  );
};

export default ClinicAppointments;
