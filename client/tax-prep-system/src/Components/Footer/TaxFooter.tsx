import { useTranslation } from 'react-i18next';
import { Address, Footer, Grid, Logo } from '@trussworks/react-uswds';
import clownToyImage from '../../assets/simple-calculator-01.svg';

function TaxFooter() {
    const footerPrimary = (<div></div>)
    const footerSecondary = (
        <>
        <Grid row gap>
          <Logo
            size="medium"
            image={<img className="usa-footer__logo-img" src={clownToyImage} alt="" />}
          />
          <Grid className="usa-footer__contact-links" mobileLg={{ col: 6 }}>
            <h3 className="usa-footer__contact-heading">Skillstorm LLC</h3>
            <Address
              size="medium"
              items={[
                <a key="telephone" href="tel:1-800-555-5555">
                  (800) CALL-ASAP
                </a>,
                <a key="email" href="mailto:info@agency.gov">
                  amakiyama@skillstorm.com
                </a>,
              ]}
            />
          </Grid>
        </Grid>
      </>
    )
    
    return (
        <Footer 
        primary={footerPrimary}
        secondary={footerSecondary}/>
    )
}

export default TaxFooter