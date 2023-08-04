import { Button, Fieldset, Form, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds'
import React from 'react'

function UserRegisterForm() {
    return (
        <div>
            <main id="main-content">
                <div className='bg-base-lightest'>
                    <GridContainer className="usa-section">
                        <Grid row className="margin-x-neg-205 flex-justify-center">
                            <Grid col={12} tablet={{col:8}} desktop={{col:8}} mobileLg={{col:10}} className="padding-x-205 margin-bottom-4">

                                <div className='bg-white padding-y-3 padding-x-5 border border-base-lighter'>
                                    <h1 className='margin-bottom-0'>Create account</h1>
                                    <Form>
                                        <Fieldset legend="Get started with an account">
                                            <p>
                                                <abbr title='required' className='usa-hint usa-hint--required'>*</abbr>{' '}
                                                indicates a required field.
                                            </p>

                                            <Label htmlFor="email">Email address {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="password-create-account">Create password {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="password-create-account"
                                                name="password"
                                                type="password"
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="password-create-account-confirm">Re-type password {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="password-create-account-confirm"
                                                name="password"
                                                type="password"
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Button type='submit'>Create account</Button>
                                        </Fieldset>
                                    </Form>
                                </div>
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </main>
        </div>
    )
}

export default UserRegisterForm