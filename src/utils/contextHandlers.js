// Enhanced conversation context
export const createContext = () => ({
    conversationStage: 'initial',
    previousCondition: null,
    mentionedSymptoms: [],
    previousMatches: [],
    waitingForFollowUp: null, // Initialize this property
    waitingForConfirmation: null, // Initialize this property
    userInfo: {
        age: null,
        gender: null,
        medicalHistory: []
    },
    symptomHistory: []
});

// Helper Functions
export const getAgeGroup = (age) => {
    if (!age) return null;
    if (age <= 12) return 'child';
    if (age <= 19) return 'teen';
    if (age <= 64) return 'adult';
    return 'elderly';
};