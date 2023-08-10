import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { selectCurrentFirstName, selectCurrentLastName, selectCurrentSSN, setCredentials, setName } from '../../Slices/AuthSlicer';
import { Button, Grid, GridContainer } from '@trussworks/react-uswds';
import { useNavigate, Link } from 'react-router-dom';

import api from '../../api/axiosConfig'


function Home() {
    const navigate = useNavigate();

    const currentFirstName = useSelector(selectCurrentFirstName);
    const currentLastName = useSelector(selectCurrentLastName);

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() =>{
        if(currentFirstName && currentLastName){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    },[currentFirstName, currentLastName])

    const handleSubmit = (e:any) =>{
        navigate('/userInfo')
    }
    return (
        <main id="main-content">
        <section className="custome-usa-hero" aria-label="Introduction">
          <GridContainer>
            <div className="usa-hero__callout">
              <h1 className="usa-hero__heading">
                <span className="usa-hero__heading--alt">Tax Preparation System</span>
                Tax Confidence, Calculated
              </h1>
              {isLogin ? (
                <div>
                    <p>
                    Welcome back {currentFirstName} {currentLastName}! How can we help you today?
                    </p>
                    <Link className="usa-button" to="/userInfo">
                        Personal
                        </Link>
                    <Link className="usa-button" to="/results">
                        Financial
                    </Link>
                </div>
                    
                ) : (
                    <div>
                    <p>
                        Use this tool to get yourself prepared for the incoming tax season.<br />
                        Sign in or register to start!
                    </p>
                    <Link className="usa-button" to="/login">
                        Sign in
                        </Link>
                    <Link className="usa-button" to="/register">
                        Sign up
                    </Link>
                    </div>
                )}

            </div>
          </GridContainer>
        </section>

        <section className="grid-container usa-section">
          <Grid row gap>
            <Grid tablet={{ col: 4 }}>
              <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
               One Calculation at a Time: Your Path to Accurate Tax Insights!
              </h2>
            </Grid>
            <Grid tablet={{ col: 8 }} className="usa-prose">
              <p>
              Simplify tax season like never before with our intuitive web-based application. 
              Say goodbye to the headache of manual calculations and complex forms. 
              Our platform lets you effortlessly enter your W-2 and 1099 details, 
              while our advanced algorithms handle the number crunching, instantly 
              computing your projected tax return.
              </p>
              <p>
              But we're more than just calculations. With Tax Preparation System your financial peace of mind is our priority. 
              Your data is securely stored in our database, 
              giving you the freedom to access and modify your information whenever you need. 
              Our user-friendly interface ensures that you stay in control, every step of the way.
              </p>
            </Grid>
          </Grid>
        </section>
        </main>
    )
}

export default Home