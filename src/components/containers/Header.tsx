import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import UserProfilePage from "../auth/user";

export const Header = () => {
    const [userToken, setUserToken] = useState<string>();
    const [email, setEmail] = useState<string>();
    const SetUser = async () => {
        if(localStorage.Token !== "") {
            const res = await axios
                .get('http://local.laravel.spu911.com/api/auth/user-profile', { headers: {"Authorization" : `Bearer ${localStorage.Token}`} })
                const {data} = res;
            setUserToken(localStorage.Token);
            setEmail(data.email);
        } else {
            setUserToken("");
            setEmail("");
        }
        //CheckUser();
    }
    
    const CheckUser = () => {
        if(userToken === "") {
            console.log("unlog");
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/login">
                            Вхід
                        </a>
                    </li>
                    <li>
                        <a className="nav-link" aria-current="page" href="/register">
                            Реєстрація
                        </a>
                    </li>
                </ul>        
            );
        } else {
            console.log("log");
            return (
                <a className="nav-link" aria-current="page" href="/user-profile">
                    {email}
                </a>
            );
        }
    }

    useEffect(() => {
        SetUser();
    });

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Авто для всіх
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">
                                    Головна
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <CheckUser />
                                {/* <a className="nav-link" aria-current="page" href="/login">
                                  Вхід
                              </a> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};