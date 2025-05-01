// useSortPatients.js
import { useState } from "react";

const useSortPatients = (patients) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedPatients = [...patients].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    return sortedPatients;
  };

  return { sortTable, sortConfig };
};

export default useSortPatients;
