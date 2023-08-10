import { Header, Title, NavMenuButton, PrimaryNav, NavDropDownButton, Menu} from '@trussworks/react-uswds'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { selectCurrentFirstName, selectCurrentLastName, setCredentials, setName } from '../../Slices/AuthSlicer';

import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import api from '../../api/axiosConfig'

function TaxHeader() {

    const currentFirstName = useSelector(selectCurrentFirstName);
    const currentLastName = useSelector(selectCurrentLastName);

    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const toggleMobileNav = (): void => {
        setMobileNavOpen((prevOpen) => !prevOpen)
    }

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const changeLanguage = (lng: string | undefined) =>{
        i18n.changeLanguage(lng);
        handleToggleNavDropdown(1);
    }

    const handleLogout = () =>{
        handleToggleNavDropdown(0);
        api.post("/users/logout").then((resposne)=>{
            console.log("logout success")
            dispatch(setCredentials({ssn : null}))
            dispatch(setName({firstName:null, lastName:null}))
            navigate('/');
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(() =>{
    },[currentFirstName, currentLastName])

    const navigate = useNavigate();
    const [navDropdownOpen, setNavDropdownOpen] = useState([false, false])
    const handleToggleNavDropdown = (index: number): void => {
        setNavDropdownOpen((prevNavDropdownOpen) => {
          const newOpenState = Array(prevNavDropdownOpen.length).fill(false)
          
          newOpenState[index] = !prevNavDropdownOpen[index]
          return newOpenState
        })
      }


    const primaryNavItems = [
        (currentFirstName && currentLastName) && (
            <React.Fragment key="primaryNav_0">
                <NavDropDownButton
                    menuId='extended-nav-section-one'
                    isOpen={navDropdownOpen[0]}
                    label={currentFirstName+" "+currentLastName}
                    onToggle={() =>{handleToggleNavDropdown(0)}}
                    
                />
                <Menu
                    id="extended-nav-section-one"
                    items = {[
                        <Link to="/userInfo" onClick={()=>handleToggleNavDropdown(0)}>{t('aboutMe')}</Link>,
                        <Link to="/financialInfo" onClick={()=>handleToggleNavDropdown(0)}>{t('myTaxDoc')}</Link>,
                        <Link to="/results" onClick={()=>handleToggleNavDropdown(0)}>{t('result')}</Link>,
                        <Link to="#" onClick={()=> handleLogout()}>{t('logout')}</Link>
                    ]}
                    isOpen={navDropdownOpen[0]}
                />
            </React.Fragment>
        ),
        <React.Fragment key="primaryNav_1">
            <NavDropDownButton
                menuId='extended-nav-section-two'
                isOpen={navDropdownOpen[1]}
                label="Language"
                onToggle={() =>{handleToggleNavDropdown(1)}}
            />
            <Menu
                id="extended-nav-section-one"
                items = {[
                    <Link to="#" onClick={() => changeLanguage('en')}>
                        {t('english')}
                    </Link>,
                    <Link to="#" onClick={() => changeLanguage('cn')}>
                        {t('chinese')}
                    </Link>
                ]}
                isOpen={navDropdownOpen[1]}
            />
        </React.Fragment>

        
    ]

    return(
            <Header basic className='bg-base-lighter'>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title id="basic-logo">
                        <Link to="/" title="Home" aria-label="Home">
                            {t('title')}
                        </Link>
                        </Title>
                        <NavMenuButton
                        label="Menu"
                        onClick={toggleMobileNav}
                        className="usa-menu-btn"
                        />
                    </div>
                <PrimaryNav
                    aria-label="Primary navigation"
                    items={primaryNavItems}
                    onToggleMobileNav={toggleMobileNav}
                    mobileExpanded={mobileNavOpen}
                    >
                </PrimaryNav>
                </div>
            </Header>
        
    )
}

export default TaxHeader