module.exports = {
    FILES_FOLDER: {
        public: 'public',
        default: 'default',
        userImages: 'userImages',
        clothImages: 'clothImages',
    },

    ROLES: {
        admin: 'Admin',
        user: 'User',
    },

    TOKEN_TYPES: {
        access: 'Access',
        refresh: 'Refresh',
        verifyOtp: 'VerifyOtp',
    },

    SOCIAL_TYPES: {
        google: 'Google',
        apple: 'Apple',
    },

    FILE_QUALITY: {
        large: { type: 'high', quality: 80 },
        small: { type: 'low', quality: 1 },
    },

    FILE_SIZE: {
        large: { type: 'large', size: [888, 595] },
        small: { type: 'small', size: [84, 48] },
    },

    ITEM: {
        STATUS: {
            pending: 'Pending',
            approved: 'Approved',
            rejected: 'Rejected',
        },
        CONDITION: {
            New: 'New',
            Used: 'Used',
        },
        SIZE: {
            xs: 'XS',
            s: 'S',
            m: 'M',
            l: 'L',
            xl: 'XL',
            xxl: 'XXL',
            xxxl: 'XXXL',
        },
        CATEGORY: {
            shirt: 'Shirt',
            t_shirt: 'T-Shirt',
            dress: 'Dress',
            jeans: 'Jeans',
            skirt: 'Skirt',
            jacket: 'Jacket',
            hoodie: 'Hoodie',
            sweater: 'Sweater',
            shorts: 'Shorts',
            blazer: 'Blazer',
            suit: 'Suit',
            kurta: 'Kurta',
            saree: 'Saree',
            leggings: 'Leggings',
            others: 'Others',
        },
        TYPE: {
            casual: 'Casual',
            formal: 'Formal',
            party: 'Party',
            traditional: 'Traditional',
            sportswear: 'Sportswear',
            business: 'Business',
            loungewear: 'Loungewear',
        },
        TAGS: {
            summer: 'summer',
            winter: 'winter',
            cotton: 'cotton',
            denim: 'denim',
            wool: 'wool',
            formal: 'formal',
            casual: 'casual',
            vintage: 'vintage',
            branded: 'branded',
            handmade: 'handmade',
            eco_friendly: 'eco-friendly',
        },
    },
};
