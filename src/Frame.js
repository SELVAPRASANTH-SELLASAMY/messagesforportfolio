import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";
import App from './App';
import Login from './Login';
import { HashRouter as Router,Route,Routes } from "react-router-dom";
const Frame = () =>{
    const [cookie] = useCookies(['user'])
    const [auth,setAuth] = useState(false)
    useEffect(()=>{
        if(cookie.token){
            Axios.get("https://zany-gray-cricket-cap.cyclic.app/getToken",{
                headers:{
                    login_header:cookie.token
                }
            }).then((res)=>{
                console.log(res.data)
                if(res.data === "Tom"){
                    setAuth(true)
                }
                else{
                    setAuth(false)
                }
            }).catch((err)=>{
                setAuth(false)
                console.log(err)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    if(auth){
        return(
            <App auth={auth}/>
        )
    }
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/message" element={<App auth={auth}/>}/>
            </Routes>
        </Router>
    )
}
export default Frame;