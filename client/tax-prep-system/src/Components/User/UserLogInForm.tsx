import { Button, Fieldset, Form, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds'
import React, {useState, useEffect} from 'react'
import api from '../../api/axiosConfig'
import { useDispatch } from 'react-redux';
import { setCredentials, setName } from '../../Slices/AuthSlicer';
import { useNavigate } from 'react-router-dom';

function UserLogInForm() {
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
            navigate('/userInfo')
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
                                        <h1 className='margin-bottom-0'>Sign in</h1>
                                        <Form onSubmit={handleSubmit}>
                                            <Fieldset legend="To use the tool" legendStyle="default">
                                                <Label htmlFor="username">Email address</Label>
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

                                                <Label htmlFor="password">Password</Label>
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
                                                
                                                <Button type="submit">Sign in</Button>
                                            </Fieldset>
                                        </Form>
                                    </div>
                                </Grid>
                            </Grid>
                        </GridContainer>
                    </div>
    )
}

export default UserLogInForm