import { Button, Form, Label, Select } from "@trussworks/react-uswds";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from '../../api/axiosConfig';
import axios from "axios";
import { useTranslation } from "react-i18next";
import { setStoreW2Data } from '../../Slices/dataSlice';

//form for delete w2 entry 
export default function W2DeleteForm() {
    const { t } = useTranslation();
    const [deleteTarget, setDeleteTarget] = useState("");
    const w2Data = useSelector((state: any) => state.data.w2Data);
    const userSSN = useSelector((state: any) => state.auth.ssn);
    const dispatch = useDispatch();

    interface W2{
        w2Id:{
            empTin : number,
            social : number
        },
        fedWithheld : number,
        wages : number
    }

    //attempt to delete the selected w2
    const handleSubmit = (e: any) => {
        e.preventDefault();
        api.delete(`/w2s/w2/deleteFor${userSSN}/${deleteTarget}`)
            .then(response => {
                e.target.reset()
                const updatedW2Data = w2Data.filter((w2: W2) => w2.w2Id.empTin !== Number(deleteTarget));
                dispatch(setStoreW2Data(updatedW2Data));
            }).catch(error => {
                console.error("Error:", error);
            })
        
    }

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Label htmlFor='delete'>{t('w2del')}</Label>
                <Select id="delete" name="delete" onChange={(e) => setDeleteTarget(e.target.value)}>
                    <React.Fragment key=".0">
                        <option>
                        - {t('select')} -{' '}
                        </option>
                        {w2Data.map((w2: any) => {
                            return (
                                <option key={w2.w2Id.empTin} value={w2.w2Id.empTin}>
                                    {w2.w2Id.empTin}
                                </option>
                            )
                        })}
                    </React.Fragment>
                </Select>
                <Button className="deleteButton" type="submit" data-close-modal='true'>{t('delete')}</Button>
        </Form>
        
        
        </>
    )
}