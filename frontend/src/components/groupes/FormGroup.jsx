import { useRef } from "react";
import { postFormData } from "../../api/api";
import './../../style/groups.sass'
import './../../style/button.sass'


export function FormGroup({ method }) {

    const form = useRef(null)
    const onSubmit = async function (e) {
        e.preventDefault()
        const formData = new FormData(form.current)
        try {
            const postGroup = postFormData('/groups', method, formData)
            const status = (await postGroup).status
        } catch {
            console.error('Erreur avec l\'API')
        }
    }

    return <form ref={form} action="" onSubmit={onSubmit} className="groups__items" encType='multipart/form-data'>
        <label htmlFor="title">Titre</label>
        <input type="text" id="title" name="title" placeholder="Saisir le nom du groupe" required />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" placeholder="Saisir une description" required />
        <label htmlFor="private">Privé</label>
        <input type="checkbox" name="private" id="private" value="true" />
        <label htmlFor="imageDescription">Description de l'image</label>
        <input type="text" id="imageDescription" name="imageDescription" />
        <label htmlFor="image">Ajouter une image de couverture à votre groupe</label>
        <input type="file" id="image" name="image" />
        <input type="submit" className="button" value="Créer votre groupe" />

    </form>
}