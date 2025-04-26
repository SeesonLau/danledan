import styles from "@/styles/patient/patient-appointments.module.css";
const AppointmentCalendar = ({ 
    currentMonth, 
    currentYear, 
    navigateMonth, 
    toggleMonthYearPicker, 
    showMonthYearPicker, 
    selectMonth, 
    selectYear, 
    years, 
    weeks, 
    handleDateClick,
    selectedDate
  }) => {
    const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long' });
  
    return (
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarHeader}>
          <button className={styles.navButton} onClick={() => navigateMonth('prev')}>
            <span className={styles.chevron}>‹</span>
          </button>
          <button className={styles.monthYearDisplay} onClick={toggleMonthYearPicker}>
            {monthName} {currentYear}
          </button>
          <button className={styles.navButton} onClick={() => navigateMonth('next')}>
            <span className={styles.chevron}>›</span>
          </button>
        </div>
        
        {showMonthYearPicker ? (
          <div className={styles.monthYearPicker}>
            <div className={styles.monthGrid}>
              {Array.from({ length: 12 }).map((_, i) => (
                <button
                  key={i}
                  className={`${styles.monthOption} ${i === currentMonth ? styles.selected : ''}`}
                  onClick={() => selectMonth(i)}
                >
                  {new Date(currentYear, i).toLocaleDateString('en-US', { month: 'short' })}
                </button>
              ))}
            </div>
            <div className={styles.yearList}>
              {years.map((year) => (
                <button
                  key={year}
                  className={`${styles.yearOption} ${year === currentYear ? styles.selected : ''}`}
                  onClick={() => selectYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className={styles.weekdays}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className={styles.weekday}>{day}</div>
              ))}
            </div>
            <div className={styles.daysGrid}>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className={styles.weekRow}>
                  {week.map((day, dayIndex) => (
                    <button
                      key={dayIndex}
                      className={`${styles.dayCell} ${
                        day
                          ? day.isPast
                            ? styles.notAvailable
                            : day.available
                            ? styles.available
                            : styles.notAvailable
                          : styles.empty
                      } ${selectedDate === day?.formattedDate ? styles.selected : ''}`}
                      onClick={() =>
                        day &&
                        !day.isPast &&
                        day.available &&
                        handleDateClick(day.date)
                      }
                      disabled={day?.isPast || !day?.available}
                    >
                      {day?.day || ''}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default AppointmentCalendar;
  