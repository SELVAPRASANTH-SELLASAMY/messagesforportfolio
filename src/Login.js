import { useRef, useState } from 'react';
import Axios from 'axios';
import './css/login.css';
import {useCookies} from 'react-cookie';
const Login = () =>{
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');


    const loader = useRef();
    const alert = useRef();


    const unameEmpty = useRef();
    const passwordEmpty = useRef();
    const res_msg = useRef();

    const [,setCookie] = useCookies(['user']);

    const validate = (e) =>{
        e.preventDefault();
        res_msg.current.style.visibility = 'hidden'
        loader.current.style.display='grid';
        unameEmpty.current.style.visibility = userName === '' ? 'visible' : 'hidden';
        passwordEmpty.current.style.visibility = password === '' ? 'visible' : 'hidden';
        if(userName === '' || password === ''){
            loader.current.style.display='none';
            return;
        }
        Axios.post("https://zany-gray-cricket-cap.cyclic.app/generateToken",{
            "username":userName,
            "password":password
        }).then((res)=>{
            if(res.data.token === undefined){
                // console.log(res.data.message)
                res_msg.current.innerText = res.data.message;
                res_msg.current.style.visibility = 'visible';
                loader.current.style.display='none';
            }
            else{
            // console.log(res.data.token)
            setCookie("token",res.data.token,{path:'/',maxAge:'120'})
            window.location.replace('/message');
            res_msg.current.style.visibility = 'hidden';
            loader.current.style.display='none';
        }
        }).catch((err)=>{
            res_msg.current.innerText = "Something went wrong";
            res_msg.current.style.visibility = 'visible';
            console.log(err)
            loader.current.style.display='none';
        })
    }
    return(
        <div className="Login">
            <form noValidate>
                <div ref={res_msg} className="response">Something went wrong!</div>
                <div className="header">
                    <h1>Login</h1>
                </div>
                <div className="input">
                    <input onChange={(e)=>setUserName(e.target.value)} type="text" id='username' name='username' autoComplete='off' required/>
                    <label htmlFor="username">Username</label>
                    <div className="line"></div>
                    <p ref={unameEmpty} className="warn">This field is required!</p>
                </div>
                <div className="input">
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" id='password' name='password' autoComplete='off' required/>
                    <label htmlFor="password">Password</label>
                    <div className="line"></div>
                    <p ref={passwordEmpty} className="warn">This field is required!</p>
                </div>
                <button onClick={(e)=>validate(e)} type='submit'>Submit</button>
            </form>
            <div ref={loader} className="loader">
                <svg>
                <circle cx="20" cy="20" r="20"></circle>
                </svg>
            </div>
            <div ref={alert} id="alert" className="loader">
                <div className="alert">Something went wrong! <br /> <span>Refresh and try again later.</span></div>
            </div>
        </div>
    )
}
export default Login;