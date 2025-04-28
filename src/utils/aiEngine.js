const diseaseProfiles = {
    // Refractive Errors (4)
    'Astigmatism': {
        symptoms: {
            'blurred vision': 8, 'eyestrain': 6, 'headaches': 5,
            'distorted vision': 7, 'night vision problems': 6
        },
        prevalence: 0.15,
        age_group: ['child', 'adult', 'elderly']
    },
    'Myopia': {
        symptoms: {
            'blurred distance vision': 9, 'squinting': 7, 'eye strain': 6,
            'headaches': 5, 'difficulty driving': 6
        },
        prevalence: 0.18,
        age_group: ['child', 'teen', 'adult']
    },
    'Hyperopia': {
        symptoms: {
            'blurred near vision': 8, 'eye fatigue': 6, 'headaches': 5,
            'difficulty reading': 7, 'eye rubbing': 4
        },
        prevalence: 0.12,
        age_group: ['child', 'adult', 'elderly']
    },
    'Presbyopia': {
        symptoms: {
            'difficulty reading small print': 9, 'arm strain': 5,
            'eyestrain': 6, 'need brighter light': 7
        },
        prevalence: 0.20,
        age_group: ['adult', 'elderly']
    },

    // Dry Eye Conditions (3)
    'Dry Eye Syndrome': {
        symptoms: {
            'burning': 7, 'sandy feeling': 6, 'redness': 5,
            'blurred vision': 4, 'light sensitivity': 5
        },
        prevalence: 0.12,
        severity: 2,
        age_group: ['adult', 'elderly']
    },
    'Evaporative Dry Eye': {
        symptoms: {
            'rapid tear evaporation': 6, 'meibomian gland dysfunction': 7,
            'eyelid inflammation': 5, 'foamy tears': 4
        },
        prevalence: 0.08,
        severity: 3,
        age_group: ['adult', 'elderly']
    },
    'Aqueous Deficiency Dry Eye': {
        symptoms: {
            'reduced tear production': 7, 'extreme dryness': 8,
            'autoimmune markers': 6, 'gritty feeling': 5
        },
        prevalence: 0.04,
        severity: 3,
        age_group: ['adult']
    },

    // Infections/Inflammation (8)
    'Acute Conjunctivitis': {
        symptoms: {
            'redness': 7, 'itching': 6, 'discharge': 5,
            'light sensitivity': 8
        },
        prevalence: 0.08,
        severity: 3,
        age_group: ['all']
    },
    'Chronic Conjunctivitis': {
        symptoms: {
            'redness': 5, 'itching': 4, 'gritty feeling': 5,
            'mild discharge': 3
        },
        prevalence: 0.05,
        severity: 2,
        age_group: ['adult', 'elderly']
    },
    'Bacterial Conjunctivitis': {
        symptoms: {
            'redness': 7, 'yellow discharge': 8, 'crusting': 6,
            'gritty feeling': 5, 'eyelid swelling': 6
        },
        prevalence: 0.08,
        age_group: ['all']
    },
    'Viral Conjunctivitis': {
        symptoms: {
            'watery discharge': 7, 'pink appearance': 6,
            'light sensitivity': 5, 'recent cold symptoms': 4
        },
        prevalence: 0.07,
        age_group: ['all']
    },
    'Allergic Conjunctivitis': {
        symptoms: {
            'intense itching': 8, 'stringy discharge': 5,
            'puffy eyelids': 6, 'seasonal occurrence': 7
        },
        prevalence: 0.06,
        age_group: ['all']
    },
    'Blepharitis': {
        symptoms: {
            'eyelid redness': 7, 'flaky skin': 6, 'crusty lashes': 5,
            'burning': 6, 'foamy tears': 4
        },
        prevalence: 0.05,
        age_group: ['adult', 'elderly']
    },
    'Keratitis': {
        symptoms: {
            'eye pain': 8, 'redness': 7, 'blurred vision': 6,
            'light sensitivity': 7, 'excessive tearing': 5
        },
        prevalence: 0.03,
        age_group: ['all']
    },
    'Uveitis': {
        symptoms: {
            'eye pain': 8, 'redness': 7, 'blurred vision': 6,
            'light sensitivity': 7, 'floaters': 5
        },
        prevalence: 0.02,
        age_group: ['adult']
    },

    // Glaucoma (2)
    'Open-Angle Glaucoma': {
        symptoms: {
            'gradual vision loss': 7, 'tunnel vision': 8,
            'no early symptoms': 3
        },
        prevalence: 0.04,
        age_group: ['adult', 'elderly']
    },
    'Angle-Closure Glaucoma': {
        symptoms: {
            'severe eye pain': 9, 'nausea': 6, 'vomiting': 5,
            'sudden vision loss': 8, 'halos around lights': 7
        },
        prevalence: 0.01,
        age_group: ['adult', 'elderly']
    },

    // Retinal (5)
    'Diabetic Retinopathy': {
        symptoms: {
            'blurred vision': 7, 'floaters': 6, 'dark spots': 7,
            'vision loss': 8
        },
        prevalence: 0.05,
        age_group: ['adult', 'elderly']
    },
    'Macular Degeneration': {
        symptoms: {
            'distorted vision': 8, 'dark spots': 7,
            'difficulty reading': 6, 'need brighter light': 5
        },
        prevalence: 0.04,
        age_group: ['elderly']
    },
    'Retinal Detachment': {
        symptoms: {
            'sudden floaters': 8, 'flashes of light': 7,
            'shadow in vision': 9, 'curtain-like vision loss': 8
        },
        prevalence: 0.01,
        age_group: ['adult', 'elderly']
    },
    'Retinal Vein Occlusion': {
        symptoms: {
            'sudden blurring': 8, 'distorted vision': 7,
            'painless vision loss': 6
        },
        prevalence: 0.02,
        age_group: ['adult', 'elderly']
    },
    'Retinitis Pigmentosa': {
        symptoms: {
            'night blindness': 8, 'tunnel vision': 7,
            'photophobia': 6, 'slow vision loss': 5
        },
        prevalence: 0.005,
        age_group: ['child', 'teen', 'adult']
    },

    // Neuro-ophthalmic (3)
    'Optic Neuritis': {
        symptoms: {
            'pain with eye movement': 8, 'vision loss': 7,
            'color desaturation': 6, 'pupillary defects': 5
        },
        prevalence: 0.01,
        age_group: ['adult']
    },
    'Ocular Migraine': {
        symptoms: {
            'flashing lights': 8, 'zigzag patterns': 7,
            'temporary vision loss': 6, 'headache': 5
        },
        prevalence: 0.03,
        age_group: ['teen', 'adult']
    },
    'Horner Syndrome': {
        symptoms: {
            'ptosis': 7, 'miosis': 6, 'anhidrosis': 5,
            'unequal pupil size': 6
        },
        prevalence: 0.002,
        age_group: ['all']
    },

    // Pediatric (3)
    'Amblyopia': {
        symptoms: {
            'poor vision in one eye': 8, 'squinting': 6,
            'head tilting': 5, 'depth perception problems': 4
        },
        prevalence: 0.03,
        age_group: ['child']
    },
    'Strabismus': {
        symptoms: {
            'misaligned eyes': 8, 'double vision': 7,
            'squinting': 6, 'head tilting': 5
        },
        prevalence: 0.04,
        age_group: ['child']
    },
    'Congenital Cataract': {
        symptoms: {
            'leukocoria': 8, 'nystagmus': 6, 'strabismus': 5,
            'poor visual tracking': 4
        },
        prevalence: 0.001,
        age_group: ['child']
    },

    // Trauma/Injury (3)
    'Corneal Abrasion': {
        symptoms: {
            'sudden pain': 8, 'foreign body sensation': 7,
            'tearing': 6, 'light sensitivity': 5
        },
        prevalence: 0.05,
        age_group: ['all']
    },
    'Chemical Burn': {
        symptoms: {
            'severe pain': 9, 'redness': 7, 'swelling': 6,
            'blurred vision': 5, 'history of exposure': 8
        },
        prevalence: 0.01,
        age_group: ['all']
    },
    'Hyphema': {
        symptoms: {
            'eye pain': 8, 'blood in eye': 9, 'blurred vision': 6,
            'light sensitivity': 5
        },
        prevalence: 0.005,
        age_group: ['all']
    },

    // Systemic (6)
    'Thyroid Eye Disease': {
        symptoms: {
            'bulging eyes': 8, 'dry eyes': 6, 'double vision': 7,
            'eyelid retraction': 5, 'redness': 4
        },
        prevalence: 0.02,
        age_group: ['adult']
    },
    'Sjogren Syndrome': {
        symptoms: {
            'extreme dryness': 8, 'burning': 7, 'gritty feeling': 6,
            'light sensitivity': 5, 'systemic dryness': 7
        },
        prevalence: 0.01,
        age_group: ['adult']
    },
    'Sarcoidosis': {
        symptoms: {
            'redness': 6, 'pain': 5, 'blurred vision': 4,
            'floaters': 3, 'systemic symptoms': 7
        },
        prevalence: 0.003,
        age_group: ['adult']
    },
    'Heterochromia': {
        symptoms: {
            'different colored irises': 5, 'no symptoms': 1
        },
        prevalence: 0.005,
        age_group: ['all']
    },
    'Anisocoria': {
        symptoms: {
            'unequal pupil size': 6, 'light sensitivity': 4,
            'no pain': 3
        },
        prevalence: 0.008,
        age_group: ['all']
    },
    'Coloboma': {
        symptoms: {
            'keyhole-shaped pupil': 7, 'vision impairment': 6,
            'light sensitivity': 5
        },
        prevalence: 0.001,
        age_group: ['all']
    },

    // Degenerative (3)
    'Keratoconus': {
        symptoms: {
            'blurred vision': 7, 'ghost images': 6, 'light streaks': 5,
            'frequent prescription changes': 4
        },
        prevalence: 0.02,
        age_group: ['teen', 'adult']
    },
    'Fuchs Dystrophy': {
        symptoms: {
            'cloudy morning vision': 7, 'glare sensitivity': 6,
            'eye pain': 5, 'corneal swelling': 4
        },
        prevalence: 0.01,
        age_group: ['adult', 'elderly']
    },
    'Pterygium': {
        symptoms: {
            'fleshy growth': 7, 'redness': 5, 'irritation': 4,
            'foreign body sensation': 5
        },
        prevalence: 0.03,
        age_group: ['adult']
    }
};

// Symptom recognition with synonyms and natural language patterns
const symptomPatterns = {
    'blurred vision': [
        /blur(r)?y|blur(r)?ed|fuzzy|out of focus|not clear|can't see clearly/i,
        /things look (a little |slightly |very )?(blurry|fuzzy|unclear)/i,
        /vision is (not sharp|unclear|blurry)/i
    ],
    'eye pain': [
        /eye(s)? (hurt|pain|ache|throb|sting|burn)|pain in my eye(s)?/i,
        /(sharp|dull|throbbing) pain (in|around) (my )?eye(s)?/i,
        /my eyes (are|feel) sore/i
    ],
    'redness': [
        /red eye(s)?|eyes are red|bloodshot/i,
        /(my )?eye(s)? (look|appear) red|pink eye/i,
        /eye(s)? (are|look) bloodshot/i
    ],
    'light sensitivity': [
        /light (bother|hurt|pain|sensitive)|sensitive to light/i,
        /(sunlight|bright light) (hurt|bother|pain)/i,
        /need (to wear|wearing) sunglasses indoors/i,
        /lights seem too bright/i
    ],
    'headaches': [
        /headache|head (hurt|ache|pain)|pain in my head/i,
        /(throbbing|pounding|sharp) (head|headache)/i,
        /my head hurts/i
    ],
    'eyestrain': [
        /eye(s)? (tired|fatigue|strain|feel heavy)/i,
        /(my )?eyes feel (tired|strained|fatigued)/i,
        /after (reading|screen time) my eyes (ache|hurt|feel tired)/i,
        /eye(s)? feel (heavy|strained)/i
    ],
    'dry eyes': [
        /eyes feel dry/i,
        /(my )?eye(s)? (are|feel) (dry|gritty|sandpaper)/i,
        /not enough tears/i
    ],
    'itching': [
        /eye(s)? (itch|itchy)/i,
        /(my )?eyes are (itchy|scratchy)/i,
        /feel like rubbing my eyes/i
    ],
    'discharge': [
        /eye(s)? (watery|discharge|goop|crust)/i,
        /(my )?eyes have (discharge|gunk|matter)/i,
        /wake up with (sticky|crusty) eyes/i
    ],
    'floaters': [
        /see floaters/i,
        /(my )?vision has (spots|specks|cobwebs)/i,
        /see things floating in my vision/i
    ],
    'double vision': [
        /double vision/i,
        /see two of everything/i,
        /images overlap/i
    ],
    'tearing': [
        /eyes (water|tear)/i,
        /(my )?eyes are (watery|tearing)/i,
        /excessive tears/i
    ],
    'foreign body sensation': [
        /something in my eye/i,
        /feel like (something|sand) is in my eye/i,
        /eye feels scratchy/i
    ],
    'night vision problems': [
        /trouble seeing at night/i,
        /night vision is bad/i,
        /can't see well in the dark/i
    ],
    'flashes of light': [
        /see flashes of light/i,
        /(my )?vision has (flashes|streaks)/i,
        /like lightning in my vision/i
    ],
    'distorted vision': [
        /vision is distorted/i,
        /things look (wavy|curved)/i,
        /straight lines look bent/i
    ],
    'difficulty reading': [
        /trouble reading/i,
        /can't focus on (text|small print)/i,
        /words look blurry when reading/i
    ],
    'squinting': [
        /squint to see/i,
        /(my )?eyes (are|feel) squinty/i,
        /need to squint to focus/i
    ]
};

// Helper Functions
const getAgeGroup = (age) => {
    if (!age) return null;
    if (age <= 12) return 'child';
    if (age <= 19) return 'teen';
    if (age <= 64) return 'adult';
    return 'elderly';
};

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


const calculateMatchPercentages = (symptoms, ageGroup) => {
    const diseaseScores = {};
    
    Object.entries(diseaseProfiles).forEach(([name, disease]) => {
        if (ageGroup && disease.age_group && !disease.age_group.includes(ageGroup)) {
            return;
        }
        
        let score = 0;
        symptoms.forEach(({symptom, weight}) => {
            if (disease.symptoms[symptom]) {
                score += disease.symptoms[symptom] * weight;
            }
        });
        
        score *= (1 + disease.prevalence * 2);
        diseaseScores[name] = score;
    });
    
    const totalScore = Object.values(diseaseScores).reduce((a, b) => a + b, 0);
    const matches = [];
    
    for (const [name, score] of Object.entries(diseaseScores)) {
        if (score > 0) {
            matches.push({
                name,
                percentage: Math.round((score / totalScore) * 100)
            });
        }
    }
    
    return matches.sort((a, b) => b.percentage - a.percentage);
};

const getFollowUpQuestion = (primaryCondition) => {
    const questions = {
        'Astigmatism': {
            question: "Do you notice more distortion at night or during daytime?",
            positiveKeywords: ["night", "dark", "evening", "darkness"],
            negativeKeywords: ["day", "daytime", "light", "bright"]
        },
        'Myopia': {
            question: "How far can you see clearly before things get blurry?",
            positiveKeywords: ["feet", "meters", "distance", "far", "yards"],
            negativeKeywords: ["near", "close", "reading", "book"]
        },
        'Hyperopia': {
            question: "Do you experience more difficulty with near or intermediate vision?",
            positiveKeywords: ["near", "reading", "close", "phone", "book"],
            negativeKeywords: ["far", "distance", "driving"]
        },
        'Presbyopia': {
            question: "Do you find yourself holding reading material farther away?",
            positiveKeywords: ["yes", "farther", "arm", "length", "extend"],
            negativeKeywords: ["no", "same", "close", "normal"]
        },
        'Dry Eye Syndrome': {
            question: "Do your symptoms worsen in dry or windy conditions?",
            positiveKeywords: ["dry", "wind", "air", "fan", "heat", "ac"],
            negativeKeywords: ["humid", "moist", "cool", "no"]
        },
        'Evaporative Dry Eye': {
            question: "Do your eyelids feel sticky when you wake up?",
            positiveKeywords: ["sticky", "gritty", "crusty", "morning", "wake"],
            negativeKeywords: ["no", "clean", "clear", "normal"]
        },
        'Aqueous Deficiency Dry Eye': {
            question: "Do you experience extreme dryness throughout the day?",
            positiveKeywords: ["constant", "all day", "extreme", "severe", "always"],
            negativeKeywords: ["sometimes", "occasional", "mild", "no"]
        },
        'Bacterial Conjunctivitis': {
            question: "Is there yellow/green discharge when you wake up?",
            positiveKeywords: ["yellow", "green", "discharge", "crust", "morning"],
            negativeKeywords: ["clear", "watery", "no", "none"]
        },
        'Viral Conjunctivitis': {
            question: "Have you had cold or flu symptoms recently?",
            positiveKeywords: ["cold", "flu", "sick", "recently", "fever"],
            negativeKeywords: ["no", "healthy", "fine"]
        },
        'Allergic Conjunctivitis': {
            question: "Do your symptoms worsen during allergy season?",
            positiveKeywords: ["season", "pollen", "allergy", "spring", "fall"],
            negativeKeywords: ["no", "constant", "year", "round"]
        },
        'Blepharitis': {
            question: "Do your eyelids feel crusty in the morning?",
            positiveKeywords: ["crust", "flakes", "scales", "morning", "wake"],
            negativeKeywords: ["no", "clean", "clear"]
        },
        'Keratitis': {
            question: "Do you wear contact lenses?",
            positiveKeywords: ["contacts", "lenses", "yes"],
            negativeKeywords: ["no", "glasses", "none"]
        },
        'Uveitis': {
            question: "Do you have any autoimmune conditions?",
            positiveKeywords: ["arthritis", "lupus", "crohn", "autoimmune", "yes"],
            negativeKeywords: ["no", "none", "healthy"]
        },
        'Open-Angle Glaucoma': {
            question: "Has anyone in your family had glaucoma?",
            positiveKeywords: ["mother", "father", "parent", "grandparent", "yes"],
            negativeKeywords: ["no", "none", "don't know"]
        },
        'Angle-Closure Glaucoma': {
            question: "Are you also experiencing nausea or vomiting?",
            positiveKeywords: ["nausea", "vomit", "sick", "throw up", "yes"],
            negativeKeywords: ["no", "fine", "just pain"]
        },
        'Diabetic Retinopathy': {
            question: "Do you have diabetes?",
            positiveKeywords: ["diabetes", "type 1", "type 2", "sugar", "yes"],
            negativeKeywords: ["no", "normal", "healthy"]
        },
        'Macular Degeneration': {
            question: "Do straight lines appear wavy to you?",
            positiveKeywords: ["wavy", "bent", "distorted", "lines", "yes"],
            negativeKeywords: ["no", "straight", "normal"]
        },
        'Retinal Detachment': {
            question: "Have you noticed new floaters or flashes of light?",
            positiveKeywords: ["floaters", "flashes", "sparks", "new", "yes"],
            negativeKeywords: ["no", "none", "same"]
        },
        'Retinal Vein Occlusion': {
            question: "Do you have high blood pressure?",
            positiveKeywords: ["hypertension", "high bp", "pressure", "yes"],
            negativeKeywords: ["no", "normal", "healthy"]
        },
        'Optic Neuritis': {
            question: "Do you have pain when moving your eyes?",
            positiveKeywords: ["pain", "move", "looking", "side", "yes"],
            negativeKeywords: ["no", "still", "stationary"]
        },
        'Ocular Migraine': {
            question: "Do you get migraines with visual disturbances?",
            positiveKeywords: ["migraine", "aura", "zigzag", "lights", "yes"],
            negativeKeywords: ["no", "headache", "none"]
        },
        'Corneal Abrasion': {
            question: "Did something get in your eye recently?",
            positiveKeywords: ["dust", "object", "scratch", "poke", "yes"],
            negativeKeywords: ["no", "nothing", "spontaneous"]
        },
        'Chemical Burn': {
            question: "Were you exposed to any chemicals?",
            positiveKeywords: ["chemical", "cleaner", "spray", "acid", "yes"],
            negativeKeywords: ["no", "none", "accident"]
        },
        'Thyroid Eye Disease': {
            question: "Do you have thyroid problems?",
            positiveKeywords: ["thyroid", "graves", "hyper", "hypo", "yes"],
            negativeKeywords: ["no", "normal", "healthy"]
        },
        'Acute Conjunctivitis': {
            question: "Did your symptoms start suddenly and affect both eyes?",
            positiveKeywords: ["sudden", "both", "quick", "rapid", "yes"],
            negativeKeywords: ["gradual", "one", "slow"]
        },
        'Chronic Conjunctivitis': {
            question: "Have your symptoms lasted more than 4 weeks?",
            positiveKeywords: ["months", "weeks", "long", "chronic", "yes"],
            negativeKeywords: ["days", "recent", "new"]
        },
        'Retinitis Pigmentosa': {
            question: "Have you had difficulty seeing in dim light since childhood?",
            positiveKeywords: ["childhood", "young", "always", "dim", "yes"],
            negativeKeywords: ["recent", "adult", "no"]
        },
        'Amblyopia': {
            question: "Did you have eye problems as a child that weren't treated?",
            positiveKeywords: ["child", "young", "untreated", "patch", "yes"],
            negativeKeywords: ["no", "treated", "normal"]
        },
        'Strabismus': {
            question: "Do people notice your eyes sometimes look in different directions?",
            positiveKeywords: ["cross", "turn", "direction", "notice", "yes"],
            negativeKeywords: ["no", "straight", "normal"]
        },
        'Congenital Cataract': {
            question: "Were you born with or develop cataracts as a baby?",
            positiveKeywords: ["born", "baby", "child", "congenital", "yes"],
            negativeKeywords: ["no", "adult", "recent"]
        },
        'Hyphema': {
            question: "Did you recently experience trauma to your eye?",
            positiveKeywords: ["hit", "trauma", "injury", "recent", "yes"],
            negativeKeywords: ["no", "spontaneous", "unknown"]
        },
        'Sjogren Syndrome': {
            question: "Do you also have extreme dryness in your mouth?",
            positiveKeywords: ["mouth", "dry", "saliva", "thirst", "yes"],
            negativeKeywords: ["no", "moist", "normal"]
        },
        'Sarcoidosis': {
            question: "Have you been diagnosed with any systemic inflammatory conditions?",
            positiveKeywords: ["sarcoid", "inflammatory", "lungs", "diagnosed", "yes"],
            negativeKeywords: ["no", "healthy", "normal"]
        },
        'Keratoconus': {
            question: "Have you needed frequent changes in your glasses prescription?",
            positiveKeywords: ["changes", "frequent", "worse", "prescription", "yes"],
            negativeKeywords: ["stable", "same", "no"]
        },
        'Fuchs Dystrophy': {
            question: "Is your vision worse in the morning and improves as the day goes on?",
            positiveKeywords: ["morning", "foggy", "clear", "improve", "yes"],
            negativeKeywords: ["constant", "same", "no"]
        },
        'Pterygium': {
            question: "Do you spend a lot of time outdoors in sunny conditions?",
            positiveKeywords: ["sun", "outdoors", "uv", "exposure", "yes"],
            negativeKeywords: ["indoors", "protected", "no"]
        }
    };
    
    return questions[primaryCondition] || { 
        question: "Have you noticed any other symptoms?",
        positiveKeywords: [],
        negativeKeywords: []
    };
};

// Enhanced conversation context
const createContext = () => ({
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

// Enhanced context-aware response generation
const generateResponse = (matches, context, userInput) => {
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

// Helper for realistic typing simulation
const simulateTyping = async (duration) => {
    return new Promise(resolve => setTimeout(resolve, duration));
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
            message: "I'm having some technical difficulties. Could you try again?",
            context: currentContext || createContext()
        };
    }
};

// Helper function to get all diseases formatted with categories
const getAllDiseasesFormatted = () => {
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
const getAllSymptomsFormatted = () => {
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
  