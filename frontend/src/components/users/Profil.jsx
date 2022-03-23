import react from 'react';
import { deleteData } from './../../api/api'

export function Profil({ credentials }) {

    async function deleteUser() {
        const deleteUser = await deleteData('/users/' + credentials.userId + '/delete', credentials.token)
        const deleteResponse = await deleteUser
        console.log(deleteResponse)
    }

    return <>
        <h1>Mon profil</h1>
        <button onClick={deleteUser}>Suppression du compte</button>
    </>
}