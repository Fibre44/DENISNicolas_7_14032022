import React from "react";
import './../../style/nav.sass'

export function Picture({ picture }) {
    if (picture) {
        return <>
            <img src={picture.picture.pictureUrl} alt='Photo de profil' className='nav__picture' />
        </>
    } else {
        return <p>chargement</p>
    }

}