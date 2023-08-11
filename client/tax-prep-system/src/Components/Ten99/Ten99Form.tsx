import { ErrorMessage, Form, Label, TextInput, ValidationStatus} from "@trussworks/react-uswds";
import { useDispatch, useSelector } from "react-redux";
import { updateTen99Form } from "../../Slices/Ten99Slice";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Ten99Props {
    index: number
}

export default function Ten99Form({index}: Ten99Props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const formData = useSelector((state: any) => state.ten99s.forms[index]);
    const [payerTinStatus, setPayerTinStatus] = useState("error");
    const [wageStatus, setWageStatus] = useState("error");
    const [fedWithheldStatus, setFedWithheldStatus] = useState("error");

    
    const handleSubmit = (e: any) => {
        e.preventDefault
        console.log("submitted 1099!!")
    }
    
    //validation methods to check user input
    const handlePayerTinInput = (e: any) => {
        const {name, value} = e.target;
        dispatch(updateTen99Form({index, data: {...formData, [name]: value}}));
        function isValidPositiveNumber(input: any) {
            const positiveNumberRegex = /^[1-9]\d*$/;
            return !!input.match(positiveNumberRegex);
        } 

        if (isValidPositiveNumber(value)) {
            setPayerTinStatus("");
        } else {
            setPayerTinStatus("error");
        }
    };

    const handleWageInput = (e: any) => {
        const {name, value} = e.target;
        dispatch(updateTen99Form({index, data: {...formData, [name]: value}}));
        function isValidPositiveNumber(input: any) {
            const positiveNumberRegex = /^\d+(\.\d+)?$/;
            return !!input.match(positiveNumberRegex);
        } 

        if (isValidPositiveNumber(value)) {
            setWageStatus("");
        } else {
            setWageStatus("error");
        }
    };

    const handleFedWithheldInput = (e: any) => {
        const {name, value} = e.target;
        dispatch(updateTen99Form({index, data: {...formData, [name]: value}}));
        function isValidPositiveNumber(input: any) {
            const positiveNumberRegex = /^\d+(\.\d+)?$/;
            return !!input.match(positiveNumberRegex);
        } 

        if (isValidPositiveNumber(value)) {
            setFedWithheldStatus("");
        } else {
            setFedWithheldStatus("error");
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="payerTin">{t('ptin')}</Label>
                {payerTinStatus === "error" && <ErrorMessage>{t('ptinerror')}</ErrorMessage>}

                <TextInput id="payerTin" name="payerTin" type="text" value={formData.payerTin} onChange={handlePayerTinInput} validationStatus={payerTinStatus as ValidationStatus}/>
                <Label htmlFor="wages">{t('comp')}</Label>
                {wageStatus === "error" && <ErrorMessage>{t('comperror')}</ErrorMessage>}
                <TextInput id="wages" name="wages" type="text" value={formData.wages} onChange={handleWageInput} validationStatus={wageStatus as ValidationStatus}/>
                <Label htmlFor="fedWithheld">{t('ptax')}</Label>
                {fedWithheldStatus === "error" && <ErrorMessage>{t('comperror')}</ErrorMessage>}
                <TextInput id="fedWithheld" name="fedWithheld" type="text" value={formData.fedWithheld} onChange={handleFedWithheldInput} validationStatus={fedWithheldStatus as ValidationStatus}/>

            </Form>
        </>
    )
}