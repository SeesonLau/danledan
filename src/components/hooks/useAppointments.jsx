import { useState, useEffect } from "react";
import { useAuth } from "@/config/AuthContext";
import { getAppointmentClinic } from "@/config/firestore";

const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "appointmentDate",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const appointmentsPerPage = 5;
  const { user, load } = useAuth();

  useEffect(() => {
    // Fetch appointments from API
    const fetchAppointments = async () => {
      try {
        // const response = await fetch('/api/appointments');
        // const data = await response.json();
        // setAppointments(data);

        // Mock data
        /*setAppointments([
          {
            id: 1,
            patientId: 'PID-2023-001',
            patientName: 'John Doe',
            sex: 'Male',
            email: 'john.doe@example.com',
            contactNumber: '09123456789',
            appointmentDate: '2023-11-15',
            appointmentTime: '10:00 AM',
            reason: 'Checkup',
            otherReason: '',
            status: 'Completed',
            pdfFile: 'john_doe_diagnosis.pdf',
            createdAt: '2023-11-10T09:30:00'
          },
          {
            id: 2,
            patientId: 'PID-2023-002',
            patientName: 'Jane Smith',
            sex: 'Female',
            email: 'jane.smith@example.com',
            contactNumber: '09234567890',
            appointmentDate: '2023-11-16',
            appointmentTime: '2:00 PM',
            reason: 'Dental Checkup',
            otherReason: '',
            status: 'Pending',
            pdfFile: null,
            createdAt: '2023-11-11T14:15:00'
          },
          {
            id: 3,
            patientId: 'PID-2023-003',
            patientName: 'Robert Johnson',
            sex: 'Male',
            email: 'robert.j@example.com',
            contactNumber: '09345678901',
            appointmentDate: '2023-11-17',
            appointmentTime: '9:30 AM',
            reason: 'Other (Please specify)',
            otherReason: 'Annual physical exam',
            status: 'Cancelled',
            pdfFile: 'robert_johnson_medical_history.pdf',
            createdAt: '2023-11-12T10:20:00'
          },
        ]);*/
        if (user?.uid) {
          // Ensure user is defined
          const fetchedAppointments = await getAppointmentClinic(user.uid);
          setAppointments(fetchedAppointments);
        } else {
          setAppointments([]); // Or handle the case where user is not logged in
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [user, load]);

  const filteredAppointments = appointments
    .filter((appointment) => {
      return (
        (dateFilter === "" || appointment.appointmentDate === dateFilter) &&
        (statusFilter === "All" || appointment.status === statusFilter) &&
        (searchTerm === "" ||
          appointment.patientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          appointment.patientId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  return {
    appointments,
    filteredAppointments,
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
  };
};

export default useAppointments;
