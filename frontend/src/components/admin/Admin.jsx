import React, { useEffect, useState, useRef } from "react";
import { getData, setData, postFormData } from './../../api/api';
import { Error } from '../ui/Error';
import './../../style/admin.sass'
import './../../style/button.sass'
import { Alert } from "../ui/Alert";
import { Confirmation } from "../ui/Confirmation";

export function Admin() {

    const [messages, setMessages] = useState(null)
    const [comments, setComments] = useState(null)
    const [error, setError] = useState(null)
    const [errorAdd, setErrorAdd] = useState(null)
    const [succes, setSucces] = useState(null)
    const [refreshContent, setRefreshContent] = useState(null)
    const [choice, setChoice] = useState('message')
    const form = useRef(null)

    useEffect(async function () {
        const response = await getData('/admin/messages')
        if (response.error) {
            setError(() => true)
        } else {
            const messages = await response.json()
            setMessages(messages)
        }
    }, [refreshContent])

    useEffect(async function () {
        const response = await getData('/admin/comments')
        if (response.error) {
            setError(() => true)
        } else {
            const comments = await response.json()
            setComments(comments)
        }
    }, [refreshContent])

    const onSubmit = async function (e) {
        e.preventDefault()
        //const form = e.target
        const formData = new FormData(form.current)
        try {
            const response = await postFormData('/admin/add', 'POST', formData)
            if (response.error) {
                setErrorAdd('Erreur lors de la mise à jour du compte')
                setSucces('')
            } else {
                setSucces('Mise à jour du role')
                setErrorAdd('')
            }
        } catch {
            console.error("echec")
            setError(() => true)

        }
    }

    let rows = null
    if (choice == 'message') {
        rows = messages
    } else {
        rows = comments
    }

    return <div className='admin'>
        <form ref={form} className='admin__add' onSubmit={onSubmit}>
            <label htmlFor='email'>Indiquer un email pour ajouter un administateur</label>
            <input type='email' name='email' id='email' />
            <input type="submit" className='button' />
            <Alert>{errorAdd}</Alert>
            <Confirmation>{succes}</Confirmation>
        </form>
        {error ? <Error /> : <>
            <fieldset>
                <legend>Choisir un élement à consulter</legend>
                <label htmlFor='message'>Message</label>
                <input type='radio' id='message' name='message' value='message' onClick={() => setChoice('message')}></input>
                <label htmlFor='message'>Commentaire</label>
                <input type='radio' id='comment' name='comment' value='comment' onClick={() => setChoice('comment')}></input>
            </fieldset>
            <Table rows={rows} type={choice} refresh={setRefreshContent}></Table>

        </>

        }
    </div>
}

function Table({ rows, type, refresh }) {

    const tableRow = []
    const handleClick = async function (e) {
        const response = await setData('/admin/' + type + '/' + e.target.getAttribute('data-id'), 'DELETE')
        const status = await response.status
        refresh(() => e.target.getAttribute('data-id'))
    }
    if (rows) {
        if (type == 'message') {
            for (let row of rows.messages) {
                tableRow.push(<tr key={row.id}>
                    <td>{row.message}</td>
                    <td>{row.updatedAt}</td>
                    <td><button data-id={row.id} onClick={handleClick}>Supprimer</button></td>
                </tr>)
            }
        } else {
            for (let row of rows.comments) {
                tableRow.push(<tr key={row.id}>
                    <td>{row.comments}</td>
                    <td>{row.updatedAt}</td>
                    <td><button data-id={row.id} onClick={handleClick}>Supprimer</button></td>
                </tr>)
            }
        }
        return <table>
            <thead>
                <tr>
                    <th>Contenu</th>
                    <th>Date de mise à jour</th>
                    <th>Supprimer</th>
                </tr>

            </thead>
            <tbody>
                {tableRow}
            </tbody>
        </table>
    } else {
        return <p>chargement</p>
    }
}






