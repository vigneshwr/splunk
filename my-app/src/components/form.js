import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Form = props=>{
    const API_URL = 'http://localhost:8000/splunk/search';
    const [searchQuery, setSearchQuery] = useState("")
    const [ip, setIp] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isEmail, setIsEmail] = useState(false)
    const [timeRange, setTimeRange] = useState("")
    const [email, setEmail] = useState("")

    useEffect(()=>{
       // console.log(email)
    }, [])

    const submit =()=>{
        let CUSTOM_API_URL = `${API_URL}?server_ip=${ip}&username=${username}&password=${password}&time=${timeRange}`

        if(isEmail){
            CUSTOM_API_URL = `${CUSTOM_API_URL}&email=${email}`;
        }
        axios.get(CUSTOM_API_URL, { withCredentials: true, mode: 'no-cors' })
        .then(result => {
                if(result.status === 200){
//                    props.setdata({
//                        data : result.data.data,
//                    })
                    console.log(result)
                }
            })
    }

    return(
        <div className="form">
            <input className="search" type="text" onChange={(e)=>setSearchQuery(e.target.value)} />
            <input type="text" onChange={(e)=>setIp(e.target.value)} placeholder="Server IP" />
            <input type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            <input type="text" onChange={(e)=>setTimeRange(e.target.value)} placeholder="Time Range" />
            <label><input type="checkbox" name="mail"  onChange={(e)=>setIsEmail(e.target.checked)}  /> need to send email?</label>
            {isEmail && <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />}
            <button onClick={()=>submit()}>Search</button>
        </div>
    )
}

export default Form