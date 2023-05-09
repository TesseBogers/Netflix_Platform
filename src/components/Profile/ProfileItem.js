import React from "react";

export default function ProfileItem({item}) {

    return (
        <>
            <li className='item' key={item?.id}>
                <img src={item?.image} alt='item'/>
                <div className='item__info'>
                    <h4 className='item__info__title'>{item?.title.replace(new RegExp('&#39;', 'g'), "'")}</h4>
                    <p className='item__info__synopsis'>
                        {item?.synopsis
                            .replace(new RegExp('&#39;', 'g'), "'")
                            .replace(new RegExp('<br>', 'g'), "")
                            .replace(new RegExp('<b>', 'g'), '***')
                            .replace(new RegExp('</b>', 'g'), '***')
                            .replace(new RegExp('&mdash;', 'g'), '')
                            .replace(new RegExp('&eacute;', 'g'), 'é')
                            .replace(new RegExp('&rsquo;', 'g'), "'")
                            .replace(new RegExp('&quot;', 'g'), '"')

                        }
                    </p>
                </div>
            </li>
        </>
    )
}