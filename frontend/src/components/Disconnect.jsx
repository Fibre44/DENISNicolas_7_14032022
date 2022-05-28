import { useEffect } from "react";
import { getData } from "../api/api";

export function Disconnect() {
    useEffect(() => {
        async function fetchData() {
            const response = await getData('/users/logout')
            const responseJson = await response.json()

        }
        fetchData();
    }, []);
    return <>

        <p>Vous avez été deconnecté</p>
    </>
}