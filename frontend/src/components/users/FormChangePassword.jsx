import react, { useState } from 'react';

export function FormChangePassword() {

    const [error, setError] = useState(null)

    const handleSubmit = async function (e) {
        e.preventDefault()
        const data = {
            password: e.target.password.value,
            newPassword: e.target.newPassword.value
        }

        console.log(data)
    }
    return <>
        <form className='form' onSubmit={handleSubmit} >
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

        </form>

    </>
}