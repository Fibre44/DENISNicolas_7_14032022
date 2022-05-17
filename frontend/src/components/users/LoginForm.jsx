import React, { useState } from 'react';
import { userPost } from '../../api/api';
import './../../style/form.sass'
import './../../style/button.sass'
import { Alert } from './../ui/Alert';
import { Footer } from '../footer/Footer';

export function LoginForm({ onConnect, onClick }) {

    const [errorConnexion, setErrorConnexion] = useState(null)

    const handleSubmit = async function (e) {
        e.preventDefault()

        const form = e.target
        const data = Object.fromEntries(new FormData(form))

        try {
            const response = await userPost(data, '/users/login')
            const status = await response.status
            if (status == "200") {
                onConnect(response.data)
            }
            else {
                setErrorConnexion(response.message)
                console.log(errorConnexion)
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
                <img src="https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png" alt="Groupomia" />
            </div>
            <form action="" id="login" className='form' onSubmit={handleSubmit}>
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
