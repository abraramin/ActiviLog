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

// Account Registration
export function register(fullName, email, password, organizationName) {
    return fetch('/api/register/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'fullName': fullName,
            'email': email,
            'password': password,
            'organization': organizationName
        })
    });
}



// Account Creation
export function create_account(fullName, email, password) {
    return fetch('/api/create_account/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            'fullName': fullName,
            'email': email,
            'password': password,
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

//Fetch Logged In User's Post Data 
export function fetchPosts(user) {
    return fetch('/api/fetch_posts/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
			'Authorization': token,
			'userID': user,
        },
    });
}

// Add Activity
export function add_activity(title, description, color) {
    return fetch('/api/add_activity/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            'title': title,
            'description': description,
            'color': color
        })
    });
}

// Edit Activity
export function edit_activity(id, title, description, color) {
    return fetch('/api/edit_activity/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            'id': id,
            'title': title,
            'description': description,
            'color': color
        })
    });
}

// Fetch list of activities
export function fetch_activities(page, pageItems) {
    return fetch('/api/fetch_activities/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
            'page': page,
            'pageItems': pageItems
        },
    });
}



// Fetch single activity
export function fetch_activity(id) {
    return fetch('/api/fetch_activity/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
            'activityId': id,
        },
    });
}


// Delete Activity
export function delete_activity(id) {
    return fetch('/api/delete_activity/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            'id': id
        })
    });
}

// Fetch list of user
export function fetch_users(page, pageItems) {
    return fetch('/api/fetch_users/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
            'page': page,
            'pageItems': pageItems
        },
    });
}


