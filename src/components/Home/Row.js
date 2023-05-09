import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Row.css';
import SingleItem from "./SingleItem";
import './SingleItem.css';
import dotenv from 'dotenv';
dotenv.config();

function Row({title, endpoint, startyear, inputUser}) {

    const [movies, setMovies] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;

    const options = {
        method: 'GET',
        url: 'https://unogsng.p.rapidapi.com/search',
        params: {
            query: inputUser,
            genrelist: endpoint,
            type: 'movie',
            start_year: startyear,
            orderby: 'rating',
            limit: '16',
            subtitle: 'english',
            audio: 'english',
            offset: '0',
            end_year: '2019',
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'unogsng.p.rapidapi.com'
        }
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios(options)
            setMovies(request.data.results)
        }

        fetchData();
    }, [inputUser])
    console.log(movies)

    return (
        <section className='row'>
            <h2>{title}:</h2>

            <div className='row__items'>
                {
                    movies.map((movie) => {
                        return <SingleItem key={movie.id} item={movie}/>
                    })
                }
            </div>
        </section>
    );
}


export default Row;