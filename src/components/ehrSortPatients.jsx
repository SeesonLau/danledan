import { useState, useMemo } from "react";

const useSortPatients = (patients) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("caseNo"); 

  const sortedPatients = useMemo(() => {
    const sorted = [...patients].sort((a, b) => {
      const aVal = a[sortField]?.toString().toLowerCase() || "";
      const bVal = b[sortField]?.toString().toLowerCase() || "";

      return sortOrder === "asc"
        ? aVal.localeCompare(bVal, undefined, { numeric: true })
        : bVal.localeCompare(aVal, undefined, { numeric: true });
    });

    return sorted;
  }, [patients, sortOrder, sortField]);

  const sortByField = (field) => {
    if (field === sortField) {

      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return { sortedPatients, sortByField, sortOrder, sortField };
};

export default useSortPatients;
