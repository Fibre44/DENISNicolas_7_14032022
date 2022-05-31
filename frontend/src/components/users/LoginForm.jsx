import React, { useState, useRef } from 'react';
import { userPost, postFormData } from '../../api/api';
import './../../style/form.sass'
import './../../style/button.sass'
import { Alert } from './../ui/Alert';
import { Footer } from '../footer/Footer';
import logo from './../../img/icon-left-font.png'
export function LoginForm({ onConnect, onClick }) {
    const form = useRef(null)

    const [errorConnexion, setErrorConnexion] = useState(null)

    const handleSubmit = async function (e) {
        e.preventDefault()
        const formData = new FormData(form.current)

        try {
            const response = await postFormData('/users/login', 'POST', formData)
            const status = await response.status
            if (status == "200") {
                onConnect(true)
            }
            else {
                setErrorConnexion('Identifiant ou mot de passe invalide')
            }
        }
        catch {
            setErrorConnexion("Erreur de connexion au serveur")
            console.error("Erreur API")
        }
    }

    return <>
        <div className='conteneur'>
            <div className='conteneur__logo'>
                <img src={logo} alt="Groupomia" />
            </div>
            <form ref={form} action="" id="login" className='form' onSubmit={handleSubmit} encType='multipart/form-data'>
                <h2>Formulaire de connexion</h2>
                <div className='form__field'>
                    <label htmlFor="email" >Email</label>
                    <input type="email" name="email" id="email" required></input>
                </div>
                <div className='form__field'>
                    <label htmlFor="password" >Mot de passe</label>
                    <input type="password" name="password" id="password" required></input>
                </div>
                <input type="submit" className='button' value='Se connecter'></input>
                <a href="#register" onClick={() => onClick('register')}>Pas de compte inscrivez vous ici</a>
                <a href="passwordrecovery"> </a>
                <div className='alert'>
                    {errorConnexion && <Alert>{errorConnexion}</Alert>}
                </div>
            </form>
        </div>
        <Footer />

    </>
}
