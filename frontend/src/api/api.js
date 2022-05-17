const urlServer = '/api/v1'

export async function userPost(data, endpoint) {
    const response = await fetch(urlServer + endpoint, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    });
    if (response.ok) {
        const responseData = await response.json()
        return { data: responseData, status: response.status };
    } else {
        return { message: "Identifiant ou mot de passe invalide" }
    }
}

/**
 * 
 * @param {string} endpoint Indiquer le chemin à joindre
 * @returns 
 */
export async function getData(endpoint) {
    const response = await fetch(urlServer + endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'credentials': 'include'
        },
    });
    if (response.ok) {
        return response
    }
    else {
        return { error: true }
    }
}

/**
 * 
 * @param {string} endpoint 
 * @param {string} method POST/PUT/DELETE
 * @param {JSON} data
 */
export async function setData(endpoint, method, data) {
    const response = await fetch(urlServer + endpoint, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'credentials': 'include',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    });
    if (response.ok) {
        return response
    }
    else {
        return { error: true }
    }

}

export async function uploadImg(endpoint, method, data) {
    const response = await fetch(urlServer + endpoint, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'credentials': 'include',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return response
    }
    else {
        return { error: true }
    }
}