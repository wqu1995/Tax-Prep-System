import { Provider } from 'react-redux';
import W2Page from './Components/W2/W2Page.tsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaxHeader from './Components/Header/TaxHeader.tsx';
import TaxFooter from './Components/Footer/TaxFooter.tsx';
import Home from './Components/Home/Home.tsx';
import Results from './Components/Results/Results.tsx';
import UserLogInForm from './Components/User/UserLogInForm.tsx';
import UserRegisterForm from './Components/User/UserRegisterForm.tsx';
import UserInfo from './Components/User/UserInfo.tsx';

import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { selectCurrentFirstName, selectCurrentLastName, selectCurrentSSN, setCredentials, setName } from './Slices/AuthSlicer.tsx';
import api from './api/axiosConfig'
import ErrorPage from './Components/Home/ErrorPage.tsx';



function App() {

    const dispatch = useDispatch();
    const ssn = useSelector(selectCurrentSSN)

    useEffect(()=>{
        console.log(ssn)
        if(!ssn){
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
    },[ssn]);

    return(
            <Router>
                <div className='app-container '>
                    <TaxHeader/>
                    <div className='content'>
                    <main id="main-content" >
                        <div >

                            <Routes>
                                <Route path='/' element={<Home/>}></Route>
                                <Route path='/home' element={<Home/>}></Route>
                                <Route path='/calculate' element={<W2Page/>}></Route>
                                <Route path='/results' element={<Results/>}></Route>
                                <Route path='/userInfo' element={<UserInfo/>}></Route>
                                <Route path='/login' element={<UserLogInForm/>}></Route>
                                <Route path='/register' element={<UserRegisterForm/>}></Route>
                            </Routes>

                        </div>
                    
                    </main>
                    </div>
                    <TaxFooter/>
                </div>
            </Router>
    )


}

export default App
