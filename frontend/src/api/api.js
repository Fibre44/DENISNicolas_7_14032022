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
 * @param {string} token fournir le token
 * @returns 
 */

export async function getData(endpoint, token) {
    const response = await fetch(urlServer + endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    if (response.ok) {

        return response.json()
    }
}

/**
 * 
 * @param {string} endpoint Indiquer le chemin à joindre
 * @param {string} token fournir le token
 * @returns 
 */

export async function deleteData(endpoint, token) {
    const response = await fetch(urlServer + endpoint, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    if (response.ok) {

        return response.json()
    }
}
/**
 * 
 * @param {string} endpoint 
 * @param {string} token 
 * @param {string} method POST/PUT 
 */
export async function setData(endpoint, token, method, data) {
    const response = await fetch(urlServer + endpoint, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)

    });

    if (response.ok) {

        return response.json()
    }

}