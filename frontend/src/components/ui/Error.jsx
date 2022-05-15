import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSurprise } from '@fortawesome/free-solid-svg-icons'
import './../../style/error.sass'
export function Error() {
    return <div className='error'>
        <FontAwesomeIcon icon={faFaceSurprise} size="10x" color="#1877E6" />
        <h1>Oups nous rencontrons un problème</h1>
    </div>

}