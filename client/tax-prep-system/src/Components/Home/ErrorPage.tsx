import { Button, ButtonGroup, Grid, GridContainer } from '@trussworks/react-uswds'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function ErrorPage({errorCode} : any) {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return (
        <div className='usa-section'>
            <GridContainer>
                <Grid row gap>
                    <main className="usa-layout-docs__main desktop:grid-col-9 usa-prose usa-layout-docs"
                    id="main-content">
                        <h1>{t('title')}</h1>

                        <p className="usa-intro">
                        {t('pageNotFoundMsg1')}
                        </p>

                        <p>
                        {t('pageNotFoundMsg2')}
                        </p>

                        <div className="margin-y-5">
                            <ButtonGroup>
                            <Button type="button"onClick={()=>{navigate("/")}}>{t('visitHomeBtn')}</Button>

                            </ButtonGroup>
                        </div>

                        <p className="text-base">
                            <strong>{t('errorCode')}</strong> {errorCode}
                        </p>
                    </main>
                </Grid>
            </GridContainer>
        </div>
    )
}

export default ErrorPage