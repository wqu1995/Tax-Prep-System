import React, {useState, useEffect, useReducer} from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentSSN} from '../../Slices/AuthSlicer';
import api from '../../api/axiosConfig'
import { Button, ErrorMessage, Form, Grid, GridContainer, Label, Select, TextInput } from '@trussworks/react-uswds';
import { UserAction, UserActionType, UserDto, UserInfoType } from '../../types/CustomTypes';


function UserInfo() {
    const ssn = useSelector(selectCurrentSSN);

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

        api.get(`/users/user/${ssn}`).then((Response) =>{
            setDefaultInfo(Response.data)
            userInfoDispatch({type: 'set', value: Response.data})
            console.log(userInfo)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    useEffect(()=>{
        userInfoDispatch({type: 'set', value: defaultInfo});
        if(enableEdit){

            setUpdateSuccess('');
        }
    }, [enableEdit])

    const handleUserInfoSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        api.put("/users/updateUser", userInfo).then((response) =>{
            setDefaultInfo(response.data)
            setEnableEdit(false)
            userInfoDispatch({type: 'set', value: response.data})
            setUpdateSuccess("Update information Successfully!")
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div className='usa-section'>
            <GridContainer>
                <Grid row gap>
                    <main className="usa-layout-docs__main desktop:grid-col-9 usa-prose usa-layout-docs" id="main-content">
                        <h1>Welcome {userInfo.firstName} {userInfo.lastName}</h1>
                        <h3>Here is your personal information</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div>
                                <Button className='usa-button--outline' type='button' onClick={()=>setEnableEdit(!enableEdit)}>{enableEdit? "Cancel" : "Edit"}</Button>
                            </div>
                            <div>
                                {updateSuccess && <ErrorMessage>{updateSuccess}</ErrorMessage>}
                            </div>
                        </div>
                        <Form onSubmit={handleUserInfoSubmit}>
                            <div style={{display: 'flex', gap : '16px'}}>
                                <div>
                                    <Label htmlFor='firstName'>First Name</Label>
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
                                    <Label htmlFor='lastName'>Last Name</Label>
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
                                    <Label htmlFor='streetAddr'>Street Address</Label>
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
                                    <Label htmlFor='city'>City</Label>
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
                                    <Label htmlFor='state'>State</Label>
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
                                    <Label htmlFor='zip'>Zip</Label>
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
                                <Label htmlFor='phone'>Phone Number</Label>
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
                                <Label htmlFor='status'>Tax filling Status</Label>
                                <Select id="status" name="status" value={userInfo.status}
                                onChange={(e) => userInfoDispatch({type: 'setStatus', value: e.target.value})}
                                disabled={!enableEdit}
                                >
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
                            </div>
                            <div style={{ display: 'flex'}}>
                                {enableEdit && <Button type='submit' >Submit</Button>}
                            </div>
                        </Form>
                    </main>
                </Grid>
            </GridContainer>
        </div>
    )
}

export default UserInfo