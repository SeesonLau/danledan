import { diseaseProfiles } from './diseaseProfiles';

export const calculateMatchPercentages = (symptoms, ageGroup) => {
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

export const getFollowUpQuestion = (primaryCondition) => {
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
