import react, { useState } from 'react';
import { deleteData } from './../../api/api'
//import { FormChangePassword } from './FormChangePassword';
import { Alert } from '../ui/Alert';
import { setData } from './../../api/api';

export function Profil({ credentials }) {

    const [error, setError] = useState(null)
    const [errorApi, setErrorAPI] = useState(null)


    const handleSubmit = async function (e) {
        e.preventDefault()

        setError(null)
        setErrorAPI(null)

        if (e.target.newPassword.value == e.target.newPasswordConfirm.value) {

            const data = {
                password: e.target.password.value,
                newPassword: e.target.newPassword.value
            }

            try {
                const response = await setData('/users/password', credentials.token, 'PUT', data)
                const status = await response.status

                if (status == "200") {

                } else {

                    setErrorAPI("Mot de passe incorrect")
                }
            }
            catch {

                setErrorAPI("Erreur de connexion au serveur")

            }

        } else {

            setError("Mot de passe différent")

        }

    }

    async function deleteUser() {
        const deleteUser = await deleteData('/users/' + credentials.userId + '/delete', credentials.token)
        const deleteResponse = await deleteUser
        console.log(deleteResponse)
    }

    return <>
        <h1>Mon profil</h1>
        <button onClick={deleteUser}>Suppression du compte</button>
        <form className='form--witch' onSubmit={handleSubmit} >
            <div className='form__field'>
                <label htmlFor='password'>Mot de passe actuel</label>
                <input id='password' name='password' type='password' placeholder='Saisir votre mot de passe'></input>
            </div>
            <div className='form__field'>
                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input id='newPassword' name='newPassword' type='password' placeholder='Saisir votre nouveau mot de passe'></input>
            </div>
            <div className='form__field'>
                <label htmlFor="newPasswordConfirm">Confirmer votre nouveau mot de passe</label>
                <input htmlFor='newPasswordConfirm' name='newPasswordConfirm' type='password' placeholder='Saisir de nouveau votre nouveau mot de passe'></input>
            </div>
            <button type="submit">Mettre à jour le mot de passe</button>
            <div className='alert'>

                {error && <Alert>{error}</Alert>}
            </div>


        </form>
    </>
}