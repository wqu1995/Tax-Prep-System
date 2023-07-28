import { FormGroup, Label, TextInput} from "@trussworks/react-uswds";

export default function W2Form() {

    return (
        <>
            <FormGroup>
                <Label htmlFor="empTin">Employer identification number (Box b)</Label>
                <TextInput id="empTin" name="empTin" type="text" />
                <Label htmlFor="wages">Wages, tips, and other compensation (Box 1)</Label>
                <TextInput id="wages" name="wages" type="text" />
                <Label htmlFor="fedWithheld">Federal income tax withheld (Box 2)</Label>
                <TextInput id="fedWithheld" name="fedWithheld" type="text" />
            </FormGroup>
        </>
    )
}