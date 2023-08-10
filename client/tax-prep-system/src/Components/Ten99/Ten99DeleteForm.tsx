import { Button, Form, Label, Select } from "@trussworks/react-uswds";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from '../../api/axiosConfig';
import axios from "axios";
import { useTranslation } from "react-i18next";


export default function Ten99DeleteForm() {
    const { t } = useTranslation();
    const [deleteTarget, setDeleteTarget] = useState("");
    const ten99Data = useSelector((state: any) => state.data.ten99Data)
    const userSSN = useSelector((state: any) => state.auth.ssn);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        api.delete(`/ten99s/ten99/deleteFor${userSSN}/${deleteTarget}`)
            .then(response => {
                e.target.reset()
            }).catch(error => {
                console.error("Error:", error);
            })
        
    }

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Label htmlFor='delete'>{t('del1099')}</Label>
                <Select id="delete" name="delete" onChange={(e) => setDeleteTarget(e.target.value)}>
                    <React.Fragment key=".0">
                        <option>
                        - {t('select')} -{' '}
                        </option>
                        {ten99Data.map((ten99: any) => {
                            return (
                                <option key={ten99.ten99Id.payerTin} value={ten99.ten99Id.payerTin}>
                                    {ten99.ten99Id.payerTin}
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