const urlServer = '/api/v1'

export async function userPost(data, endpoint) {
    const response = await fetch(urlServer + endpoint, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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

export async function getData(endpoint, token) {
    const response = await fetch(urlServer + endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'credentials': 'include'
            //'Authorization': 'Bearer ' + token
        },
    });
    if (response.ok) {

        return response
    }
}

/**
 * 
 * @param {string} endpoint Indiquer le chemin à joindre
 * @param {string} fournir les data du body
 * @returns 
 */

export async function deleteData(endpoint, data) {
    const response = await fetch(urlServer + endpoint, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'credentials': 'include'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {

        return response.json()
    }
}
/**
 * 
 * @param {string} endpoint 
 * @param {string} method POST/PUT 
 * @param {JSON} data
 */
export async function setData(endpoint, method, data) {
    const response = await fetch(urlServer + endpoint, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'credentials': 'include'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return response
    }

}