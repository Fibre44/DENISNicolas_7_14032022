import React, { useState } from 'react';
//import { FormChangePassword } from './FormChangePassword';
import { Alert } from '../ui/Alert';
import { Confirmation } from '../ui/Confirmation';
import './../../style/profil.sass'
import { setData, uploadImg } from './../../api/api';

export function Profil({ credentials }) {

    const [error, setError] = useState(null)
    const [errorApi, setErrorAPI] = useState(null)
    const [succes, setSucces] = useState(null)
    const [picture, setPicture] = useState(null)

    const handleSubmit = async function (e) {
        e.preventDefault()
        setError(null)
        setErrorAPI(null)
        setSucces(null)
        if (e.target.newPassword.value == e.target.newPasswordConfirm.value) {
            const data = {
                password: e.target.password.value,
                newPassword: e.target.newPassword.value
            }
            try {
                const response = await setData('/users/password', 'PUT', data)
                const status = await response.status
                if (status == "200") {
                    setSucces("Le mot de passe a été changé avec succès")
                } else {
                    setError("Mot de passe incorrect")
                }
            }
            catch {
                setError("Erreur de connexion au serveur")
            }

        } else {
            setError("Mot de passe différent")
        }
    }
    async function deleteUser() {
        const deleteUser = await setData('/users/' + credentials.userId + '/delete', 'DELETE')
        const deleteResponse = await deleteUser
    }

    const handleChange = async function (e) {

        setPicture(() => e.target.files[0])
        const data = new FormData()
        data.append('file', e.target.files[0])

        try {
            const response = await uploadImg('/users/picture', 'PUT', data)

        } catch {
            console.error('Erreur de mise à jour de la photo')
        }
    }

    return <div className='profil'>
        <h1>Mon profil</h1>

        <form action="">
            <label htmlFor='picture'>Publier sa photo</label>
            <input type="file" id='picture' name='picture' onChange={handleChange} />
            <img src={picture} alt="" />
        </form>

        <form className='form--witch' onSubmit={handleSubmit} >
            <h2>Changer mon mot de passe</h2>
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
                {succes && <Confirmation>{succes}</Confirmation>}
                {error && <Alert>{error}</Alert>}
            </div>
        </form>

        <h2>Supprimer mon compte</h2>
        <button onClick={deleteUser}>Suppression du compte</button>
    </div>
}

