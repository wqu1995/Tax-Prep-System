import { Button, ErrorMessage, Form, Label, TextInput, ValidationStatus } from "@trussworks/react-uswds";
import api from '../../api/axiosConfig';
import axios from "axios";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { setStoreTen99Data } from '../../Slices/dataSlice';


export default function Ten99CreateForm() {
    const { t } = useTranslation();
    const userSSN = useSelector((state: any) => state.auth.ssn);
    const ten99Data = useSelector((state: any) => state.data.ten99Data);
    const [payerTinStatus, setPayerTinStatus] = useState("error");
    const [wageStatus, setWageStatus] = useState("error");
    const [fedWithheldStatus, setFedWithheldStatus] = useState("error");
    const [payerTin, setPayerTin] = useState("");
    const [wage, setWage] = useState("");
    const [fedWithheld, setFedWithheld] = useState("");
    const [submissionError, setSubmissionError] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (payerTin == null || payerTinStatus == "error" || wage == null || wageStatus == "error" || fedWithheld == null || fedWithheldStatus == "error" ) {
            setSubmissionError(true);
        } else {
            api.post('/ten99s/ten99', {
                "ten99Id": {
                "social": userSSN,
                "payerTin": payerTin
                },
                "wages": wage,
                "fedWithheld": fedWithheld
            }).then(response => {
                e.target.reset();
                const updatedTen99Data = ten99Data.push(response.data);
                dispatch(setStoreTen99Data(updatedTen99Data));
            }).catch(error => {
                console.error("Error:", error);
            })
        }
    }

    const handlePayerTinInput = (e: any) => {
        setPayerTin(e.target.value);
        function isValidPositiveNumber(input: any) {
            const positiveNumberRegex = /^[1-9]\d*$/;
            return !!input.match(positiveNumberRegex);
        } 

        if (isValidPositiveNumber(e.target.value)) {
            setPayerTinStatus("");
        } else {
            setPayerTinStatus("error");
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
                <Label htmlFor="payerTin">{t('ptin')}</Label>
                {payerTinStatus === "error" && <ErrorMessage>{t('ptinerror')} </ErrorMessage>}
                <TextInput id="payerTin" name="payerTin" type="text"  onChange={handlePayerTinInput} validationStatus={payerTinStatus  as ValidationStatus}/>
                <Label htmlFor="wages">{t('comp')}</Label>
                {wageStatus === "error" && <ErrorMessage>{t('comperror')}</ErrorMessage>}
                <TextInput id="wages" name="wages" type="text" onChange={handleWageInput} validationStatus={wageStatus  as ValidationStatus}/>
                <Label htmlFor="fedWithheld">{t('ptax')}</Label>
                {fedWithheldStatus === "error" && <ErrorMessage>{t('ptaxerror')}</ErrorMessage>}
                <TextInput id="fedWithheld" name="fedWithheld" type="text" onChange={handleFedWithheldInput} validationStatus={fedWithheldStatus  as ValidationStatus}/>
                <div style={{margin: '20px'}}>
                {submissionError && <ErrorMessage>{t('failadd')}</ErrorMessage>}
                </div>
                <Button type="submit" data-close-modal='true'>{t('add')}</Button>
            </Form>
        </>
    )
}