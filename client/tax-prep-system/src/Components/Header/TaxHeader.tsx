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

  const testMenuItems = [
    <a href="#linkOne" key="one">
      Current link
    </a>,
    <a href="/review" key="two">
      Simple link Two
    </a>,
  ]

  const [isOpen, setIsOpen] = useState([false, false])

  const testItemsMenu = [
    <>
      <NavDropDownButton
        menuId="testDropDownOne"
        onToggle={(): void => {
            
        }}
        isOpen={isOpen[0]}
        label="Nav Label"
        isCurrent={true}
      />
      <Menu
        key="one"
        items={testMenuItems}
        isOpen={isOpen[0]}
        id="testDropDownOne"
      />
    </>,
    <a href="/financialInfo" key="two" className="usa-nav__link">
      <span>review</span>
    </a>,
    <a href="/review" key="three" className="usa-nav__link">
      <span>Parent link</span>
    </a>,
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
                    items={testItemsMenu}
                    >
                </PrimaryNav>
                </div>
            </Header>
        
        </div>
    )
}

export default TaxHeader