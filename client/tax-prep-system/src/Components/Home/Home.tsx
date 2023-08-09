import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { selectCurrentFirstName, selectCurrentLastName, selectCurrentSSN, setCredentials, setName } from '../../Slices/AuthSlicer';
import { Button } from '@trussworks/react-uswds';
import { useNavigate } from 'react-router-dom';

import api from '../../api/axiosConfig'
import { Link } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();
    const ssn = useSelector(selectCurrentSSN)

    useEffect(()=>{
        console.log(ssn)
        if( !ssn){
            console.log("here")
            //attempt to login
            api.post("/users/login", {}).then((resposne)=>{
                console.log(resposne.data);
                const {ssn, firstName, lastName} = resposne.data
                dispatch(setCredentials({ssn}));
                dispatch(setName({firstName, lastName}));
            }).catch((error)=>{
                console.log(error)
            })
        }
    }, [ssn]);

    const handleSubmit = (e:any) =>{
        navigate('/userInfo')
    }
    return (
        <div>
            Welcome {useSelector(selectCurrentFirstName)} {useSelector(selectCurrentLastName)}
            <Button type="button" onClick={handleSubmit}>click me </Button>
            <Link to="/calculate">calculate</Link>
        
        </div>
    )
}

export default Home