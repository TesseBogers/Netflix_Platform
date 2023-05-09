import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {CountryContext} from "./LocationContext";
import ProfileItem from "./ProfileItem";
import dotenv from 'dotenv';
dotenv.config();
export default function Profile() {

    const [expiringItems, setExpiringItems] = useState([]);
    const [recentItems, setRecentItems] = useState([]);
    const countries = useContext(CountryContext);
    const apiKey = process.env.REACT_APP_API_KEY;

    const optionExpired = {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
        params: {q: `get:exp:${[countries]}`, t: 'ns', st: 'adv', p: '1'},
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    };

    const optionNewRelease = {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
        params: {q: `get:new7:${[countries]}`, p: '1', t: 'ns', st: 'adv'},
        headers: {
            'X-RapidAPI-Key': 'f84ea65753msha882dcdbba583bap176d2ajsn9c6029332335',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    };

    useEffect(() => {
        async function expire() {
            try {
                const response = await axios(optionExpired)
                setExpiringItems(response.data.ITEMS)
            } catch (e) {
                console.error(e);
            }
        }

        expire();
    }, [countries])

    useEffect(() => {
        async function release() {
            try {
                const response = await axios(optionNewRelease)
                setRecentItems(response.data.ITEMS)
            } catch (e) {
                console.error(e);
            }
        }

        release();
    }, [countries])

    return (
        <>
            <div className='row'>
                <h2>Nieuw op je Netflix:</h2>
                <div className='row__items'>
                    {
                        recentItems.map((movie) => {
                            return <ProfileItem key={movie.netflixid} item={movie}/>

                        })

                    }
                </div>
            </div>

            <div className='row'>
                <h2>Verdwijnt binnenkort van je Netflix:</h2>

                <div className='row__items'>
                    {
                        expiringItems.map((movie) => {
                            return <ProfileItem key={movie.netflixid} item={movie}/>
                        })

                    }

                </div>
            </div>

        </>
    )
}
