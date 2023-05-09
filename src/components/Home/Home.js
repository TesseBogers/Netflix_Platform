import React, {useState} from 'react';
import Row from "./Row";
import Banner from "./Banner";


export default function Home() {

    const [input, setInput] = useState([]);
    const [updated, setUpdated] = useState(null);

    const handleOnChange = (e) => {
        setInput(e.target.value)
        e.preventDefault();
    }

    const handleOnlick = () => {
        setUpdated(input)
    }

    const handleKeyPress = (e) => {
        e.charCode(13)
        setUpdated(input)
    }
    return (
        <>
            <Banner/>
            <div className='searchbar'>
                <form onSubmit={handleOnChange}>
                    <input
                        className='searchbar__input'
                        id='search'
                        name='search'
                        type='search'
                        placeholder='Zoek hier je film...'
                        onChange={handleOnChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button className='searchbar__button' type='submit' onClick={handleOnlick}>.</button>
                </form>
            </div>
            <main className='app'>
                {
                    updated === null ?
                        <>
                            <Row title={'Tieners'} endpoint={'2340'} startyear={'2000'}/>
                            <Row title={'Klassiekers'} endpoint={'31574'} startyear={'1950'}/>
                            <Row title={'Komedie'} endpoint={'31694'} startyear={'1950'}/>
                            <Row title={'Sci-Fi'} endpoint={'108533'} startyear={'1980'}/>
                        </>
                        :  <Row title={'Zoekresultaat'} inputUser={updated}/>
                }
            </main>
        </>
    );
}
;

