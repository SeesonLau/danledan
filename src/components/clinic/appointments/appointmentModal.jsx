import styles from "@/styles/clinic/clinic-appointments.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const AppointmentModal = ({ appointment, onClose, handleViewEHR }) => {
  if (!appointment) return null;

  const router = useRouter();

  const handleEHRNavigation = () => {
    // Pass the appointment data as a query parameter.  Needs to be stringified.
    router.push({
      pathname: "/clinic/clinic-ehr",
      query: { appointment: JSON.stringify(appointment) },
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Appointment Details</h2>
          <button onClick={onClose} className={styles.modalClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <DetailRow label="Patient ID" value={appointment.patientId} />
          <DetailRow label="Patient Name" value={appointment.patientName} />
          <DetailRow label="Sex" value={appointment.sex} />
          <DetailRow label="Email" value={appointment.email} />
          <DetailRow label="Contact Number" value={appointment.contactNumber} />
          <DetailRow
            label="Appointment Date"
            value={`${new Date(
              appointment.appointmentDate
            ).toLocaleDateString()} at ${appointment.appointmentTime}`}
          />
          <DetailRow
            label="Reason"
            value={
              appointment.reason === "Other (Please specify)"
                ? appointment.otherReason
                : appointment.reason
            }
          />
          <DetailRow
            label="Status"
            value={appointment.status}
            status={appointment.status.toLowerCase()}
          />
          {appointment.pdfFile && (
            <DetailRow
              label="Uploaded File"
              value={
                <a
                  href={`/uploads/${appointment.pdfFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fileLink}
                >
                  {appointment.pdfFile}
                </a>
              }
            />
          )}
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.modalButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, status }) => (
  <div className={styles.detailRow}>
    <span className={styles.detailLabel}>{label}:</span>
    <span className={`${styles.detailValue} ${status ? styles[status] : ""}`}>
      {value}
    </span>
  </div>
);

export default AppointmentModal;
