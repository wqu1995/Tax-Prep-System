import { Header, Title, NavMenuButton, PrimaryNav, Search, NavDropDownButton, Menu, Icon, GridContainer, Grid} from '@trussworks/react-uswds'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function TaxHeader() {

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
        <React.Fragment key="primaryNav_0">
            <NavDropDownButton
                menuId='extended-nav-section-one'
                isOpen={navDropdownOpen[0]}
                label="Current section"
                onToggle={() =>{handleToggleNavDropdown(0)}}
                isCurrent
            />
            <Menu
                id="extended-nav-section-one"
                items = {new Array(3).fill(<a href="#">Navigation link</a>)}
                isOpen={navDropdownOpen[0]}
            />
        </React.Fragment>,
        <React.Fragment key="primaryNav_1">
            <NavDropDownButton
                menuId='extended-nav-section-two'
                isOpen={navDropdownOpen[1]}
                label="Current section"
                onToggle={() =>{handleToggleNavDropdown(1)}}
                isCurrent
            />
            <Menu
                id="extended-nav-section-one"
                items = {new Array(3).fill(<a href="#">Navigation link</a>)}
                isOpen={navDropdownOpen[1]}
            />
        </React.Fragment>

        
    ]

    return(
        <div>
            <Header basic>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title id="basic-logo">
                        <a href="/" title="Home" aria-label="Home">
                            Tax Preparation Systems
                        </a>
                        </Title>
                        <NavMenuButton
                        label="Menu"
                        className="usa-menu-btn"
                        />
                    </div>
                <PrimaryNav
                    aria-label="Primary navigation"
                    items={primaryNavItems}
                    >
                </PrimaryNav>
                </div>
            </Header>
        
        </div>
    )
}

export default TaxHeader