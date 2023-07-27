import { Header, Title, NavMenuButton, PrimaryNav, Search, NavDropDownButton, Menu} from '@trussworks/react-uswds'
import React, { useState } from 'react'

function TaxHeader() {

    const [expanded, setExpanded] = useState(false)
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded)

  const testMenuItems = [
    <a href="#linkOne" key="one">
      Current link
    </a>,
    <a href="#linkTwo" key="two">
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
    <a href="#two" key="two" className="usa-nav__link">
      <span>Parent link</span>
    </a>,
    <a href="#three" key="three" className="usa-nav__link">
      <span>Parent link</span>
    </a>,
  ]

    return(
        <Header basic={true}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>Project Title</Title>
            <NavMenuButton onClick={onClick} label="Menu" />
          </div>
          <PrimaryNav
            items={testItemsMenu}
            mobileExpanded={expanded}
            onToggleMobileNav={onClick}>
            <Search size="small" onSubmit={onClick} />
          </PrimaryNav>
        </div>
      </Header>
    )
}

export default TaxHeader