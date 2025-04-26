import styles from '@/styles/clinic/clinic-appointments.module.css';

const AppointmentsFilters = ({ 
  dateFilter, 
  statusFilter, 
  searchTerm, 
  onDateChange, 
  onStatusChange, 
  onSearchChange 
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label htmlFor="dateFilter">Date</label>
        <input
          type="date"
          id="dateFilter"
          value={dateFilter}
          onChange={(e) => onDateChange(e.target.value)}
          className={styles.filterInput}
        />
      </div>
      
      <div className={styles.filterGroup}>
        <label htmlFor="statusFilter">Status</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      
      <div className={styles.searchGroup}>
        <label htmlFor="search" className={styles.searchLabel}>Search Patients</label>
        <div className={styles.searchContainer}>
          <input
            type="text"
            id="search"
            placeholder="Name, ID, or reason..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsFilters;
