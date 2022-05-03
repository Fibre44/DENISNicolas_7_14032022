import React from "react";
import './../../style/footer.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


export function Footer() {

    return <footer className='footer'>
        <ul className='footer__list'>
            <li><FontAwesomeIcon icon={faEnvelope} /><a href="mailto:contact@goupomania">Contacter l'administrateur</a></li>
            <li>Projet OpenClassRooms</li>
            <li>version 0.5</li>
        </ul>
    </footer>
}