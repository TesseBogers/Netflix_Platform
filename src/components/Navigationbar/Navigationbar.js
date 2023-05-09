import React, {useContext, useEffect, useState} from 'react';
import {Switch, Link, Route, Redirect, useHistory} from "react-router-dom";
import {AuthContext, useAuthState} from "../Context/AuthContext";
import './Navigation.css';
import Homepage from "../../Pages/Homepage/Homepage";
import LoginPage from "../../Pages/Login/LoginPage";
import RegisterPage from "../../Pages/Register/RegisterPage";
import banner from '../../assets/banner.png';
import ProfilePage from "../../Pages/Profile/ProfilePage";


export default function Navbar() {
    const history = useHistory();
    const {isAuthenticated} = useAuthState();
    const {logout} = useContext(AuthContext);
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener('scroll', null);
        };
    }, []);


    return (
        <>

            <nav className={`nav ${show && 'nav__pink'}`}>
                <img
                    className='nav__logo'
                    src={banner}
                    alt="Netflix logo"
                />

                <ul className='nav__links'>

                    <li className='nav__link'>
                        <Link to="/">Welkom</Link>
                    </li>
                    <li className='nav__link'>
                        <Link to="/myprofile">Profiel</Link>
                    </li>
                    <li className='nav__link'>
                        <Link to="/login">Aanmelden</Link>
                    </li>
                    <li className='nav__link'>
                        <Link to="/register">Registreren</Link>
                    </li>

                    <li className='nav__link__logout'>
                        {isAuthenticated ? <input
                            className="logout__submit"
                            value="Uitloggen"
                            type="submit"
                            onClick={logout}
                        /> : ''}
                    </li>
                </ul>
            </nav>

            <div>
                <Switch>
                    <Route exact path="/">
                        <Homepage/>
                    </Route>
                    <Route path="/myprofile">
                        {isAuthenticated ? <ProfilePage/> : <Redirect to='/login'/>}
                    </Route>
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    <Route path="/register">
                        <RegisterPage/>
                    </Route>
                </Switch>
            </div>
        </>

    );
}