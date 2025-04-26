export function getDiagnosis(distanceOD, distanceOS, nearOD, nearOS) {
    const toNum = (val) => {
      if (!val || val === "-") return null;
      const match = val.match(/-?\d+(\.\d+)?/); // Extract number
      return match ? parseFloat(match[0]) : null;
    };
  
    const dOD = toNum(distanceOD);
    const dOS = toNum(distanceOS);
    const nOD = toNum(nearOD);
    const nOS = toNum(nearOS);
  
    const isNegative = (val) => val !== null && val < 0;
    const isPositive = (val) => val !== null && val > 0;
  
    // Emmetropia
    if ((dOD === 0 || dOD === null) && (dOS === 0 || dOS === null) && nOD === null && nOS === null) {
      return "Emmetropia (Normal Vision)";
    }
  
    // Myopia
    if (isNegative(dOD) || isNegative(dOS)) {
      return "Myopia (Nearsightedness)";
    }
  
    // Hyperopia
    if (isPositive(dOD) || isPositive(dOS)) {
      return "Hyperopia (Farsightedness)";
    }
  
    // Presbyopia
    if ((isPositive(nOD) || isPositive(nOS)) && (dOD !== null || dOS !== null)) {
      return "Presbyopia (Age-related near vision)";
    }
  
    // Astigmatism
    if ((distanceOD.includes("/") || distanceOS.includes("/")) && (distanceOD.includes("×") || distanceOS.includes("×"))) {
      return "Astigmatism (Irregular cornea shape)";
    }
  
    // Mixed Astigmatism
    if ((distanceOD.includes("+") && distanceOD.includes("-")) || (distanceOS.includes("+") && distanceOS.includes("-"))) {
      return "Mixed Astigmatism";
    }
  
    // Anisometropia
    if (dOD !== null && dOS !== null && Math.abs(dOD - dOS) >= 1) {
      return "Anisometropia (Large difference between eyes)";
    }
  
    return "Unable to determine diagnosis";
  }
  