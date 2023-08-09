import { Header, Title, NavMenuButton, PrimaryNav, Search, NavDropDownButton, Menu, Icon, GridContainer, Grid} from '@trussworks/react-uswds'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { selectCurrentFirstName, selectCurrentLastName, selectCurrentSSN, setCredentials, setName } from '../../Slices/AuthSlicer';

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

    const handleNav = (dest:string) =>{
        handleToggleNavDropdown(0);
        navigate(dest);
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

    const [expanded, setExpanded] = useState(false)
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded)

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
                        <a href="#" onClick={()=> handleNav('/userInfo')}>About Me</a>,
                        <a href="#" onClick={()=> handleNav('/results')}>Results</a>,
                        <a href="#" onClick={()=> handleLogout()}>Log out</a>
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
                    <a href="#" onClick={()=> changeLanguage('en')}>English</a>,
                    <a href="#" onClick={()=> changeLanguage('cn')}>Chinese</a>
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
                        <a href="/" title="Home" aria-label="Home">
                            {t('title')}
                        </a>
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