import { FormGroup, Label, TextInput} from "@trussworks/react-uswds";

export default function Ten99Form() {

    return (
        <>
            <FormGroup>
                <Label htmlFor="payerTin">Payer's TIN</Label>
                <TextInput id="payerTin" name="payerTin" type="text" />
                <Label htmlFor="wages">Nonemployee compensation (Box 1)</Label>
                <TextInput id="wages" name="wages" type="text" />
                <Label htmlFor="fedWithheld">Federal income tax withheld (Box 4)</Label>
                <TextInput id="fedWithheld" name="fedWithheld" type="text" />
            </FormGroup>
        </>
    )
}