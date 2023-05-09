import React, {useContext, useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import './Login.css';
import axios from "axios";
import {AuthContext, useAuthState} from "../Context/AuthContext";
import {useHistory} from "react-router-dom";
import Banner from "../Home/Banner";

const endpointLinkSignIn = 'https://frontend-educational-backend.herokuapp.com/api/auth/signin';

export default function Login() {
    const [error, setError] = useState(false);
    const {login} = useContext(AuthContext);
    const {isAuthenticated} = useAuthState();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated === true) {
            history.push('/myprofile')
        }
    }, [isAuthenticated])

    async function onSubmit(data) {
        try {
            const response = await axios.post(endpointLinkSignIn, {
                username: data.username,
                password: data.password,
            });
            login(response.data);
        } catch (e) {
            console.error(e);
            setError(true);
        }
    }


    return (
        <>
            <Banner/>
            <div className="signin">


                <form className="signin__form" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Inloggen:</h1>
                    <label htmlFor="userName"/>
                    <input
                        name="username"
                        type="text"
                        placeholder="Gebruikersnaam"
                        {...register("username", {
                            required: true,
                        })}
                    />
                    {errors.username && <p>Vul een gebruikersnaam in</p>}

                    <label htmlFor="password"/>
                    <input
                        name="password"
                        type="password"
                        placeholder="Wachtwoord"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    {errors.password && <p>Vul een wachtwoord in</p>}
                    <br/>

                    {error && <span>Het inloggen is mislukt, probeer het opnieuw</span>}

                    <button className="signin__submit"
                            type="submit"
                    > Log in
                    </button>
                </form>
            </div>
        </>
    );

}