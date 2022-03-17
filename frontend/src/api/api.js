const urlServer = 'http://localhost:3001'

export async function register(data) {

    const response = await fetch(urlServer + '/users/signup', {
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