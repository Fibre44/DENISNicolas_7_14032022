import React, { useState } from 'react';
import { userPost } from '../../api/api';
import './../../style/form.sass'
import { Alert } from './../ui/Alert';

export function Register({ onClick }) {
    const [errorAPI, setErrorAPI] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const handleSubmit = async function (e) {
        setErrorPassword(null)
        setErrorAPI(null)
        e.preventDefault()
        //Ko à revoir const
        const data2 = new FormData(e.target)
        if (e.target.password.value == e.target.passwordConfirm.value) {
            const data = {
                email: e.target.email.value,
                password: e.target.password.value,
                firstname: e.target.firstname.value,
                lastname: e.target.lastname.value
            }
            try {
                const userRegister = await userPost(data, '/users/signup')
                const status = await userRegister.status
                if (status == "200") {
                    onClick('login')
                } else {
                    setErrorAPI("L'email existe déjà si vous avez déjà un compte vous pouvez utiliser la fonction mot de passe oublié")
                }
            }
            catch (error) {
                console.error(error)

            }
        } else {
            setErrorPassword("Le mot de passe et la confirmation sont different")
        }
    }

    return <>

        <div className='conteneur'>
            <form id="register" className='form' onSubmit={handleSubmit}>
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
            <div className='alert'>
                {errorPassword && <Alert>{errorPassword}</Alert>}
                {errorAPI && <Alert>{errorAPI}</Alert>}
            </div>
        </div>
    </>
}

