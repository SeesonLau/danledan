// Helper function to get all diseases formatted with categories
export const getAllDiseasesFormatted = () => {
    return `// Refractive Errors (4)
      Astigmatism
      Myopia
      Hyperopia
      Presbyopia
  
      // Dry Eye Conditions (3)
      Dry Eye Syndrome
      Evaporative Dry Eye
      Aqueous Deficiency Dry Eye
  
      // Infections/Inflammation (8)
      Acute Conjunctivitis
      Chronic Conjunctivitis
      Bacterial Conjunctivitis
      Viral Conjunctivitis
      Allergic Conjunctivitis
      Blepharitis
      Keratitis
      Uveitis
  
      // Glaucoma (2)
      Open-Angle Glaucoma
      Angle-Closure Glaucoma
  
      // Retinal (5)
      Diabetic Retinopathy
      Macular Degeneration
      Retinal Detachment
      Retinal Vein Occlusion
      Retinitis Pigmentosa
  
      // Neuro-ophthalmic (3)
      Optic Neuritis
      Ocular Migraine
      Horner Syndrome
  
      // Pediatric (3)
      Amblyopia
      Strabismus
      Congenital Cataract
  
      // Trauma/Injury (3)
      Corneal Abrasion
      Chemical Burn
      Hyphema
  
      // Systemic (6)
      Thyroid Eye Disease
      Sjogren Syndrome
      Sarcoidosis
      Heterochromia
      Anisocoria
      Coloboma
  
      // Degenerative (3)
      Keratoconus
      Fuchs Dystrophy
      Pterygium`;
  };

  // Helper function to get all diseases formatted with categories
// Helper function to get all symptoms formatted with categories
export const getAllSymptomsFormatted = () => {
    // Collect all unique symptoms from all diseases
    const allSymptoms = new Set();
    Object.values(diseaseProfiles).forEach(disease => {
      Object.keys(disease.symptoms).forEach(symptom => {
        allSymptoms.add(symptom);
      });
    });
  
    // Categorize symptoms
    const visionSymptoms = [];
    const painSymptoms = [];
    const appearanceSymptoms = [];
    const otherSymptoms = [];
  
    allSymptoms.forEach(symptom => {
      if (symptom.includes('vision') || symptom.includes('see') || symptom.includes('visual')) {
        visionSymptoms.push(symptom);
      } else if (symptom.includes('pain') || symptom.includes('hurt') || symptom.includes('ache')) {
        painSymptoms.push(symptom);
      } else if (symptom.includes('red') || symptom.includes('swell') || symptom.includes('appearance') || symptom.includes('color')) {
        appearanceSymptoms.push(symptom);
      } else {
        otherSymptoms.push(symptom);
      }
    });
  
    // Format the output
    return `// Vision-related Symptoms (${visionSymptoms.length})
      ${visionSymptoms.join('\n    ')}
  
      // Pain/Discomfort Symptoms (${painSymptoms.length})
      ${painSymptoms.join('\n    ')}
  
      // Appearance Symptoms (${appearanceSymptoms.length})
      ${appearanceSymptoms.join('\n    ')}
  
      // Other Symptoms (${otherSymptoms.length})
      ${otherSymptoms.join('\n    ')}`;
  };