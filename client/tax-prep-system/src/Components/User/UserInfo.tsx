import React, {useState, useEffect, useReducer} from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentSSN} from '../../Slices/AuthSlicer';
import api from '../../api/axiosConfig'
import { Button, ErrorMessage, Form, Grid, GridContainer, Label, Select, TextInput } from '@trussworks/react-uswds';
import { UserAction, UserActionType, UserDto, UserInfoType } from '../../types/CustomTypes';
import ErrorPage from '../Home/ErrorPage';
import { useTranslation } from 'react-i18next';


//page to display user's personal information
function UserInfo() {
    const {t} = useTranslation();
    const userSSN = useSelector(selectCurrentSSN);

    const initUserInfo: UserDto = {
        social: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        streetAddr: '',
        city: '',
        state: '',
        zip: '',
        status: ''
    }

    //reducer to update user info
    const userInfoReducer = (state: UserDto, action:UserAction) =>{
        switch(action.type) {
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
            case 'set':
                return action.value;
            case 'reset':
                return initUserInfo;
            default:
                return state;
        }
    }

    const [userInfo, userInfoDispatch] = useReducer(userInfoReducer, initUserInfo)
    const [defaultInfo, setDefaultInfo] = useState(initUserInfo)
    const [enableEdit, setEnableEdit] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState('');

    useEffect(() =>{
        if(userSSN!==null){
            api.get(`/users/user/${userSSN}`).then((Response) =>{
                setDefaultInfo(Response.data)
                userInfoDispatch({type: 'set', value: Response.data})
                console.log(userInfo)
            }).catch((error)=>{
                console.log(error)
            })
        }
    }, [userSSN])

    useEffect(()=>{
        userInfoDispatch({type: 'set', value: defaultInfo});
        if(enableEdit){

            setUpdateSuccess('');
        }
    }, [enableEdit])


    //update user info
    const handleUserInfoSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        api.put("/users/updateUser", userInfo).then((response) =>{
            setDefaultInfo(response.data)
            setEnableEdit(false)
            userInfoDispatch({type: 'set', value: response.data})
            setUpdateSuccess(t('updateSuccessUserInfo'))
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div>
            {userSSN ? (
                <div className='usa-section'>
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs__main desktop:grid-col-9 usa-prose usa-layout-docs" id="main-content">
                            <h1>{t('Welcome')} {userInfo.firstName} {userInfo.lastName}</h1>
                            
                            <h3>{t('personalInfo')}</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div>
                                    <Button className='usa-button--outline' type='button' onClick={()=>setEnableEdit(!enableEdit)}>{enableEdit? t('cancel') : t('Edit')}</Button>
                                </div>
                                <div>
                                    {updateSuccess && <ErrorMessage>{updateSuccess}</ErrorMessage>}
                                </div>
                            </div>
                            <Form onSubmit={handleUserInfoSubmit}>
                                <div style={{display: 'flex', gap : '16px'}}>
                                    <div>
                                        <Label htmlFor='firstName'>{t('firstNameLabel')}</Label>
                                        <TextInput
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={userInfo.firstName}
                                            autoCapitalize='off'
                                            autoCorrect='off'
                                            disabled={true}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='lastName'>{t('lastNameLabel')}</Label>
                                        <TextInput
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={userInfo.lastName}
                                            autoCapitalize='off'
                                            autoCorrect='off'
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div>
                                        <Label htmlFor='streetAddr'>{t('streetLabel')}</Label>
                                        <TextInput
                                            id="streetAddr"
                                            name="streetAddr"
                                            type="text"
                                            value={userInfo.streetAddr}
                                            onChange={(e) => userInfoDispatch({type: 'setAddr', value: e.target.value})}
                                            autoCapitalize='off'
                                            autoCorrect='off'
                                            disabled={!enableEdit}
                                        />
                                </div>
                                <div style={{display: 'flex', gap : '16px'}}>
                                    <div>
                                        <Label htmlFor='city'>{t('cityLabel')}</Label>
                                        <TextInput
                                            id="city"
                                            name="city"
                                            type="text"
                                            value={userInfo.city}
                                            onChange={(e) => userInfoDispatch({type: 'setCity', value: e.target.value})}
                                            autoCapitalize='off'
                                            autoCorrect='off'
                                            disabled={!enableEdit}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='state'>{t('stateLabel')}</Label>
                                        <TextInput
                                            id="state"
                                            name="state"
                                            type="text"
                                            value={userInfo.state}
                                            onChange={(e) => userInfoDispatch({type: 'setState', value: e.target.value})}
                                            autoCapitalize='off'
                                            autoCorrect='off'
                                            disabled={!enableEdit}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='zip'>{t('zipLabel')}</Label>
                                        <TextInput
                                            id="zip"
                                            name="zip"
                                            type="text"
                                            value={userInfo.zip}
                                            onChange={(e) => userInfoDispatch({type: 'setZip', value: e.target.value})}
                                            autoCapitalize='off'
                                            autoCorrect='off'
                                            disabled={!enableEdit}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor='phone'>{t('phoneLabel')}</Label>
                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={userInfo.phone}
                                        onChange={(e) => userInfoDispatch({type: 'setPhone', value: e.target.value})}
                                        autoCapitalize='off'
                                        autoCorrect='off'
                                        disabled={!enableEdit}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor='status'>{t('fillingStatusLabel')}</Label>
                                    <Select id="status" name="status" value={userInfo.status}
                                    onChange={(e) => userInfoDispatch({type: 'setStatus', value: e.target.value})}
                                    disabled={!enableEdit}
                                    >
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
                                <div style={{ display: 'flex'}}>
                                    {enableEdit && <Button type='submit' >{t('submitBtn')}</Button>}
                                </div>
                            </Form>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
            ) : (
                <ErrorPage errorCode={401}/>
            )}
        </div>

    )
}

export default UserInfo