import { useState, useMemo } from "react";

const useSortRecords = (patients) => {
  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending order
  const [sortField, setSortField] = useState("caseNo"); // Default to "Case No."

  const sortedPatients = useMemo(() => {
    const sorted = [...patients].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Handle date sorting if the field is "lastVisit"
      if (sortField === "lastVisit") {
        const [dayA, monthA, yearA] = aVal.split("/").map((num) => parseInt(num, 10));
        const [dayB, monthB, yearB] = bVal.split("/").map((num) => parseInt(num, 10));

        const dateA = new Date(yearA, monthA - 1, dayA); // Month is zero-indexed
        const dateB = new Date(yearB, monthB - 1, dayB); // Month is zero-indexed

        aVal = dateA;
        bVal = dateB;
      } else {
        aVal = aVal?.toString().toLowerCase() || "";
        bVal = bVal?.toString().toLowerCase() || "";
      }

      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return sorted;
  }, [patients, sortOrder, sortField]);

  const sortByField = (field) => {
    if (field === sortField) {
      // If the same column is clicked, toggle the sort order
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // If a new column is clicked, sort by that column in ascending order
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return { sortedPatients, sortByField, sortOrder, sortField };
};

export default useSortRecords;
