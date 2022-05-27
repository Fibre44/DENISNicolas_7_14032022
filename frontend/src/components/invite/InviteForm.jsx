import { Alert } from "../ui/Alert";
import { Confirmation } from "../ui/Confirmation";
import { setData } from "../../api/api";
import { useState } from "react";
import './../../style/formInvite.sass'
export function InviteForm({ identity, actifGroup }) {
    const [error, setError] = useState(null)
    const [succes, setSucces] = useState(null)

    const invite = async function (e) {
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            GroupId: actifGroup.uuid,
            groupName: actifGroup.groupName,
            inviteBy: identity.firstname + ' ' + identity.lastname
        }
        const invite = await setData('/invite', 'POST', data)
        const error = await invite.error
        if (error) {
            setError(true)
            setSucces(false)

        } else {
            setSucces(true)
            setError(false)

        }
    }
    return < form action="" className='formInvite' onSubmit={invite} >
        <label htmlFor="email">Inviter un utilisateur</label>
        <input type="email" name='email' id='email' required />
        <button type="submit" className="button">Inviter au groupe {actifGroup.groupName}</button>
        <div className='alert'>
            {error && <Alert>Oups l'utilisateur n'existe pas</Alert>}
            {succes && <Confirmation>L'invitation a été envoyée</Confirmation>}

        </div>
    </form >



}