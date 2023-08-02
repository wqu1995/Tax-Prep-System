import { Form, Label, TextInput} from "@trussworks/react-uswds";
import { useState } from "react";

export default function W2Form() {
    const [w2FormData, setW2FormData] = useState({
        empTin: "",
        wages: "",
        fedWithheld: "",
    })

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="empTin">Employer identification number (Box b)</Label>
                <TextInput id="empTin" name="empTin" type="text" value={w2FormData.empTin} onChange={(e: any) => {setW2FormData({...w2FormData, empTin: e.target.value})}}/>
                <Label htmlFor="wages">Wages, tips, and other compensation (Box 1)</Label>
                <TextInput id="wages" name="wages" type="text" />
                <Label htmlFor="fedWithheld">Federal income tax withheld (Box 2)</Label>
                <TextInput id="fedWithheld" name="fedWithheld" type="text" />
            </Form>
        </>
    )
}