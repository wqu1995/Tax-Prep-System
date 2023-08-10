import { Button, Fieldset, Form, Grid, GridContainer, Label, Link, TextInput } from '@trussworks/react-uswds'
import React, {useState, useEffect} from 'react'
import api from '../../api/axiosConfig'
import { useDispatch } from 'react-redux';
import { setCredentials, setName } from '../../Slices/AuthSlicer';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function UserLogInForm() {
    const {t} = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() =>{
        setErrMsg('');
    },[username, password])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const loginPayload = {username, password}

        api.post("/users/login", loginPayload).then((resposne)=>{
            console.log(resposne.data)
            const {ssn, firstName, lastName} = resposne.data
            dispatch(setCredentials({ssn}));
            dispatch(setName({firstName, lastName}));
            //localStorage.setItem("token", accessToken);
            setUsername('')
            setPassword('')
            navigate('/')
        }).catch((error) =>{
            console.log(error);
        })
    }

    return (
        <div>
                        <GridContainer className="usa-section">
                            <Grid row={true} className="flex-justify-center">
                                <Grid col={12} tablet={{col:8}} desktop={{col:6}}>
                                    <div className='bg-white padding-y-3 padding-x-5 border border-base-lighter'>
                                        <p>{errMsg}</p>
                                        <h1 className='margin-bottom-0'>{t('signin')}</h1>
                                        <Form onSubmit={handleSubmit}>
                                            <Fieldset legend={t('signinTooltip')} legendStyle="default">
                                                <Label htmlFor="username">{t('emailLabel')}</Label>
                                                <TextInput
                                                    id="username"
                                                    name="username"
                                                    type="email"
                                                    value = {username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    autoCorrect="off"
                                                    autoCapitalize="off"
                                                    required={true}
                                                    />

                                                <Label htmlFor="password">{t('passwordLabel')}</Label>
                                                <TextInput
                                                    id="password"
                                                    name="password"
                                                    type='password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    autoCorrect="off"
                                                    autoCapitalize="off"
                                                    required={true}
                                                    />
                                                
                                                <Button type="submit">{t('signin')}</Button>
                                                
                                            </Fieldset>
                                        </Form>
                                    </div>
                                    <p className="text-center">
                                        {t('noAcc')}
                                        <Link href="#" onClick={()=>navigate('/register')}>{t('createAcc')}</Link>
                                        .
                                    </p>
                                </Grid>
                            </Grid>
                        </GridContainer>
                    </div>
    )
}

export default UserLogInForm