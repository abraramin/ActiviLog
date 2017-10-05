// API
// Contains all the Endpoints the user account makes to the back-end server

let token = null;

// Set User Web Token
export function set_token(val) {
    if (typeof val === 'string') {
        token = val;
    } else {
        return null;
    }
}

// Check Organization
export function check_organization(organization) {
    return fetch('/api/check_organization/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'organization': organization,
        },
    });
}

// Account Login
export function login(email, password, organizationName) {
    return fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': email,
            'password': password,
            'organization': organizationName
        })
    });
}

// Fetch Logged In User Data
export function fetchUserData() {
    return fetch('/api/fetch_user/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    });
}