import { Button, ErrorMessage, Form, Label, TextInput } from "@trussworks/react-uswds";
import api from '../../api/axiosConfig';
import axios from "axios";
import { useSelector, useStore } from "react-redux";
import { useState } from "react";


export default function W2CreateForm() {
    const userSSN = useSelector((state: any) => state.auth.ssn);
    const [empTinStatus, setEmpTinStatus] = useState("error");
    const [wageStatus, setWageStatus] = useState("error");
    const [fedWithheldStatus, setFedWithheldStatus] = useState("error");
    const [empTin, setEmpTin] = useState("");
    const [wage, setWage] = useState("");
    const [fedWithheld, setFedWithheld] = useState("");
    const [submissionError, setSubmissionError] = useState(false);

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
                <Label htmlFor="empTin">Employer identification number (Box b)</Label>
                {empTinStatus === "error" && <ErrorMessage>Please enter a valid identification number. Do not include hyphens or dashes.</ErrorMessage>}
                <TextInput id="empTin" name="empTin" type="text"  onChange={handleEmpTinInput} validationStatus={empTinStatus}/>
                <Label htmlFor="wages">Wages, tips, and other compensation (Box 1)</Label>
                {wageStatus === "error" && <ErrorMessage>Please enter a valid number.</ErrorMessage>}
                <TextInput id="wages" name="wages" type="text" onChange={handleWageInput} validationStatus={wageStatus}/>
                <Label htmlFor="fedWithheld">Federal income tax withheld (Box 2)</Label>
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