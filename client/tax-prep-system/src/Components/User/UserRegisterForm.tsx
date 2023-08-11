import { Button, ErrorMessage, Fieldset, Form, Grid, GridContainer, Label, Select, TextInput } from '@trussworks/react-uswds'
import React, {useState, useEffect, useReducer} from 'react'
import api from '../../api/axiosConfig'

import { useDispatch } from 'react-redux';
import { setCredentials, setName } from '../../Slices/AuthSlicer';
import { UserActionType, UserInfoType } from '../../types/CustomTypes';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


//user register page
function UserRegisterForm() {
    const {t} = useTranslation();

    const [showPassword, setShowPassword] = useState(false)
    const [showSSN, setShowSSN] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [ssn, setSsn] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [registerError, setRegisterError] = useState('');

    const navigate = useNavigate();

    const initUserInfo = {
        firstName : '',
        lastName : '',
        phone : '',
        streetAddr : '',
        city : '',
        state : '',
        zip : '',
        status : '',
    }


    //reducer to update user info
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
            case 'reset':
                return initUserInfo
            default:
                return state;
        }
    }

    const [userInfo, userInfoDispatch] = useReducer(userInfoReducer, initUserInfo)

    const [registerationSuccess, setRegisterationSuccess] = useState(false);

    const dispatch = useDispatch();

    const cleanUp = () =>{
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
        setSsn('')
        setErrMsg('')
        setRegisterError('')
        userInfoDispatch({type: 'reset', value: ''});
    }
    

    //attempt to register user in the backend 
    const handleRegisterSubmit =  (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const registerPayload = {
            social : ssn,
            email : email,
            password : password,
            role : 'ROLE_USER'
        }

        api.post("/users/register", registerPayload).then((resposne)=>{
            const {ssn} = resposne.data
            dispatch(setCredentials({ssn}));
            setRegisterationSuccess(true);
        }).catch((error) =>{
            setRegisterError(error.response.data);
        })
    }

    //attempt to update user's personal information
    const handleUserInfoSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const updatePayload = {
            social : ssn,
            ...userInfo
        }

        api.put("/users/updateUser", updatePayload).then((response) =>{
            const {firstName, lastName} = response.data
            dispatch(setName({firstName, lastName}))
            console.log(response.data)
            cleanUp();
            navigate('/calculate');
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(() => {
        if (password !== '' && passwordConfirm!=='' && password !== passwordConfirm) {
          setErrMsg(t('passMismatch'));
        } else {
          setErrMsg('');
        }
        setRegisterError('');
      }, [password, passwordConfirm, email, ssn]);

    return (
        <div>
                    <GridContainer className="usa-section">
                        <Grid row className="margin-x-neg-205 flex-justify-center">
                            <Grid col={12} tablet={{col:8}} desktop={{col:8}} mobileLg={{col:10}} className="padding-x-205">
                                {!registerationSuccess ? (
                                    <div className='bg-white padding-y-3 padding-x-5 border border-base-lighter'>
                                        <h1 className='margin-bottom-0'>{t('createAcc2')}</h1>
                                        <Form onSubmit={handleRegisterSubmit}>
                                            <Fieldset legend={t('createAccTooltip')}>
                                                <p>
                                                    <abbr title='required' className='usa-hint usa-hint--required'>*</abbr>{' '}
                                                    {t('requiredFields')}
                                                </p>

                                                <ErrorMessage>{registerError}</ErrorMessage>

                                                <Label htmlFor="email">{t('emailLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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

                                                <Label htmlFor="password-create-account">{t('passwordLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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
                                                            {showPassword ? t('hidePass') : t('showPass')}
                                                        </a>
                                                </p>

                                                <Label htmlFor="password-create-account-confirm">{t('passConfirm')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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

                                                <Label htmlFor="ssn">{t('ssnLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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
                                                            {showSSN ? t('hideSSN') : t('showSSN')}
                                                        </a>
                                                </p>

                                                <Button type='submit'>{t('createAccBtn')}</Button>
                                            </Fieldset>
                                        </Form>
                                    </div>
                                    
                                ) :( 
                                    <div className='bg-white padding-y-3 padding-x-5 border border-base-lighter'>
                                    <h1 className='margin-bottom-0'>{t('personalInfoLabel')}</h1>
                                    <Form onSubmit={handleUserInfoSubmit}>
                                        <Fieldset legend={t('personalInfoToolTip')}>
                                            <p>
                                                <abbr title='required' className='usa-hint usa-hint--required'>*</abbr>{' '}
                                                {t('requiredFields')}
                                            </p>

                                            <div style={{ display: 'flex', gap: '16px' }}>
                                                <div>
                                                    <Label htmlFor="firstName">{t('firstNameLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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
                                                </div>
                                                <div>
                                                    <Label htmlFor="lastName">{t('lastNameLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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
                                                </div>
                                            </div>



                                            <Label htmlFor="streetAddr">{t('streetLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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
                                            <div style={{ display: 'flex', gap: '16px' }}>
                                                <div>
                                                    <Label htmlFor="city">{t('cityLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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
                                                </div>
                                                <div>
                                                    <Label htmlFor="state">{t('stateLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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
                                                </div>
                                                <div>
                                                    <Label htmlFor="zip">{t('zipLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '16px' }}>
                                                <div>
                                                    <Label htmlFor="phone">{t('phoneLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
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
                                                </div>
                                                <div>
                                                    <Label htmlFor="status">{t('fillingStatusLabel')} {' '}<abbr title='required' className='usa-label--required'>*</abbr></Label>
                                                    <Select id="status" name = "status"
                                                    onChange={(e) => userInfoDispatch({type: 'setStatus', value: e.target.value})}>
                                                        <React.Fragment key=".0">
                                                            <option>
                                                            - {t('status1')} -{' '}
                                                            </option>
                                                            <option value="S">
                                                            {t('status2')}
                                                            </option>
                                                            <option value="MJ">
                                                            {t('status3')}
                                                            </option>
                                                            <option value="MS">
                                                            {t('status4')}
                                                            </option>
                                                        </React.Fragment>
                                                    </Select>
                                                </div>
                                            </div>
                                            <Button type='submit'>{t('submitBtn')}!</Button>
                                        </Fieldset>
                                    </Form>
                                </div>
                                )}
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
    )
}

export default UserRegisterForm