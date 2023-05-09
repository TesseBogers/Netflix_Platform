import React, {useRef, useState} from 'react'
import {useForm} from "react-hook-form";
import {Redirect} from "react-router-dom";
import axios from "axios";
import './Register.css';
import Banner from "../Home/Banner";

const endpointLinkRegister = 'https://frontend-educational-backend.herokuapp.com/api/auth/signup'

export default function SignInForm() {
    const [createUserSucces, setCreateUserSucces] = useState(false);
    const [createUserError, setCreateUserError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}, watch} = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    async function onSubmit(data) {
        toggleLoading(false);
        try {
            const response = await axios.post(endpointLinkRegister, {
                username: data.username,
                email: data.email,
                password: data.password,
                confirmpassword: data.confirmpassword,
                role: ['user'],
            });
            if (response.status === 200) {
                setCreateUserSucces(true);
            }
        } catch (e) {
            console.error(e);
            if (e.message.includes('400')) {
                setCreateUserError(<span>Je gekozen gebruikersnaam en/of emailadres is reeds in gebruik, <br/> of je ingegeven wachtwoorden komen niet overeen.</span>);
            } else {
                setCreateUserError(<span>Er ging wat mis, probeer het opnieuw</span>)
            }

        }
        toggleLoading(true);
    }


    return (
        <>
            <Banner/>
            <div className="signup">


                <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Registreer:</h1>
                    <label htmlFor="userName"/>
                    <input
                        name="username"
                        type="text"
                        placeholder="Naam"
                        {...register("username", {
                            required: "Gebruikersnaam is verplicht",
                        })}
                    />
                    {errors.username && <p>Vul een gebruikersnaam in</p>}

                    <label htmlFor="email"/>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is verplicht",
                        })}
                    />
                    {errors.email && <p>Vul een email-adres in</p>}


                    <label htmlFor="password"/>
                    <input
                        name="password"
                        type="password"
                        placeholder="Wachtwoord"
                        {...register("password", {
                            required: "Wachtwoord is verplicht",
                            minLength: {
                                value: 6,
                                message: "Wachtwoord moet uit minstens zes karakters bestaan"
                            }
                        })}

                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <label htmlFor="confirm password"/>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Herhaal wachtwoord"
                        {...register("confirmPassword", {
                            required: "Wachtwoord is verplicht",
                            minLength: 6,
                            message: "Wachtwoord moet uit minstens zes karakters bestaan"
                        })}
                    />
                    {errors.confirmpassword && <p>{errors.confirmPassword.message}</p>}


                    <button className="signup__submit"
                            type="submit"
                            disabled={loading}>
                        {loading ? 'Aan het laden...' : 'Verzenden'}
                    </button>
                    {createUserSucces ? <Redirect to='/login'/> : null}
                    {createUserError}
                </form>
            </div>
        </>
    );

}