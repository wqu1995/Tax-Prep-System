import { Button, ErrorMessage, Form, Label, TextInput } from "@trussworks/react-uswds";
import api from '../../api/axiosConfig';
import axios from "axios";
import { useSelector, useStore } from "react-redux";
import { useState } from "react";


export default function Ten99CreateForm() {
    const userSSN = useSelector((state: any) => state.auth.ssn);
    const [payerTinStatus, setPayerTinStatus] = useState("error");
    const [wageStatus, setWageStatus] = useState("error");
    const [fedWithheldStatus, setFedWithheldStatus] = useState("error");
    const [payerTin, setPayerTin] = useState("");
    const [wage, setWage] = useState("");
    const [fedWithheld, setFedWithheld] = useState("");
    const [submissionError, setSubmissionError] = useState(false);

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
                console.log(response.data)
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
                <Label htmlFor="payerTin">Payer's TIN</Label>
                {payerTinStatus === "error" && <ErrorMessage>Please enter a valid identification number. Do not include hyphens or dashes.</ErrorMessage>}
                <TextInput id="payerTin" name="payerTin" type="text"  onChange={handlePayerTinInput} validationStatus={payerTinStatus}/>
                <Label htmlFor="wages">Nonemployee compensation (Box 1)</Label>
                {wageStatus === "error" && <ErrorMessage>Please enter a valid number.</ErrorMessage>}
                <TextInput id="wages" name="wages" type="text" onChange={handleWageInput} validationStatus={wageStatus}/>
                <Label htmlFor="fedWithheld">Federal income tax withheld (Box 4)</Label>
                {fedWithheldStatus === "error" && <ErrorMessage>Please enter a valid number.</ErrorMessage>}
                <TextInput id="fedWithheld" name="fedWithheld" type="text" onChange={handleFedWithheldInput} validationStatus={fedWithheldStatus}/>
                <div style={{margin: '20px'}}>
                {submissionError && <ErrorMessage>Failed to Add. Please ensure each field is filled out correctly.</ErrorMessage>}
                </div>
                <Button type="submit" data-close-modal='true'>Add</Button>
            </Form>
        </>
    )
}