import React from "react";
import './../../style/nav.sass'
import logo from './../../img/icon-left-font-monochrome-black.png'

export function Picture({ picture }) {
    if (picture) {
        return <>
            {picture.picture.pictureUrl ? <img src={picture.picture.pictureUrl} alt='Photo de profil' className='nav__picture' /> : <img src={logo} alt='Photo de profil' className='nav__picture' />}
        </>
    } else {
        return <p>
            Chargement</p>
    }

}