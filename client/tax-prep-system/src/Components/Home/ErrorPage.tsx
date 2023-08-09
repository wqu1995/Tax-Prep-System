import { Button, ButtonGroup, Grid, GridContainer } from '@trussworks/react-uswds'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function ErrorPage({errorCode} : any) {
    const navigate = useNavigate();
    return (
        <div className='usa-section'>
            <GridContainer>
                <Grid row gap>
                    <main className="usa-layout-docs__main desktop:grid-col-9 usa-prose usa-layout-docs"
                    id="main-content">
                        <h1>Page not found</h1>

                        <p className="usa-intro">
                            We’re sorry, we can’t find the page you&apos;re looking for. It
                            might have been removed, changed its name, or is otherwise
                            unavailable.
                        </p>

                        <p>
                            Visit our homepage for helpful tools and resources, or contact
                            us and we’ll point you in the right direction.
                        </p>

                        <div className="margin-y-5">
                            <ButtonGroup>
                            <Button type="button"onClick={()=>{navigate("/")}}>Visit homepage</Button>

                            </ButtonGroup>
                        </div>

                        <p className="text-base">
                            <strong>Error code:</strong> {errorCode}
                        </p>
                    </main>
                </Grid>
            </GridContainer>
        </div>
    )
}

export default ErrorPage