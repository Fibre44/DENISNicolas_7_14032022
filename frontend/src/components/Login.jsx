import React, { useState } from 'react';
import { register } from '../api/api';
import './../style/form.sass'

export function Login() {

    const [page, setPage] = useState('login')

    let content = null

    if (page === 'login') {
        content = <LoginForm onClick={setPage} />

    } else {

        content = <Register connexion={setPage} />
    }

    return <>
        {content}
    </>

}

function LoginForm({ onClick }) {

    return <form action="" id="login" className='form'>
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

    </form>

}

function Register({ connexion }) {

    const [error, setError] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)

    const handleSubmit = async function (e) {
        e.preventDefault()
        //Ko à revoir const
        //const data2 = new FormData(e.target)
        console.log(e.target.password.value + ' ' + e.target.passwordConfirm.value)
        if (e.target.password.value == e.target.passwordConfirm.value) {

            console.log("mot de passe ok")

            const data = {
                email: e.target.email.value,
                password: e.target.password.value,
                firstname: e.target.firstname.value,
                lastname: e.target.lastname.value
            }

            try {
                const userRegister = await register(data)

                const status = await userRegister.status

                if (status == "200") {

                    connexion('login')

                } else {

                    setError(status)
                    console.log("Problème avec l'API")
                }

            }
            catch (error) {
                console.error(error)

            }
        } else {

            console.log("erreur mot de passe")
            setErrorPassword("Le mot de passe et la confirmation sont different")
        }


    }

    return <>
        <form action="" id="register" className='form' onSubmit={handleSubmit}>
            <h2>Formulaire d'enregistrement</h2>

            <div className='form__field'>
                <label htmlFor="email" >Email</label>
                <input type="email" name="email" id="email" required></input>
            </div>
            <div className='form__field'>
                <label htmlFor="password" >Mot de passe</label>
                <input type="password" name="password" id="password" required></input>
            </div>
            <div className='form__field'>
                <label htmlFor="passwordConfirm" >Confirmer le mot de passe</label>
                <input type="password" name="passwordConfirm" id="passwordConfirm" required></input>
            </div>
            <div className='form__field'>
                <label htmlFor="firstname" >Prénom </label>
                <input type="text" name="firstname" id="firstname" required></input>
            </div>

            <div className='form__field'>
                <label htmlFor="lastname" >Nom de famille</label>
                <input type="text" name="lastname" id="lastname" required></input>
            </div>
            <div className='form__field'>
                <button type="submit">Inscription</button>

            </div>

        </form>

        {errorPassword && <AlertPassword>{errorPassword}</AlertPassword>}
    </>


}

function AlertPassword({ children }) {

    return <p className='form__field--error'>
        {children}
    </p>
}

