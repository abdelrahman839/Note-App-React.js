import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import RegisterStyle from './Register.module.css'
import mainImg from '../../Images/note.jpg'
import axios from 'axios';


function Register(props) {
    const [waiting, setWaiting] = useState(false);
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    function getUser({ target }) {


        setUser({ ...user, [target.name]: target.value });
    }
    let sendData = async (e) => {
        setWaiting(true);
        e.preventDefault();
        let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signup`, user);
        if (data.message === "success") {
            props.history.replace('/login');
        } else {
            console.log(data.message);
            setWaiting(false);
        }
    }
    console.log(user);
    return (
        <>
            <section className={`${RegisterStyle.page_design}`}>
                <div className="container h-100 d-flex justify-content-center align-items-center">
                    <div className="row justify-content-center align-items-center  h-80 ">
                        <div className={`col-lg-4  shadow            ${RegisterStyle.boderTop}           ${RegisterStyle.form_height}    `} >
                            <img src={mainImg} className={`          ${RegisterStyle.main_img}            ${RegisterStyle.boderTop}  `} alt="" />
                        </div>
                        <div className={`col-lg-4   d-flex justify-content-center align-items-center flex-column shadow                ${RegisterStyle.boderBottom}              ${RegisterStyle.form_height}      `}>
                            <form  className="w-100  h-100 p-5   d-flex justify-content-center align-items-center flex-column overflow-hidden ">
                            <h3 className={` font-weight-bold  ${RegisterStyle.F_T_T_D}`}>Create Account</h3>

                                <input onChange={getUser} name="first_name" type="text" placeholder="Frist Name" className={`${RegisterStyle.input_style}   ${RegisterStyle.delay_2}    px-2 form-control`} />
                                <input onChange={getUser} name="last_name" type="text" placeholder="Last Name" className={`${RegisterStyle.input_style}    ${RegisterStyle.delay_4}   px-2 form-control mt-2`} />
                                <input onChange={getUser} name="email" type="email" placeholder="Email" className={`${RegisterStyle.input_style}     ${RegisterStyle.delay_6}  px-2 form-control mt-2`} />
                                <input onChange={getUser} name="password" type="password" placeholder="Password" className={`${RegisterStyle.input_style}   ${RegisterStyle.delay_8}    px-2 form-control mt-2`} />
                                <button onClick={sendData} type="submit" className={`${RegisterStyle.btn_color}   ${RegisterStyle.delay_10}   px-4 py-2 btn mt-2 w-100`}>{waiting ? 'Waiting....' : 'Register'} </button>
                                <div className={`row justify-content-center align-items-center mt-1   ${RegisterStyle.delay_12} `}>
                                    <p className="text-white">Have Account?</p>
                                    <NavLink className="text-muted text-center" to="/login"> <p>Sign in</p> </NavLink>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register
