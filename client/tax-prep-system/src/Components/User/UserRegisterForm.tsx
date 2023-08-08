import { Button, ErrorMessage, Fieldset, Form, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds'
import React, {useState, useEffect} from 'react'
import api from '../../api/axiosConfig'

import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Slices/AuthSlicer';

function UserRegisterForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [showSSN, setShowSSN] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [ssn, setSsn] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [registerError, setRegisterError] = useState('');

    const dispatch = useDispatch();
    

    const handleRegisterSubmit =  (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const registerPayload = {
            social : ssn,
            email : email,
            password : password,
            role : 'ROLE_USER'
        }

        api.post("/users/newUser", registerPayload).then((resposne)=>{
            const {accessToken, ssn} = resposne.data
            dispatch(setCredentials({ssn}));
            localStorage.setItem("token", accessToken);
        }).catch((error) =>{
            setRegisterError(error.response.data);
        })
    }

    useEffect(() => {
        if (password !== '' && passwordConfirm!=='' && password !== passwordConfirm) {
          setErrMsg("Password does not match");
        } else {
          setErrMsg('');
        }
        setRegisterError('');
      }, [password, passwordConfirm, email, ssn]);

    return (
        <div>
            <main id="main-content">
                <div className='bg-base-lightest'>
                    <GridContainer className="usa-section">
                        <Grid row className="margin-x-neg-205 flex-justify-center">
                            <Grid col={12} tablet={{col:8}} desktop={{col:8}} mobileLg={{col:10}} className="padding-x-205 margin-bottom-4">

                                <div className='bg-white padding-y-3 padding-x-5 border border-base-lighter'>
                                    <h1 className='margin-bottom-0'>Create account</h1>
                                    <Form onSubmit={handleRegisterSubmit}>
                                        <Fieldset legend="Get started with an account">
                                            <p>
                                                <abbr title='required' className='usa-hint usa-hint--required'>*</abbr>{' '}
                                                indicates a required field.
                                            </p>

                                            <ErrorMessage>{registerError}</ErrorMessage>

                                            <Label htmlFor="email">Email address {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="email"
                                                name="email"
                                                type="email"
                                                value = {email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="password-create-account">Password {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="password-create-account"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value = {password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <p className='usa-form__note'>
                                                <a
                                                    title='Show passowrd'
                                                    className='usa-show-password'
                                                    aria-controls='password-create-account password-create-account-confirm'
                                                    onClick={(): void => setShowPassword((showPassword) => ! showPassword)}>
                                                        {showPassword ? 'Hide password' : 'Show passowrd'}
                                                    </a>
                                            </p>

                                            <Label htmlFor="password-create-account-confirm">Re-type password {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="password-create-account-confirm"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value = {passwordConfirm}
                                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <ErrorMessage>{errMsg}</ErrorMessage>

                                            <Label htmlFor="ssn">Social Security Number {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="ssn"
                                                name="password"
                                                type={showSSN ? 'text' : 'password'}
                                                value = {ssn}
                                                onChange={(e) => setSsn(e.target.value)}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />
                                            <p className='usa-form__note'>
                                                <a
                                                    title='Show ssn'
                                                    className='usa-show-password'
                                                    aria-controls='ssn'
                                                    onClick={(): void => setShowSSN((showSSN) => ! showPassword)}>
                                                        {showSSN ? 'Hide SSN' : 'Show SSN'}
                                                    </a>
                                            </p>

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