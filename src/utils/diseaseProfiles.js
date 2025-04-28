export const diseaseProfiles = {
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
