import React, { useEffect, useState, memo } from "react";
import { deleteData, getData } from './../../api/api';
import { Error } from '../ui/Error';
import './../../style/admin.sass'

export function Admin() {

    const [messages, setMessages] = useState(null)
    const [comments, setComments] = useState(null)
    const [error, setError] = useState(null)
    const [refreshContent, setRefreshContent] = useState(null)
    const [choice, setChoice] = useState('message')
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

    let rows = null
    if (choice == 'message') {
        rows = messages
    } else {
        rows = comments
    }

    return <div className='admin'>
        {error ? <Error /> :
            <div>
                <fieldset>
                    <legend>Choisir un élement à consulter</legend>
                    <label htmlFor='message'>Message</label>
                    <input type='radio' id='message' name='message' value='message' onClick={() => setChoice('message')}></input>
                    <label htmlFor='message'>Commentaire</label>
                    <input type='radio' id='comment' name='comment' value='comment' onClick={() => setChoice('comment')}></input>
                </fieldset>
                <Table rows={rows} type={choice} refresh={setRefreshContent}></Table>
            </div>

        }
    </div>
}

function Table({ rows, type, refresh }) {

    const tableRow = []
    const handleClick = async function (e) {
        const response = await deleteData('/admin/' + type + '/' + e.target.getAttribute('data-id'))
        const status = await response.status
        refresh(() => e.target.getAttribute('data-id'))
    }
    if (rows) {
        if (type == 'message') {
            for (let row of rows.messages) {
                tableRow.push(<tr key={row.id}>
                    <td>{type}</td>
                    <td>{row.message}</td>
                    <td>{row.updatedAt}</td>
                    <td><button data-id={row.id} onClick={handleClick}>Supprimer</button></td>
                </tr>)
            }
        } else {
            for (let row of rows.comments) {
                tableRow.push(<tr key={row.id}>
                    <td>{type}</td>
                    <td>{row.comments}</td>
                    <td>{row.updatedAt}</td>
                    <td><button data-id={row.id} onClick={handleClick}>Supprimer</button></td>
                </tr>)
            }
        }
        return <table>
            <thead>
                <th>Type</th>
                <th>Contenu</th>
                <th>Date de mise à jour</th>
                <th>Supprimer</th>
            </thead>
            <tbody>
                {tableRow}
            </tbody>
        </table>
    } else {
        return <p>chargement</p>
    }
}






