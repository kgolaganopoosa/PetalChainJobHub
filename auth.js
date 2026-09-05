// Admin Configuration
const ADMIN_PASSWORD = "#SGH2026_";

// Standard Bank Payment Details for Inactive Users
const BANK_DETAILS = {
    bankName: "Standard Bank",
    branchName: "CENTRAL CITY",
    branchCode: "2947",
    accountHolder: "MR KGOLAGANO KP POO",
    accountNumber: "10 26 620 042 5",
    accountType: "CURRENT",
    swiftCode: "SBZAZAJJ"
};

// Initial Registered Users (Stored in LocalStorage on First Load)
const DEFAULT_USERS = [
    { passwordKey: "#PetalChain_26", status: "Subscribed" },
    { passwordKey: "#UserKey_01", status: "Subscribed" },
    { passwordKey: "#UserKey_26", status: "Subscribed" },
    { passwordKey: "#UserKey_02", status: "Active" }
];

// Load Users from LocalStorage or Initialize
function getUsers() {
    const stored = localStorage.getItem('arcknowledge_users');
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem('arcknowledge_users', JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
}

// Save Users Array
function saveUsers(usersArray) {
    localStorage.setItem('arcknowledge_users', JSON.stringify(usersArray));
}

// Handle User Authentication & Status Checks
function authenticateUser(inputKey) {
    const users = getUsers();
    const matchedUser = users.find(u => u.passwordKey === inputKey.trim());

    if (!matchedUser) {
        return { success: false, reason: "INVALID_KEY" };
    }

    if (matchedUser.status === "Pending") {
        return { success: false, reason: "PENDING", key: matchedUser.passwordKey };
    }

    if (matchedUser.status === "Inactive") {
        return { success: false, reason: "INACTIVE", key: matchedUser.passwordKey, bankDetails: BANK_DETAILS };
    }

    // Fully Subscribed
    sessionStorage.setItem('active_user_key', matchedUser.passwordKey);
    return { success: true, user: matchedUser };
}
