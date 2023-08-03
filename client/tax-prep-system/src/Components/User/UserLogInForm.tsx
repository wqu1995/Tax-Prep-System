import { Button, Fieldset, Form, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds'
import React, {useState} from 'react'

function UserLogInForm() {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div>
            <main id="main-content">
                <main id="main-content">
                    <div className='bg-base-lightest'>
                        <GridContainer className="usa-section">
                            <Grid row={true} className="flex-justify-center">
                                <Grid col={12} tablet={{col:8}} desktop={{col:6}}>
                                    <div className='bg-white padding-y-3 padding-x-5 border border-base-lighter'>
                                        <h1 className='margin-bottom-0'>Sign in</h1>
                                        <Form>
                                            <Fieldset legend="To use the tool" legendStyle="median">
                                                <Label htmlFor="email">Email address</Label>
                                                <TextInput
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoCorrect="off"
                                                    autoCapitalize="off"
                                                    required={true}
                                                    />

                                                <Label htmlFor="email">Password</Label>
                                                <TextInput
                                                    id="password-sign-in"
                                                    name="password"
                                                    type='password'
                                                    autoCorrect="off"
                                                    autoCapitalize="off"
                                                    required={true}
                                                    />
                                                
                                                <Button type="submit">Sign in</Button>
                                            </Fieldset>
                                        </Form>
                                    </div>
                                </Grid>
                            </Grid>
                        </GridContainer>
                    </div>
                </main>
            </main>
        </div>
    )
}

export default UserLogInForm