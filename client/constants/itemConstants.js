export const ITEM_CONSTANTS = {
  STATUS: {
    pending: "Pending",
    available: "Approved",
    rejected: "Rejected",
  },
  CONDITION: {
    New: "New",
    Used: "Used",
  },
  SIZE: {
    xs: "XS",
    s: "S",
    m: "M",
    l: "L",
    xl: "XL",
    xxl: "XXL",
    xxxl: "XXXL",
  },
  CATEGORY: {
    shirt: "Shirt",
    t_shirt: "T-Shirt",
    dress: "Dress",
    jeans: "Jeans",
    skirt: "Skirt",
    jacket: "Jacket",
    hoodie: "Hoodie",
    sweater: "Sweater",
    shorts: "Shorts",
    blazer: "Blazer",
    suit: "Suit",
    kurta: "Kurta",
    saree: "Saree",
    leggings: "Leggings",
    others: "Others",
  },
  TYPE: {
    casual: "Casual",
    formal: "Formal",
    party: "Party",
    traditional: "Traditional",
    sportswear: "Sportswear",
    business: "Business",
    loungewear: "Loungewear",
  },
  TAGS: {
    summer: "summer",
    winter: "winter",
    cotton: "cotton",
    denim: "denim",
    wool: "wool",
    formal: "formal",
    casual: "casual",
    vintage: "vintage",
    branded: "branded",
    handmade: "handmade",
    eco_friendly: "eco-friendly",
  },
};

// Convert objects to arrays for dropdowns
export const getCategoryOptions = () => {
  return Object.entries(ITEM_CONSTANTS.CATEGORY).map(([key, value]) => ({
    value: value,
    label: value,
  }));
};

export const getTypeOptions = () => {
  return Object.entries(ITEM_CONSTANTS.TYPE).map(([key, value]) => ({
    value: value,
    label: value,
  }));
};

export const getSizeOptions = () => {
  return Object.entries(ITEM_CONSTANTS.SIZE).map(([key, value]) => ({
    value: value,
    label: value,
  }));
};

export const getConditionOptions = () => {
  return Object.entries(ITEM_CONSTANTS.CONDITION).map(([key, value]) => ({
    value: value,
    label: value,
  }));
};

export const getTagOptions = () => {
  return Object.entries(ITEM_CONSTANTS.TAGS).map(([key, value]) => ({
    value: value,
    label: value,
  }));
};
