import React, {useState, createContext, useEffect} from "react";
import axios from "axios";
import Profile from "./Profile";
import './LocationContext.css';
import {useAuthState} from "../Context/AuthContext";


export const CountryContext = createContext();

export default function LocationContext() {

    const [countries, setCountries] = useState([]);
    const [selected, setSelected] = useState('nl');

    const {user} = useAuthState();

    const options = {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
        params: {t: 'lc', q: 'available'},
        headers: {
            'X-RapidAPI-Key': 'f84ea65753msha882dcdbba583bap176d2ajsn9c6029332335',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    };

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios(options)
                setCountries(response.data.ITEMS)
            } catch (e) {
                console.error(e);
            }
        }

        getData()
    }, [])


    const selectCountry = (e) => {
        setSelected(e.target.value)
    }

    return (
        <>
            <CountryContext.Provider value={selected}>
                <div className='profile'>
                    {user && (
                        <div className='aanpassen'>
                            <h2 className='profile__info'> Welkom op je profielpagina, {user.username}! </h2>
                            <p>
                                Hier kan je alle nieuwe en verdwijnende films op Netflix in Nederland terugvinden. <br/>
                                Ga je er even tussenuit en ben je benieuwd wat er lokaal nieuw is of gaat
                                verdwijnen? <br/>
                                Pas het land aan en blijf op de hoogte:

                                <select id='country'
                                        className='country'
                                        name='country'
                                        value={selected}
                                        onChange={selectCountry}>

                                    <option>Land naar keuze</option>
                                    {
                                        countries.map((country) => {
                                            return (<option value={country[1]} key={country[0]}> {country[2]} </option>
                                            );
                                        })
                                    }
                                </select>
                                <br/>
                                Veel kijkplezier!
                            </p>
                        </div>
                    )}
                </div>
                <Profile/>
            </CountryContext.Provider>
        </>
    )
}