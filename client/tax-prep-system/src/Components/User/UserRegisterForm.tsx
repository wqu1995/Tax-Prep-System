import { Button, ErrorMessage, Fieldset, Form, Grid, GridContainer, Label, Select, TextInput } from '@trussworks/react-uswds'
import React, {useState, useEffect, useReducer} from 'react'
import api from '../../api/axiosConfig'

import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Slices/AuthSlicer';
import { UserActionType, UserInfoType } from '../../types/CustomTypes';

function UserRegisterForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [showSSN, setShowSSN] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [ssn, setSsn] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [registerError, setRegisterError] = useState('');

    const InitUserInfo = {
        firstName : '',
        lastName : '',
        phone : '',
        streetAddr : '',
        city : '',
        state : '',
        zip : '',
        status : '',
    }

    const userInfoReducer = (state: UserInfoType, action: UserActionType) =>{
        switch(action.type) {
            case 'setFirst':
                return {...state, firstName : action.value};
            case 'setLast':
                return {...state, lastName : action.value};
            case 'setPhone':
                return {...state, phone : action.value};
            case 'setAddr':
                return {...state, streetAddr : action.value};
            case 'setCity':
                return {...state, city : action.value};
            case 'setState':
                return {...state, state : action.value};
            case 'setZip':
                return {...state, zip : action.value};
            case 'setStatus':
                return {...state, status : action.value};
            default:
                return state;
        }
    }

    const [userInfo, userInfoDispatch] = useReducer(userInfoReducer, InitUserInfo)

    const [registerationSuccess, setRegisterationSuccess] = useState(false);

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
            setRegisterationSuccess(true);
        }).catch((error) =>{
            setRegisterError(error.response.data);
        })
    }

    const handleUserInfoSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const updatePayload = {
            social : ssn,
            ...userInfo
        }
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        console.log(updatePayload)
        console.log(localStorage.getItem('token'))
        api.put("/users/updateUser", updatePayload, {headers}).then((response) =>{
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
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
            <main id="main-content" >
                <div className='bg-base-lightest' >
                    <GridContainer className="usa-section">
                        <Grid row className="margin-x-neg-205 flex-justify-center">
                            <Grid col={12} tablet={{col:8}} desktop={{col:8}} mobileLg={{col:10}} className="padding-x-205 margin-bottom-4">
                                {!registerationSuccess ? (
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
                                    
                                ) :( 
                                    <div className='bg-white padding-y-3 padding-x-5 border border-base-lighter'>
                                    <h1 className='margin-bottom-0'>Personal Infomation</h1>
                                    <Form onSubmit={handleUserInfoSubmit}>
                                        <Fieldset legend="Please tell us about you">
                                            <p>
                                                <abbr title='required' className='usa-hint usa-hint--required'>*</abbr>{' '}
                                                indicates a required field.
                                            </p>

                                            <Label htmlFor="firstName">First Name {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                value = {userInfo.firstName}
                                                onChange={(e) => userInfoDispatch({type: 'setFirst', value: e.target.value})}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="lastName">Last Name {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                value = {userInfo.lastName}
                                                onChange={(e) => userInfoDispatch({type: 'setLast', value: e.target.value})}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="streetAddr">Street Address {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="streetAddr"
                                                name="streetAddr"
                                                type="text"
                                                value = {userInfo.streetAddr}
                                                onChange={(e) => userInfoDispatch({type: 'setAddr', value: e.target.value})}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="city">City {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="city"
                                                name="city"
                                                type="text"
                                                value = {userInfo.city}
                                                onChange={(e) => userInfoDispatch({type: 'setCity', value: e.target.value})}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="state">State {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="state"
                                                name="state"
                                                type="text"
                                                value = {userInfo.state}
                                                onChange={(e) => userInfoDispatch({type: 'setState', value: e.target.value})}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="zip">Zip Code {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="zip"
                                                name="zip"
                                                type="text"
                                                value = {userInfo.zip}
                                                onChange={(e) => userInfoDispatch({type: 'setZip', value: e.target.value})}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="phone">Phone Number {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <TextInput
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                value = {userInfo.phone}
                                                onChange={(e) => userInfoDispatch({type: 'setPhone', value: e.target.value})}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="status">Tax filling Status {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                            <Select id="status" name = "status"
                                            onChange={(e) => userInfoDispatch({type: 'setStatus', value: e.target.value})}>
                                                <React.Fragment key=".0">
                                                    <option>
                                                    - Select -{' '}
                                                    </option>
                                                    <option value="S">
                                                    Single
                                                    </option>
                                                    <option value="MJ">
                                                    Married Joint
                                                    </option>
                                                    <option value="MS">
                                                    Married Separate
                                                    </option>
                                                </React.Fragment>
                                            </Select>

                                            <Button type='submit'>Submit!</Button>
                                        </Fieldset>
                                    </Form>
                                </div>
                                )}
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </main>
        </div>
    )
}

export default UserRegisterForm