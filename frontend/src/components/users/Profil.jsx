import React, { useState } from 'react';
//import { FormChangePassword } from './FormChangePassword';
import { Alert } from '../ui/Alert';
import { Confirmation } from '../ui/Confirmation';
import './../../style/profil.sass'
import './../../style/button.sass'

import { setData, postFormData } from './../../api/api';

export function Profil() {

    const [error, setError] = useState(null)
    const [errorApi, setErrorAPI] = useState(null)
    const [succes, setSucces] = useState(null)
    const [picture, setPicture] = useState(null)
    const [errorDelete, setErrorDelete] = useState(null)
    const [succesDelete, setSuccesDelete] = useState(null)

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
        try {
            const deleteUser = await setData('/users/delete', 'DELETE')
            const status = await deleteUser
            if (status == "200") {
                setSucces("Le mot de passe a été changé avec succès")
            } else {
                setErrorDelete("Erreur lors de la suppression")
            }
        } catch {
            setErrorDelete("Erreur de connexion au serveur")

        }
    }

    const handleChange = async function (e) {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)

        try {
            const postPicture = await postFormData('/users/picture', 'PUT', formData)
            const status = postPicture.status

        } catch {
            console.error("echec")
        }

    }

    return <div className='profil'>
        <h1>Mon profil</h1>

        <form action="" onSubmit={handleChange} className='profil__form' enctype="multipart/form-data" name='uploadPicture'>
            <label htmlFor='picture'>Publier sa photo</label>
            <input type="file" id='picture' name='picture' />
            <input type="submit" className='button' value='Upload' />
        </form>

        <form className='profil__form profil__form--password' onSubmit={handleSubmit} >
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

        <button onClick={deleteUser} className='button'>Suppression du compte</button>
        <div className='alert'>
            {succes && <Confirmation>{succes}</Confirmation>}
            {errorDelete && <Alert>{errorDelete}</Alert>}
        </div>
    </div>
}

