import React, { useState } from 'react';
import { userPost } from '../../api/api';
import './../../style/form.sass'
import './../../style/button.sass'
import { Alert } from './../ui/Alert';

export function Register({ onClick }) {
    const [errorAPI, setErrorAPI] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorPasswordFormat, setErrorPasswordFormat] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const handleSubmit = async function (e) {
        setErrorPassword(null)
        setErrorAPI(null)
        setErrorEmail(() => false)
        setErrorPasswordFormat(() => false)
        e.preventDefault()
        /**
         * 
         * @param {string} email 
         * @returns true si email valide false si email invalide
         */

        async function validationEmail(email) {
            let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
            //On split l'email pour extraire pour controler que un email comme test@test.test ne puisse pas passer
            //attention si l'utilisateur  saisie uniquement "test" erreur dans la console mais au niveau HTML le formulaire est bloqué car l'input n'est pas bon
            let emailSplit = email.split("@");
            let emailSplit2 = emailSplit[1].split(".");
            let emailDomain = email.split(".");
            let emailDomainRegex = new RegExp('^' + emailDomain[1] + '\w{0,10}', 'g')
            let testEmail = emailRegex.test(email);
            //la logique est inversée le test va donner vrai si la chaine de carctère après le @ = le domaine
            //Exemple test@test.test => test == test donc vrai
            //Exemple test@test.fr => test != fr donc faux
            let testDomain = emailDomainRegex.test(emailSplit2[0])

            if (testEmail == true && testDomain == false && emailSplit2 != undefined) {
                return true
            } else {
                return false
            }
        }

        async function validationPassword(password) {
            let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$", "g")
            let testPassword = passwordRegex.test(password)
            return testPassword
        }

        if (e.target.password.value == e.target.passwordConfirm.value) {
            const form = e.target
            const data = Object.fromEntries(new FormData(form))
            const testEmail = await validationEmail(e.target.email.value)
            const testPassword = await validationPassword(e.target.password.value)
            if (testPassword != true) {
                setErrorPasswordFormat(() => true)
            }
            if (testEmail) {
                try {
                    const userRegister = await userPost(data, '/users/signup')
                    const status = await userRegister.status
                    if (status == "200") {
                        onClick('login')
                    }
                }
                catch (error) {
                    console.error(error)
                }
            } else {
                setErrorEmail(() => true)
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
                    <input type="password" name="password" id="password" minLength="8" maxLength="10" required></input>
                </div>
                <div className='form__field'>
                    <label htmlFor="passwordConfirm" >Confirmer le mot de passe</label>
                    <input type="password" name="passwordConfirm" id="passwordConfirm" minLength="8" maxLength="10" required></input>
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
                    <button type="submit" className='button' aria-label="Envoyer">Inscription</button>
                </div>
            </form>
            <div className='alert'>
                {errorPassword && <Alert>{errorPassword}</Alert>}
                {errorAPI && <Alert>{errorAPI}</Alert>}
                {errorPasswordFormat && <Alert>Votre mot de passe doit contenir une minuscule, une majuscule, un nombre et un caractère spécial</Alert>}
                {errorEmail && <Alert>L'email n'est pas valide</Alert>}
            </div>
        </div>
    </>
}

