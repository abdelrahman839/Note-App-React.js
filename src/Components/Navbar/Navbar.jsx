import React from 'react'
import NavbarStyle from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { SignOut, SignIn } from '../../redux/actions/actions';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
function Navbar(props) {
    function logOut() {
        localStorage.removeItem('token');
        props.SignOut();
    }

    const navSlide = () => {
        const navAction = document.querySelector(`.${NavbarStyle.Nav_Action}`);
        const nav = document.querySelector(`.${NavbarStyle.Nav_Links}`);
        const NavLinks = document.querySelectorAll(`.${NavbarStyle.Nav_Links} li`);
        //toggle nav
        nav.classList.toggle(`${NavbarStyle.Nav_active}`)
        //Animate Links
        NavLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `${NavbarStyle.navLinkFade} 1s ease forwards ${index / 7 + .3}s`
            }
        })
        //navAction Animation
        navAction.classList.toggle(`${NavbarStyle.toggle}`);

    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            try {
                var decoded = jwt_decode(token);
                props.SignIn();

            } catch (error) {
                props.SignOut();
            }
        }
    }, [])
    return (
        <>
            <div className={`${NavbarStyle.nav_bg}`}>
                <nav className="row container  mx-auto " >
                    <div className={`${NavbarStyle.logo} `}>
                        <NavLink className="nav-link" to="/home"> <h4>Note</h4></NavLink>
                    </div>
                    {props.isLogin ? <ul className={`${NavbarStyle.Nav_Links} `}>
                        <li>
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" to="/favorite">Favorite</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={logOut} className="nav-link" to="/login">Logout </NavLink>
                        </li>
                    </ul> : <ul className={`${NavbarStyle.Nav_Links} `}>

                        <li>
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                        </li>

                    </ul>
                    }
                    <button onClick={navSlide} className={`btn ${NavbarStyle.Nav_Action}`}>
                        <div className={`${NavbarStyle.line1}`}></div>
                        <div className={`${NavbarStyle.line2}`}></div>
                        <div className={`${NavbarStyle.line3}`}></div>
                    </button>
                </nav>
            </div>
        </>
    )
}
function mapStateToProps(state) {
    return { isLogin: state.isLogIn }
}

export default connect(mapStateToProps, { SignOut, SignIn })(Navbar)
