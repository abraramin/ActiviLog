// Check Organization
export function check_organization(organization) {
    fetch('/api/check_organization/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'organization': organization,
        },
    }).then(function(result) {
        return result;
    });
}

// Account Login
export function login(username, password) {
    fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }).then(function(result) {
        console.log(result.user);
    });
}