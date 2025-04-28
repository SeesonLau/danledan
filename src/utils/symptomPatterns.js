// Symptom recognition with synonyms and natural language patterns
export const symptomPatterns = {
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
