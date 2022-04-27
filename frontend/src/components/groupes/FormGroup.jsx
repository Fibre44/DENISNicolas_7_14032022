import React from "react";
import { setData } from "../../api/api";
import './../../style/groups.sass'


export function FormGroup({ method, token }) {

    const onSubmit = async function (e) {
        e.preventDefault()
        const data = {
            title: e.target.title.value,
            description: e.target.description.value,
            private: false
        }
        try {
            const postGroup = setData('/groups', token, method, data)
            const status = (await postGroup).status
            console.log(status)
        } catch {
            console.error('Erreur avec l\'API')
        }
    }

    return <form action="" onSubmit={onSubmit} className="groups__items">
        <label htmlFor="title">Titre</label>
        <input type="text" id="title" name="title" placeholder="Saisir le nom du groupe" />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" placeholder="Saisir une description" />
        <label htmlFor="private">Privé</label>
        <input type="checkbox" name="private" id="private" />
        <button type="submit">Créer votre groupe</button>

    </form>
}