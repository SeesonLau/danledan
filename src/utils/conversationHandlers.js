import { diseaseProfiles } from './diseaseProfiles.js';
import { getFollowUpQuestion } from './analysisFunctions.js';
import { createContext } from './contextHandlers.js';

export const generateResponse = (matches, context, userInput) => {
    const inputLower = userInput.toLowerCase().trim();

   // Handle dev mode first
   if (context.devMode) {
       if (/show all diseases/i.test(inputLower)) {
           const diseaseList = Object.keys(diseaseProfiles).join('\n');
           return {
               type: 'devmode',
               message: `All diseases in profiles:\n${diseaseList}`,
               context
           };
       }
       if (/show all symptoms/i.test(inputLower)) {
           const allSymptoms = new Set();
           Object.values(diseaseProfiles).forEach(disease => {
               Object.keys(disease.symptoms).forEach(symptom => {
                   allSymptoms.add(symptom);
               });
           });
           const symptomList = Array.from(allSymptoms).join('\n');
           return {
               type: 'devmode',
               message: `All symptoms in profiles:\n${symptomList}`,
               context
           };
       }
       if (/exit devmode/i.test(inputLower)) {
           return {
               type: 'devmode',
               message: "Exiting developer mode",
               context: {
                   ...context,
                   devMode: false
               }
           };
       }
   }
   
   // Check for 100% confidence diagnosis
   if (matches.length > 0 && matches[0].percentage === 100) {
       const condition = matches[0].name;
       const conditionInfo = diseaseProfiles[condition];
       
       let response = `Based on your symptoms, I'm 100% confident you have ${condition}.\n\n`;
       response += `About ${condition}:\n`;
       response += `- Common symptoms: ${Object.keys(conditionInfo.symptoms).join(', ')}\n`;
       response += `- Typically affects: ${conditionInfo.age_group.join(', ')}\n`;
       response += `- Prevalence: ${(conditionInfo.prevalence * 100).toFixed(1)}% of population\n\n`;
       response += "Would you like more detailed information about this condition?";

       return {
           type: 'diagnosis',
           message: response,
           matches,
           context: {
               ...context,
               previousCondition: condition,
               previousMatches: matches,
               waitingForFollowUp: null
           }
       };
   }

   // Check if user wants to start a new diagnosis
   if (/(new diagnosis|start over|forget previous|reset)/i.test(inputLower)) {
       return {
           type: 'confirmation',
           message: "Just to confirm, you want me to forget all previous symptoms and start a new diagnosis? (yes/no)",
           context: {
               ...context,
               waitingForConfirmation: 'newDiagnosis',
               waitingForFollowUp: null
           }
       };
   }
   
   // Handle confirmation for new diagnosis
   if (context.waitingForConfirmation === 'newDiagnosis') {
       if (/(yes|yeah|yup|sure|definitely|absolutely)/i.test(inputLower)) {
           return {
               type: 'analysis',
               message: "Okay, I'll start fresh. Please describe your eye symptoms.",
               context: createContext()
           };
       } else {
           return {
               type: 'analysis',
               message: "I'll continue with our previous conversation. What other symptoms are you experiencing?",
               context: {
                   ...context,
                   waitingForConfirmation: null
               }
           };
       }
   }
   
   // Handle follow-up question responses
   if (context.waitingForFollowUp) {
       const condition = diseaseProfiles[context.waitingForFollowUp];
       const followUpData = getFollowUpQuestion(context.waitingForFollowUp);
       
       // Check if this is a response to our follow-up question
       const isResponse = followUpData.positiveKeywords.some(k => new RegExp(`\\b${k}\\b`, 'i').test(inputLower)) ||
                         followUpData.negativeKeywords.some(k => new RegExp(`\\b${k}\\b`, 'i').test(inputLower)) ||
                         /^(yes|no|yeah|nope)\b/i.test(inputLower);

       if (isResponse) {
           // Extract symptoms from this response
           const newSymptoms = extractSymptomsWithWeights(userInput, context);
           
           // Update context with new symptoms
           const updatedContext = {
               ...context,
               mentionedSymptoms: [
                   ...context.mentionedSymptoms,
                   ...newSymptoms.map(s => s.symptom).filter(s => !context.mentionedSymptoms.includes(s))
               ],
               waitingForFollowUp: null
           };
           
           // Recalculate matches with updated symptoms
           const updatedSymptoms = [
               ...updatedContext.mentionedSymptoms.map(s => ({ symptom: s, weight: 2 })),
               ...newSymptoms
           ];
           const updatedMatches = calculateMatchPercentages(updatedSymptoms, getAgeGroup(updatedContext.userInfo.age));
           const topMatches = updatedMatches.slice(0, 3);
           
           // Generate response based on confidence level
           if (topMatches.length === 0) {
               return {
                   type: 'question',
                   message: "I'm not finding matches. Could you describe any of these?\n- Blurred vision\n- Eye pain\n- Redness\n- Light sensitivity",
                   context: updatedContext
               };
           }
           
           let response = "Based on our conversation:\n";
           topMatches.forEach(match => {
               response += `▸ ${match.percentage}% ${match.name}\n`;
           });
           
           if (topMatches[0].percentage > 70) {
               // High confidence diagnosis
               return {
                   type: 'analysis',
                   message: `${response}\n\nIt seems most likely you have ${topMatches[0].name}. Would you like more information about this condition?`,
                   matches: topMatches,
                   context: {
                       ...updatedContext,
                       previousMatches: topMatches,
                       previousCondition: topMatches[0].name
                   }
               };
           } else {
               // Ask next follow-up question
               const nextCondition = topMatches[0].name;
               const nextQuestion = getFollowUpQuestion(nextCondition).question;
               
               return {
                   type: 'analysis',
                   message: `${response}\n\n${nextQuestion}`,
                   matches: topMatches,
                   context: {
                       ...updatedContext,
                       waitingForFollowUp: nextCondition,
                       previousMatches: topMatches,
                       previousCondition: nextCondition
                   }
               };
           }
       }
   }
   
   // Handle initial symptoms or new information
   const topMatches = matches.slice(0, 3);
   
   if (topMatches.length === 0) {
       return {
           type: 'question',
           message: "I'm not finding matches. Could you describe any of these?\n- Blurred vision\n- Eye pain\n- Redness\n- Light sensitivity",
           context
       };
   }
   
   let response = "Based on your symptoms:\n";
   topMatches.forEach(match => {
       response += `▸ ${match.percentage}% ${match.name}\n`;
   });
   
   // Ask follow-up question for top match
   const primaryCondition = topMatches[0].name;
   const followUpQuestion = getFollowUpQuestion(primaryCondition).question;
   
   return {
       type: 'analysis',
       message: `${response}\n\n${followUpQuestion}`,
       matches: topMatches,
       context: {
           ...context,
           waitingForFollowUp: primaryCondition,
           previousMatches: topMatches,
           previousCondition: primaryCondition,
           mentionedSymptoms: [
               ...context.mentionedSymptoms,
               ...extractSymptomsWithWeights(userInput, context).map(s => s.symptom)
                   .filter(s => !context.mentionedSymptoms.includes(s))
           ]
       }
   };
};

// Conversation handler with better flow
export const handleAIConversation = async (userMessage, conversationHistory = [], setIsTyping) => {
    try {
        setIsTyping(true);
        
        // Get the last context or create new one
        const lastMessage = conversationHistory[conversationHistory.length - 1];
        let currentContext = lastMessage?.context || createContext();
        const inputLower = userMessage.toLowerCase().trim();

        // Handle season mode activation
        if (inputLower === 'seeson mode') {
            await simulateTyping(500);
            setIsTyping(false);
            return {
                type: 'devmode',
                message: "Developer mode activated. Available commands:\n- 'show all diseases'\n- 'show all symptoms'\n- 'exit season mode'",
                context: {
                    ...currentContext,
                    devMode: true
                }
            };
        }

        // Handle season mode commands if in dev mode
        if (currentContext.devMode) {
            await simulateTyping(500);
            setIsTyping(false);
            
            if (inputLower === 'show all diseases') {
                return {
                    type: 'devmode',
                    message: getAllDiseasesFormatted(),
                    context: currentContext
                };
            }
            
            if (inputLower === 'show all symptoms') {
                return {
                    type: 'devmode',
                    message: getAllSymptomsFormatted(),
                    context: currentContext
                };
            }
            
            if (inputLower === 'exit season mode') {
                return {
                    type: 'devmode',
                    message: "Exiting season mode. Returning to normal operation.",
                    context: {
                        ...currentContext,
                        devMode: false
                    }
                };
            }
        }

        // Handle greetings
        if (/^(hi|hello|hey|greetings)/i.test(userMessage)) {
            await simulateTyping(1000);
            setIsTyping(false);
            return {
                type: 'greeting',
                message: "Hello! I'm Vision, your eye health assistant. Please describe any eye symptoms or concerns you're having.",
                context: createContext()
            };
        }
        
        // Handle farewells
        if (/^(bye|goodbye|thanks|thank you)/i.test(userMessage)) {
            await simulateTyping(800);
            setIsTyping(false);
            
            const lastCondition = currentContext.previousCondition;
            const closingMsg = lastCondition 
                ? `Take care! If your ${lastCondition} symptoms worsen, please see an eye doctor.`
                : "Take care of your eyes! Don't hesitate to return if you have more concerns.";
            
            return {
                type: 'farewell',
                message: closingMsg,
                context: currentContext
            };
        }
        
        // Handle gratitude
        if (/^(thanks|thank you|appreciate)/i.test(userMessage)) {
            await simulateTyping(800);
            setIsTyping(false);
            return {
                type: 'acknowledgement',
                message: "You're welcome! Is there anything else about your eye health you'd like to discuss?",
                context: currentContext
            };
        }
        
        // Analyze with simulated typing delay
        await simulateTyping(1500 + Math.random() * 1000);
        
        // First try to analyze the symptoms
        const analysisResult = await analyzeSymptoms(userMessage, currentContext);
        
        // If we got a direct response (like devmode), return it
        if (analysisResult.type && ['devmode', 'error', 'greeting', 'farewell', 'acknowledgement'].includes(analysisResult.type)) {
            setIsTyping(false);
            return analysisResult;
        }
        
        // Otherwise proceed with normal conversation flow
        setIsTyping(false);
        return analysisResult;
        
    } catch (error) {
        console.error('AI Error:', error);
        setIsTyping(false);
        return {
            type: 'error',
            message: "Someone tell Seeson there is a problem with my AI.",
            context: currentContext || createContext()
        };
    }
};

// Helper for realistic typing simulation
const simulateTyping = async (duration) => {
    return new Promise(resolve => setTimeout(resolve, duration));
};
