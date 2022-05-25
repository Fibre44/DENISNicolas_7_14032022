import React, { memo } from "react";
import './../../style/invite.sass'
import './../../style/button.sass'
import { setData } from "../../api/api";

export function Invitations({ invitations, refreshInvite }) {
    if (invitations.invites.length == 0) {
        return <p>
            Vous n'avez pas d'invitation en attente</p>
    } else {
        return <>
            <div className='invite'>
                {invitations.invites.map(invite => <div key={invite.id} className='invite__items'>
                    <MyInvite invite={invite} refreshInvite={refreshInvite} />

                </div>)}
            </div>

        </>
    }

}

const MyInvite = memo(function ({ invite, refreshInvite }) {

    const acceptInvite = async function (e) {
        const accept = await setData('/invite/' + invite.id + '/accept', 'POST')
        const status = await accept.status
        refreshInvite(() => invite.id)
    }
    const refuseInvite = async function (e) {
        const refuse = await setData('/invite/' + invite.id + '/refuse', 'DELETE')
        const status = await refuse.status
        refreshInvite(() => invite.id)
    }
    return <>
        <span>{invite.inviteBy} vous invite à rejoindre</span>
        <span>{invite.groupName}</span>
        <button className='button button--width' onClick={acceptInvite}>Accepter</button>
        <button className='button button--width' onClick={refuseInvite}>Refuser</button>

    </>
})