import React from 'react';
import html2canvas from 'html2canvas';  
import jsPDF from 'jspdf';

/*
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
};*/

const PrintEHR = async (printRef, setIsPrinting, caseno, clinic) => {
  const element = printRef.current;
  if (!element) return;

  try {
    setIsPrinting(true);

    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [1098, 892.99] });
    pdf.addImage(data, 'PNG', 0, 0, 1098, 892.99);

    const fileName = `${caseno} - ${clinic}.pdf`;

    pdf.save(fileName);

  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    setIsPrinting(false);
  }
};

export default PrintEHR;



