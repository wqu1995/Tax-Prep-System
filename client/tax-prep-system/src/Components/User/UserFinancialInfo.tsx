import { Button, Form, Grid, GridContainer, Label, Modal, ModalHeading, ModalToggleButton, Table, TextInput, Title } from "@trussworks/react-uswds";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from '../../api/axiosConfig';
import axios from "axios";
import { selectCurrentSSN} from '../../Slices/AuthSlicer';
import W2Form from "../W2/W2Form";
import W2CreateForm from "../W2/W2CreateForm";
import Ten99CreateForm from "../Ten99/Ten99CreateForm";
import W2DeleteForm from "../W2/W2DeleteForm";
import { setStoreW2Data, setStoreTen99Data } from '../../Slices/dataSlice';
import Ten99DeleteForm from "../Ten99/Ten99DeleteForm";
import { useTranslation } from "react-i18next";


export default function UserFinancialInfo() {
    const { t } = useTranslation();
    const userSSN = useSelector(selectCurrentSSN);
    const [userName, setUserName] = useState("");
    const w2Data = useSelector((state: any) => state.data.w2Data);
    const ten99Data = useSelector((state: any) => state.data.ten99Data);
    const [editW2, setEditW2] = useState(true);
    const [edit1099, setEdit1099] = useState(true);
    const dispatch = useDispatch();
    const modalRef1 = useRef(null);
    const modalRef2 = useRef(null);
    const modalRef3 = useRef(null);
    const modalRef4 = useRef(null);

    useEffect(() => {
        api.get(`/w2s/${userSSN}`)
            .then(response => {
                dispatch(setStoreW2Data(response.data));
            })
            .catch(error => console.error(error));
        api.get(`/ten99s/${userSSN}`)
            .then(response => {
                dispatch(setStoreTen99Data(response.data));
            })
            .catch(error => console.error(error));
        api.get(`/users/user/${userSSN}`)
            .then(response => {
                setUserName(`${response.data.firstName} ${response.data.lastName}`);
            })
            .catch(error => console.error(error));
    }, [userSSN]);

    const handleSubmit = ((e: any) => {

    })

    const handleW2InputChange = (index: any, field: any, value: any) => {
        const updatedW2Data: any = [...w2Data];
            updatedW2Data[index] = {
            ...updatedW2Data[index], 
            [field]: value,
        };
        dispatch(setStoreW2Data(updatedW2Data));
    };

    const handleTen99InputChange = (index: any, field: any, value: any) => {
        const updatedTen99Data: any = [...ten99Data];
            updatedTen99Data[index] = {
            ...updatedTen99Data[index], 
            [field]: value,
        };
        dispatch(setStoreTen99Data(updatedTen99Data));
    };

    const toggleW2Edit = () => {
        setEditW2(!editW2)
    }

    const toggleW2Save = () => {

        w2Data.forEach((w2: any) => {
            api.put('/w2s/w2', {
              "w2Id": {
                "social": userSSN,
                "empTin": w2.w2Id.empTin
              },
              "wages": w2.wages,
              "fedWithheld": w2.fedWithheld
            }).then(response => {
                console.log(response.data)
            }).catch(error => {
              console.error("Error:", error);
            })
            });
        setEditW2(!editW2)
    }

    const toggle1099Edit = () => {
        setEdit1099(!edit1099)
    }

    const toggle1099Save = () => {

        ten99Data.forEach((ten99: any) => {
            api.put('/ten99s/ten99', {
              "ten99Id": {
                "social": userSSN,
                "payerTin": ten99.ten99Id.payerTin
              },
              "wages": ten99.wages,
              "fedWithheld": ten99.fedWithheld
            }).then(response => {
                console.log(response.data)
            }).catch(error => {
              console.error("Error:", error);
            })
            });
        setEdit1099(!edit1099)
    }

    return(
        <>
        <div className='bg-white'>
          <GridContainer className="usa-section">
            <Grid row>
                <h1>{t('Welcome')} {userName}</h1>
            </Grid>
            <Grid row>
                <h3>{t('fin')}</h3>
            </Grid>
            <Grid row>
                <h2>W2's </h2>
                <Grid col={1} offset={2} style={{transform: 'translate(4px,15px)'}}>
                <ModalToggleButton modalRef={modalRef1} className='usa-button--outline' type="button" opener>{t('Create')}</ModalToggleButton>
                </Grid>
                <Grid col={1} style={{transform: 'translate(25px,15px)'}}>
                    <ModalToggleButton modalRef={modalRef3} className='usa-button--outline' type="button">{t('Delete')}</ModalToggleButton>
                </Grid>
                {editW2 ? 
                <Grid col style={{transform: 'translate(45px,15px)'}}>
                    <Button className='usa-button--outline' type="button" onClick={toggleW2Edit}>{t('Edit')}</Button>
                </Grid>: 
                <Grid col style={{transform: 'translate(40px,15px)'}}>
                    <Button type="button" onClick={toggleW2Save}>{t('Save')}</Button>
                </Grid>}
            </Grid>
            {w2Data.map((w2: any, index: any) => {
                return (
            <Form  key={w2.w2Id.empTin} onSubmit={handleSubmit}>
            <div className="bg-base-light" style={{display: 'flex', gap : '126px', width:'152%', paddingBottom:'5px', height: '35px', alignItems: 'end'}}>
                <Label htmlFor="empTin"><b>{t('einn')}</b></Label>
                <Label htmlFor="wages" style={{transform: 'translate(10px)'}}><b>{t('Wages')}</b></Label>
                <Label htmlFor="fedWithheld"><b>{t('fedwith')}</b></Label>
            </div>
            <div style={{display: 'flex', gap : '0px', width: '152%', paddingBottom: '10px'}}>
                <TextInput id={`empTin-${index}`} name="empTin" type="text" value={w2.w2Id.empTin} onChange={(e) => handleW2InputChange(index, 'empTin', e.target.value)} disabled/>
                <TextInput id={`wages-${index}`} name="wages" type="text" value={w2.wages} onChange={(e) => handleW2InputChange(index, 'wages', e.target.value)} disabled={editW2}/>
                <TextInput id={`fedWithheld-${index}`} name="fedWithheld" type="text" value={w2.fedWithheld} onChange={(e) => handleW2InputChange(index, 'fedWithheld', e.target.value)} disabled={editW2}/>
            </div>
            </Form>
                )
            })}
            <Grid row>
                <h2>1099's </h2>
                <Grid col={1} offset={2} style={{transform: 'translate(-12px,15px)'}}>
                    <ModalToggleButton modalRef={modalRef2} className='usa-button--outline' type="button" opener>{t('Create')}</ModalToggleButton>
                </Grid>
                <Grid col={1} style={{transform: 'translate(8px,15px)'}}>
                    <ModalToggleButton modalRef={modalRef4} className='usa-button--outline' type="button">{t('Delete')}</ModalToggleButton>
                </Grid>
                {edit1099 ? 
                <Grid col style={{transform: 'translate(28px,15px)'}}>
                    <Button className='usa-button--outline' type="button" onClick={toggle1099Edit}>{t('Edit')}</Button>
                </Grid>: 
                <Grid col style={{transform: 'translate(23px,15px)'}}>
                    <Button type="button" onClick={toggle1099Save}>{t('Save')}</Button>
                </Grid>}
            </Grid>
            {ten99Data.map((ten99: any, index: any) => {
                return (
                    <Form key={ten99.ten99Id.payerTin} onSubmit={handleSubmit}>
                        <div className="bg-base-light" style={{display: 'flex', gap : '126px', width:'152%', paddingBottom:'5px', height: '35px', alignItems: 'end'}}>
                            <Label htmlFor="payerTin"><b>{t('PIN')}</b></Label>
                            <Label htmlFor="wages" style={{transform: 'translate(10px)'}}><b>{t('Wages')}</b></Label>
                            <Label htmlFor="fedWithheld"><b>{t('fedwith')}</b></Label>
                        </div>
                        <div style={{display: 'flex', gap : '0px', width: '152%', paddingBottom: '10px'}}>
                            <TextInput id={`payerTin-${index}`} name="payerTin" type="text" value={ten99.ten99Id.payerTin} onChange={(e) => handleTen99InputChange(index, 'payerTin', e.target.value)} disabled/>
                            <TextInput id={`wages-${index}`} name="wages" type="text" value={ten99.wages} onChange={(e) => handleTen99InputChange(index, 'wages', e.target.value)} disabled={edit1099}/>
                            <TextInput id={`fedWithheld-${index}`} name="fedWithheld" type="text" value={ten99.fedWithheld} onChange={(e) => handleTen99InputChange(index, 'fedWithheld', e.target.value)} disabled={edit1099}/>
                        </div>
                    </Form>
                )
            })}
          </GridContainer>
        </div>
        
        <Modal id='create-W2-modal' ref={modalRef1}>
            <ModalHeading>{t('AddW2')}</ModalHeading>
            <W2CreateForm/>
        </Modal>

        <Modal id='create-1099-modal' ref={modalRef2}>
            <ModalHeading>{t('Add1099')}</ModalHeading>
            <Ten99CreateForm/>
        </Modal>

        <Modal id='delete-W2-modal' ref={modalRef3}>
            <ModalHeading>{t('whichW2')}</ModalHeading>
            <W2DeleteForm/>
        </Modal>

        <Modal id='delete-1099-modal' ref={modalRef4}>
            <ModalHeading>{t('which1099')}</ModalHeading>
            <Ten99DeleteForm/>
        </Modal> 
        
        </>
    )
}