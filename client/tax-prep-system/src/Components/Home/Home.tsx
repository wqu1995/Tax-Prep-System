import React, {useState, useEffect} from 'react'
import {useSelector} from "react-redux";
import { selectCurrentFirstName, selectCurrentLastName} from '../../Slices/AuthSlicer';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



function Home() {
    const {t} = useTranslation();
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

    return (
        <main id="main-content">
        <section className="custome-usa-hero" aria-label="Introduction">
          <GridContainer>
            <div className="usa-hero__callout">
              <h1 className="usa-hero__heading">
                <span className="usa-hero__heading--alt">{t('title')}</span>
                {t('slogan1')}
              </h1>
              {isLogin ? (
                <div>
                    <p>
                    {t('welcomeBack')} {currentFirstName} {currentLastName}! {t('greeting1')}
                    </p>
                    <Link className="usa-button" to="/userInfo">
                    {t('personal')}
                        </Link>
                    <Link className="usa-button" to="/results">
                    {t('financial')}
                    </Link>
                </div>
              
                    
                ) : (
                    <div>
                    <p>
                    {t('slogan2')}<br />{t('signinMsg')}
                        
                    </p>
                    <Link className="usa-button" to="/login">
                    {t('signin')}
                        </Link>
                    <Link className="usa-button" to="/register">
                    {t('signup')}
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
              {t('slogan3')}
              </h2>
            </Grid>
            <Grid tablet={{ col: 8 }} className="usa-prose">
              <p>
              {t('systemIntro1')}
              </p>
              <p>
              {t('systemIntro2')}
              </p>
            </Grid>
          </Grid>
        </section>
        </main>
    )
}

export default Home