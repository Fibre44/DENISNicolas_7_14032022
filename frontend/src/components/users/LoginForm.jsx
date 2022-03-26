import React, { useState } from 'react';
import { userPost } from '../../api/api';
import './../../style/form.sass'
import { Alert } from './../ui/Alert';



export function LoginForm({ onConnect, onClick }) {

    const [errorConnexion, setErrorConnexion] = useState(null)

    const handleSubmit = async function (e) {
        e.preventDefault()

        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }

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
                <button type="submit">Se connecter</button>

                <a href="#register" onClick={() => onClick('register')}>Pas de compte inscrivez vous ici</a>
                <a href="passwordrecovery"> </a>

            </form>

            <div className='alert'>

                {errorConnexion && <Alert>{errorConnexion}</Alert>}
            </div>


        </div>

    </>



}
