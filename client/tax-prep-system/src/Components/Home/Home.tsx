import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import { selectCurrentFirstName, selectCurrentLastName } from '../../Slices/AuthSlicer';
import { Button } from '@trussworks/react-uswds';

import api from '../../api/axiosConfig'


function Home() {
    
    const firstName = useSelector(selectCurrentFirstName);
    const lastName = useSelector(selectCurrentLastName);

    const handleSubmit = (e:any) =>{
        e.preventDefault();

        api.get("/users").then((resposne)=>{
            console.log(resposne.data)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return (
        <div>
            Welcome {firstName} {lastName}
            <Button type="button" onClick={handleSubmit}>click me </Button>
        
        </div>
    )
}

export default Home