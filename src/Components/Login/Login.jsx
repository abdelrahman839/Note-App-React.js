import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LoginStyle from './Login.module.css'
import mainImg from '../../Images/note.jpg'
import axios from 'axios';
import { connect } from 'react-redux';
import { SignIn } from '../../redux/actions/actions';

function Login(props) {
    console.log(props.location);
    const [waiting, setWaiting] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    function getUser({ target }) {
        setUser({ ...user, [target.name]: target.value })
    }
    let sendData = async (e) => {
        setWaiting(true);

        e.preventDefault();
        let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signin`, user);
        if (data.message === "success") {
            localStorage.setItem("token", data.token);
            props.SignIn()
            props.history.replace('/home');
            setWaiting(false);
            
        } else {
            setError(`${data.message}`);
            console.log(data.message.failed);
            setWaiting(false);
        }
    }
    
    
    useEffect(() => {

       
    },[])
    return (
        <>
        
        
            <section className={`${LoginStyle.page_design}`}>
                <div className="container h-100 d-flex justify-content-center align-items-center">
                    <div className="row justify-content-center align-items-center  h-80  ">
                        <div className={`col-lg-4 col-md-6   shadow            ${LoginStyle.boderTop}           ${LoginStyle.form_height}    `} >
                            <img src={mainImg} className={`        ${LoginStyle.main_img}            ${LoginStyle.boderTop}  `} alt="" />
                        </div>
                        <div className={`col-lg-4 col-md-6    d-flex justify-content-center align-items-center flex-column shadow   overflow-hidden              ${LoginStyle.boderBottom}              ${LoginStyle.form_height}      `}>
 
                            <form id='form_fade' className={`w-100 h-100 p-5 d-flex justify-content-center align-items-center flex-column overflow-hidden    `}>
                                <h3 className= {` font-weight-bold   ${LoginStyle.F_T_T_D}`} >Welcome to Notes</h3>
                                <input onChange={getUser} name="email" type="email" placeholder="Email" className={`${LoginStyle.input_style}    ${LoginStyle.delay_2}       px-2 form-control`} />
                                <input onChange={getUser} name="password" type="password" placeholder="Password" className={`${LoginStyle.input_style}      ${LoginStyle.delay_4}  px-2 form-control mt-2`} />
                                {error && <div className={`${LoginStyle.input_style}     alert alert-danger w-100 text-center mt-2 `}>{error}</div>}
                                <button onClick={sendData} type="submit" className={`${LoginStyle.btn_color}    ${LoginStyle.delay_6}   px-4 py-2 btn mt-2 w-100`}>{waiting ? 'Waiting....' : 'Sign in'} </button>
                                <div className= {`row justify-content-center align-items-center mt-1      ${LoginStyle.delay_8}`}>
                                    <p className="text-white">New User?</p>
                                    <NavLink className="text-muted text-center" to="/register"> <p>Create Account</p> </NavLink>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>






        </>
    )
}

function mapStateToProps(state) {
    return { Login: state.isLogIn }
}

export default connect(mapStateToProps, { SignIn })(Login)
