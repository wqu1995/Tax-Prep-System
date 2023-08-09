import { ErrorMessage, Form, Label, TextInput} from "@trussworks/react-uswds";
import { useDispatch, useSelector } from "react-redux";
import { updateW2Form } from "../../Slices/W2Slice";
import { useState } from "react";


interface W2FormProps {
    index: number;
  }

export default function W2Form({index}: W2FormProps) {
    const dispatch = useDispatch();
    const formData = useSelector((state: any) => state.w2s.forms[index]);
    const [empTinStatus, setEmpTinStatus] = useState("error");
    const [wageStatus, setWageStatus] = useState("error");
    const [fedWithheldStatus, setFedWithheldStatus] = useState("error");

    const handleSubmit= (e: any) => {

    };

    const handleEmpTinInput = (e: any) => {
        const {name, value} = e.target;
        dispatch(updateW2Form({index, data: {...formData, [name]: value}}));
        function isValidPositiveNumber(input: any) {
            const positiveNumberRegex = /^[1-9]\d*$/;
            return !!input.match(positiveNumberRegex);
        } 

        if (isValidPositiveNumber(value)) {
            setEmpTinStatus("");
        } else {
            setEmpTinStatus("error");
        }
    };

    const handleWageInput = (e: any) => {
        const {name, value} = e.target;
        dispatch(updateW2Form({index, data: {...formData, [name]: value}}));
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
        dispatch(updateW2Form({index, data: {...formData, [name]: value}}));
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
            <Form  onSubmit={handleSubmit}>
                <Label htmlFor="empTin">Employer identification number (Box b)</Label>
                {empTinStatus === "error" && <ErrorMessage>Please enter a valid identification number. Do not include hyphens or dashes.</ErrorMessage>}
                <TextInput id="empTin" name="empTin" type="text" value={formData.empTin} onChange={handleEmpTinInput} validationStatus={empTinStatus}/>
                <Label htmlFor="wages">Wages, tips, and other compensation (Box 1)</Label>
                {wageStatus === "error" && <ErrorMessage>Please enter a valid number.</ErrorMessage>}
                <TextInput id="wages" name="wages" type="text" value={formData.wages} onChange={handleWageInput} validationStatus={wageStatus}/>
                <Label htmlFor="fedWithheld">Federal income tax withheld (Box 2)</Label>
                {fedWithheldStatus === "error" && <ErrorMessage>Please enter a valid number.</ErrorMessage>}
                <TextInput id="fedWithheld" name="fedWithheld" type="text" value={formData.fedWithheld} onChange={handleFedWithheldInput} validationStatus={fedWithheldStatus}/>
            </Form>
        </>
    )
}