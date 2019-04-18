export function loadUserData() {
    try {
        const serializedUserData = localStorage.getItem('user');
        if (!serializedUserData) return undefined;

        return JSON.parse(serializedUserData);
    } catch (err) {
        return undefined;
    }
}

export function storeUserData(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
}

export function getToken() {
    return localStorage.getItem("token");
}

export function setToken(token) {
    localStorage.setItem("token", token);
}