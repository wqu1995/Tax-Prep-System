import { Button, ErrorMessage, Form, Label, TextInput, ValidationStatus } from "@trussworks/react-uswds";
import api from '../../api/axiosConfig';
import axios from "axios";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { setStoreW2Data } from '../../Slices/dataSlice';


export default function W2CreateForm() {
    const { t } = useTranslation();
    const userSSN = useSelector((state: any) => state.auth.ssn);
    const w2Data = useSelector((state: any) => state.data.w2Data);
    const [empTinStatus, setEmpTinStatus] = useState("error");
    const [wageStatus, setWageStatus] = useState("error");
    const [fedWithheldStatus, setFedWithheldStatus] = useState("error");
    const [empTin, setEmpTin] = useState("");
    const [wage, setWage] = useState("");
    const [fedWithheld, setFedWithheld] = useState("");
    const [submissionError, setSubmissionError] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (empTin == null || empTinStatus == "error" || wage == null || wageStatus == "error" || fedWithheld == null || fedWithheldStatus == "error" ) {
            setSubmissionError(true);
        } else {
            api.post('/w2s/w2', {
                "w2Id": {
                "social": userSSN,
                "empTin": empTin
                },
                "wages": wage,
                "fedWithheld": fedWithheld
            }).then(response => {
                e.target.reset();
                const updatedW2Data = w2Data.push(response.data);
                dispatch(setStoreW2Data(updatedW2Data));
            }).catch(error => {
                console.error("Error:", error);
            })
        }
    }

    const handleEmpTinInput = (e: any) => {
        setEmpTin(e.target.value);
        function isValidPositiveNumber(input: any) {
            const positiveNumberRegex = /^[1-9]\d*$/;
            return !!input.match(positiveNumberRegex);
        } 

        if (isValidPositiveNumber(e.target.value)) {
            setEmpTinStatus("");
        } else {
            setEmpTinStatus("error");
        }
    };

    const handleWageInput = (e: any) => {
        setWage(e.target.value);
        function isValidPositiveNumber(input: any) {
            const positiveNumberRegex = /^\d+(\.\d+)?$/;
            return !!input.match(positiveNumberRegex);
        } 

        if (isValidPositiveNumber(e.target.value)) {
            setWageStatus("");
        } else {
            setWageStatus("error");
        }
    };

    const handleFedWithheldInput = (e: any) => {
        setFedWithheld(e.target.value);
        function isValidPositiveNumber(input: any) {
            const positiveNumberRegex = /^\d+(\.\d+)?$/;
            return !!input.match(positiveNumberRegex);
        } 

        if (isValidPositiveNumber(e.target.value)) {
            setFedWithheldStatus("");
        } else {
            setFedWithheldStatus("error");
        }
    };

    return (
        <>
            <Form  onSubmit={handleSubmit}>
                <Label htmlFor="empTin">{t('ein')}</Label>
                {empTinStatus === "error" && <ErrorMessage>{t('ptinerror')}</ErrorMessage>}
                <TextInput id="empTin" name="empTin" type="text"  onChange={handleEmpTinInput} validationStatus={empTinStatus as ValidationStatus}/>
                <Label htmlFor="wages">{t('wages')}</Label>
                {wageStatus === "error" && <ErrorMessage>{t('comperror')}</ErrorMessage>}
                <TextInput id="wages" name="wages" type="text" onChange={handleWageInput} validationStatus={wageStatus as ValidationStatus}/>
                <Label htmlFor="fedWithheld">{t('ftax')}</Label>
                {fedWithheldStatus === "error" && <ErrorMessage>{t('comperror')}</ErrorMessage>}
                <TextInput id="fedWithheld" name="fedWithheld" type="text" onChange={handleFedWithheldInput} validationStatus={fedWithheldStatus as ValidationStatus}/>
                <div style={{margin: '20px'}}>
                {submissionError && <ErrorMessage>{t('failadd')}</ErrorMessage>}
                </div>
                <Button type="submit" data-close-modal='true'>{t('add')}</Button>
            </Form>
        </>
    )
}