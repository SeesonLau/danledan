import React from 'react';
import html2canvas from 'html2canvas';  
import jsPDF from 'jspdf';

const ExportEHR = async (printRef) => {
  const element = printRef.current;
  if (!element) return;

  try {
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [1098, 892.99] }); // Adjusted format
    pdf.addImage(data, 'PNG', 0, 0, 1098, 892.99);
    pdf.save("patient-records--.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

export default ExportEHR;
