import { useEffect, useRef, useState } from 'react';
import './css/App.css';
import axios from 'axios';
import { Helmet } from 'react-helmet';
function App({auth}) {
  const loader = useRef();
  const alert = useRef();
  const [fetchedDatas,setFetchedDatas] = useState([]);
  useEffect(()=>{
    loader.current.style.display='grid';
    if(auth){
    axios.get("https://zany-gray-cricket-cap.cyclic.app/get")
    .then((res)=>{
      const response = res.data;
      setFetchedDatas(response.map((obj)=>obj))
      loader.current.style.display='none';
    })
    .catch((error)=>{
      console.log(error)
      alert.current.innerHTML = `<div class="alert">Something went wrong! <br /> <span>Refresh and try again later.</span></div>`
      alert.current.style.display = 'grid';
      loader.current.style.display='none';
    })}
    else{
      alert.current.innerHTML = `<div class="alert">Authentication failed! <br /> <span>Try logging in again.</span></div>`
      alert.current.style.display = 'grid';
      loader.current.style.display='none';
      setTimeout(()=>{
        window.location.replace('/')
      },3000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="App">
      <Helmet>
        <title>Messages for SP Tech</title>
      </Helmet>
      <header>
        <h1>Messages</h1>
      </header>
      <footer>
        {
          fetchedDatas.map((obj)=>(
            <div key={obj._id} className="message">
              <div id='p' className="Name"><div className="label">Name</div> : {obj.Name}</div>
              <div id='p' className="phoneNumber"><div className="label">Phone Number</div> : {obj.phoneNumber}</div>
              <div id='p' className="email"><div className="label">Email</div> : <a href={'https://mail.google.com/mail/u/0/#inbox?compose='+obj.email}>{obj.email}</a></div>
              <div id='p' className="Message"><div className="label">Message</div> <div className="message-container">{obj.Message}</div></div>
              <div id='p' className="received"><div className="label">Received at</div> : {obj.createdAt}</div>
              <div id='p' className="edited"><div className="label">Edited at</div> : {obj.updatedAt}</div>
            </div>
          ))
        }
      </footer>
      <div ref={loader} className="loader">
        <svg>
          <circle cx="20" cy="20" r="20"></circle>
        </svg>
      </div>
      <div ref={alert} id="alert" className="loader">
        <div className="alert">Something went wrong! <br /> <span>Refresh and try again later.</span></div>
      </div>
    </div>
  );
}

export default App;
