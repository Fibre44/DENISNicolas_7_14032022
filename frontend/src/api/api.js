const urlServer = 'http://localhost:3001'

export async function userPost(data, endpoint) {

    const response = await fetch(urlServer + endpoint, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json()
    if (response.ok) {
        return { data: responseData, status: response.status };
    } else {
        return response
    }
}

/**
 * 
 * @param {string} endpoint Indiquer le chemin à joindre
 * @param {string} token fournir le token
 * @returns 
 */

export async function userGet(endpoint, token) {
    const response = await fetch(urlServer + endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    if (response.ok) {
        return response
    }
}
