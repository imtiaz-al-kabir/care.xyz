export const locationData = {
    divisions: [
        { name: "Dhaka", id: "dhaka" },
        { name: "Chittagong", id: "chittagong" },
        { name: "Sylhet", id: "sylhet" },
        { name: "Khulna", id: "khulna" },
        { name: "Rajshahi", id: "rajshahi" },
    ],
    districts: {
        dhaka: ["Dhaka", "Narayanganj", "Gazipur", "Tangail"],
        chittagong: ["Chittagong", "Cox's Bazar", "Comilla"],
        sylhet: ["Sylhet", "Sunamganj", "Habiganj"],
        khulna: ["Khulna", "Jessore", "Kushtia"],
        rajshahi: ["Rajshahi", "Bogra", "Pabna"],
    },
    cities: {
        "Dhaka": ["North", "South"],
        "Chittagong": ["Sadar"],
        // Simplified for demo
    },
    areas: {
        "North": ["Gulshan", "Banani", "Uttara"],
        "South": ["Dhanmondi", "Motijheel"],
        // Simplified
    },
};
