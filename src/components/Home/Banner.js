import React from 'react';
import './Banner.css';
import banner from '../../assets/banner.png';

function Banner() {

    return (
        <header className='banner'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url('${banner}')`,
                    backgroundPosition: 'center center',
                }}
        >

        </header>
    );
}

export default Banner;