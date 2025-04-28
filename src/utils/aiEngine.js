import { diseaseProfiles } from './diseaseProfiles.js';
import { symptomPatterns } from './symptomPatterns.js';
import { createContext, getAgeGroup } from './contextHandlers.js';
import { calculateMatchPercentages, getFollowUpQuestion } from './analysisFunctions.js';
import { generateResponse, handleAIConversation } from './conversationHandlers.js';


// Helper function to list all diseases
const listAllDiseases = () => {
    return Object.keys(diseaseProfiles)
      .sort()
      .join('\n');
};

// Helper function to list all symptoms
const listAllSymptoms = () => {
    const allSymptoms = new Set();
    Object.values(diseaseProfiles).forEach(disease => {
      Object.keys(disease.symptoms).forEach(symptom => {
        allSymptoms.add(symptom);
      });
    });
    return Array.from(allSymptoms)
      .sort()
      .join('\n');
};

// Symptom extraction with natural language understanding
const extractSymptomsWithWeights = (input, context = createContext()) => {
    const symptoms = [];
    const symptomWeights = {};
    const inputLower = input.toLowerCase().trim();

    // Check for season mode commands first
    if (inputLower === 'seeson mode') {
        return {
            type: 'devmode',
            message: "Developer mode activated. Available commands:\n- 'show all diseases'\n- 'show all symptoms'\n- 'exit season mode'",
            context: {
                ...context,
                devMode: true
            }
        };
    }

    // Handle dev mode commands if in dev mode
    if (context.devMode) {
        if (inputLower === 'show all diseases') {
            return {
                type: 'devmode',
                message: getAllDiseasesFormatted(),
                context
            };
        }
        
        if (inputLower === 'show all symptoms') {
            return {
                type: 'devmode',
                message: getAllSymptomsFormatted(),
                context
            };
        }
        
        if (inputLower === 'exit season mode') {
            return {
                type: 'devmode',
                message: "Exiting season mode. Returning to normal operation.",
                context: {
                    ...context,
                    devMode: false
                }
            };
        }
    }

    // Normal symptom extraction logic
    Object.entries(symptomPatterns).forEach(([symptom, patterns]) => {
        const found = patterns.some(pattern => pattern.test(inputLower));
        if (found) {
            let weight = 1;
            
            // Detect severity modifiers
            if (/(very|extremely|terribly|really bad|severe)/i.test(inputLower)) weight = 3;
            else if (/(moderately|somewhat|kind of|a little)/i.test(inputLower)) weight = 2;
            
            // Detect duration modifiers
            if (/(constant|all the time|persistent|non-stop)/i.test(inputLower)) weight += 1;
            if (/(occasional|sometimes|once in a while)/i.test(inputLower)) weight = Math.max(1, weight - 1);
            
            if (!symptomWeights[symptom] || weight > symptomWeights[symptom]) {
                symptomWeights[symptom] = weight;
            }
        }
    });

    // Then check for direct symptom matches
    Object.values(diseaseProfiles).forEach(disease => {
        Object.keys(disease.symptoms).forEach(symptom => {
            const regex = new RegExp(symptom.replace(/ /g, '\\s+'), 'i');
            if (regex.test(inputLower) && !symptomWeights[symptom]) {
                let weight = 1;
                if (new RegExp(`(very|extremely|terribly) ${symptom}`).test(inputLower)) weight = 3;
                else if (new RegExp(`(moderately|somewhat) ${symptom}`).test(inputLower)) weight = 2;
                
                symptomWeights[symptom] = weight;
            }
        });
    });

    // Enhanced follow-up question response handling
    if (context.waitingForFollowUp) {
        const condition = diseaseProfiles[context.waitingForFollowUp];
        if (condition) {
            const followUpData = getFollowUpQuestion(context.waitingForFollowUp);
            
            // Check if this is a response to our follow-up question
            const positiveMatch = followUpData.positiveKeywords.some(keyword => 
                new RegExp(`\\b${keyword}\\b`, 'i').test(inputLower)
            );
            const negativeMatch = followUpData.negativeKeywords.some(keyword => 
                new RegExp(`\\b${keyword}\\b`, 'i').test(inputLower)
            );
            const isYesNo = /^(yes|no|yeah|nope)\b/i.test(inputLower);

            if (positiveMatch || isYesNo && /yes/i.test(inputLower)) {
                // Add all condition symptoms with high weight for positive confirmation
                Object.keys(condition.symptoms).forEach(symptom => {
                    symptomWeights[symptom] = Math.max(symptomWeights[symptom] || 0, 3);
                });
                
                // Add specific symptoms based on condition
                switch(context.waitingForFollowUp) {
                    case 'Astigmatism':
                        symptomWeights['night vision problems'] = 3;
                        break;
                    case 'Myopia':
                        symptomWeights['blurred distance vision'] = 3;
                        break;
                    // Add other condition-specific cases as needed
                }
            } 
            else if (negativeMatch || isYesNo && /no/i.test(inputLower)) {
                // Reduce weight for this condition's symptoms
                Object.keys(condition.symptoms).forEach(symptom => {
                    if (symptomWeights[symptom]) {
                        symptomWeights[symptom] = Math.max(1, symptomWeights[symptom] - 1);
                    }
                });
            }
            else {
                // Handle neutral responses (like "night" for Astigmatism)
                switch(context.waitingForFollowUp) {
                    case 'Astigmatism':
                        if (/night|dark|evening/i.test(inputLower)) {
                            symptomWeights['night vision problems'] = 3;
                        } else if (/day|light|daytime/i.test(inputLower)) {
                            symptomWeights['daytime vision problems'] = 2;
                        }
                        break;
                    // Add other condition-specific neutral response handling
                }
            }
        }
    }

    for (const [symptom, weight] of Object.entries(symptomWeights)) {
        symptoms.push({ symptom, weight });
    }

    return symptoms;
};








// Enhanced context-aware response generation


// Main analysis function
export const analyzeSymptoms = (userInput, context = createContext()) => {
    try {
        const input = userInput.toLowerCase().trim();
        
        // Ensure context is properly initialized
        context = {
            ...createContext(),
            ...context
        };
        
        // Extract symptoms
        const extractionResult = extractSymptomsWithWeights(input, context);
        
        // Check if we got a devmode response instead of symptoms
        if (extractionResult.type === 'devmode') {
            return extractionResult;
        }
        
        // Normal symptom processing
        const symptoms = extractionResult; // This is now guaranteed to be an array
        const ageGroup = getAgeGroup(context.userInfo.age);
        const matches = calculateMatchPercentages(symptoms, ageGroup);
        
        return generateResponse(matches, context, input);
        
    } catch (error) {
        console.error('AI Error:', error);
        return {
            type: 'error',
            message: "I'm having trouble understanding. Could you describe your symptoms differently?",
            context: context || createContext()
        };
    }
};





