import styles from "@/styles/clinic/clinic-appointments.module.css";

const AppointmentsTable = ({
  appointments,
  sortConfig,
  onSort,
  onStatusChange,
  onView,
}) => {
  return (
    <div className={styles.tableContainer}>
      {appointments.length > 0 ? (
        <table className={styles.appointmentsTable}>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th onClick={() => onSort("patientName")}>
                Patient Name{" "}
                {sortConfig.key === "patientName" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th>Contact</th>
              <th onClick={() => onSort("appointmentDate")}>
                Date{" "}
                {sortConfig.key === "appointmentDate" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th>Time</th>
              <th>Reason</th>
              <th onClick={() => onSort("status")}>
                Status{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                onStatusChange={onStatusChange}
                onView={onView}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <NoResults />
      )}
    </div>
  );
};

const AppointmentRow = ({ appointment, onStatusChange, onView }) => {
  return (
    <tr>
      <td data-label="Patient ID">
        {appointment.patientId.length > 10
          ? appointment.patientId.slice(0, 10) + "..."
          : appointment.patientId}
      </td>
      <td data-label="Patient Name">
        <div className={styles.patientInfo}>
          <span className={styles.patientName}>{appointment.patientName}</span>
        </div>
      </td>
      <td data-label="Contact">{appointment.contactNumber}</td>
      <td data-label="Date">
        {new Date(appointment.appointmentDate).toLocaleDateString()}
      </td>
      <td data-label="Time">{appointment.appointmentTime}</td>
      <td data-label="Reason">
        {appointment.reason === "Other (Please specify)"
          ? appointment.otherReason
          : appointment.reason}
      </td>
      <td data-label="Status">
        <span
          className={`${styles.statusBadge} ${
            styles[appointment.status.toLowerCase()]
          }`}
        >
          {appointment.status}
        </span>
      </td>
      <td data-label="Actions">
        <div className={styles.actions}>
          <select
            value={appointment.status}
            onChange={(e) => onStatusChange(appointment.id, e.target.value)}
            className={styles.statusSelect}
          >
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            className={styles.viewButton}
            onClick={() => onView(appointment)}
          >
            View
          </button>
        </div>
      </td>
    </tr>
  );
};

const NoResults = () => (
  <div className={styles.noResults}>
    <p>No appointments found matching your criteria</p>
    <button
      onClick={() => {
        setDateFilter("");
        setStatusFilter("All");
        setSearchTerm("");
      }}
      className={styles.clearFilters}
    >
      Clear all filters
    </button>
  </div>
);

export default AppointmentsTable;
