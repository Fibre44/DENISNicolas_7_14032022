import React from "react";
import { setData } from "../../api/api";
import './../../style/groups.sass'
import './../../style/button.sass'


export function FormGroup({ method }) {

    const onSubmit = async function (e) {
        e.preventDefault()
        const form = e.target
        const data = Object.fromEntries(new FormData(form))
        try {
            const postGroup = setData('/groups', method, data)
            const status = (await postGroup).status
        } catch {
            console.error('Erreur avec l\'API')
        }
    }

    return <form action="" onSubmit={onSubmit} className="groups__items">
        <label htmlFor="title">Titre</label>
        <input type="text" id="title" name="title" placeholder="Saisir le nom du groupe" required />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" placeholder="Saisir une description" required />
        <label htmlFor="private">Privé</label>
        <input type="checkbox" name="private" id="private" value='true' />
        <button type="submit" className="button">Créer votre groupe</button>

    </form>
}