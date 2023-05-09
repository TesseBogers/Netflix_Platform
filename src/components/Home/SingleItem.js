import React from "react";
import "./Search.css";

export default function Single({item}) {

    let countryOverview = item?.clist;
    countryOverview = String(countryOverview)
    countryOverview = countryOverview.replace(new RegExp('"', "g"), '')
    countryOverview = countryOverview.replace(new RegExp(":", "g"), ', ')
    countryOverview = countryOverview.split(",")

    let fullCountryName = []

    let arrayLength = countryOverview.length;
    for (let i = 0; i < arrayLength; i++) {
        if (i % 2 !== 0) {
            fullCountryName.push(countryOverview[i]);
        }
    }
    countryOverview = fullCountryName.toString()

    return (
        <>
            <li className='item' key={item?.id}>
                <img src={item?.img} alt='item'/>
                <div className='item__info'>
                    <h4 className='item__info__title'>{item?.title.replace(new RegExp('&#39;', 'g'), "'")}</h4>
                    <p className='item__info__synopsis'>{item?.synopsis.replace(new RegExp('&#39;', 'g'), "'")}</p>
                    <p className='item__info__country'>{countryOverview}</p>
                </div>
            </li>
        </>
    )
}