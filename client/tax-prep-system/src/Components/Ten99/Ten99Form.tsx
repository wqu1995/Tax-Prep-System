import { Form, Label, TextInput} from "@trussworks/react-uswds";
import { useDispatch, useSelector } from "react-redux";
import { updateTen99Form } from "../../Slices/Ten99Slice";

interface Ten99Props {
    index: number
}

export default function Ten99Form({index}: Ten99Props) {
    const dispatch = useDispatch();
    const formData = useSelector((state: any) => state.ten99s.forms[index]);

    const handleInput = (e: any) => {
        const {name, value} = e.target;
        dispatch(updateTen99Form({index, data: {...formData, [name]: value}}))
    }
    

    const handleSubmit = (e: any) => {
        e.preventDefault
        console.log("submitted 1099!!")
    }    

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="payerTin">Payer's TIN</Label>
                <TextInput id="payerTin" name="payerTin" type="text" value={formData.payerTin} onChange={handleInput}/>
                <Label htmlFor="wages">Nonemployee compensation (Box 1)</Label>
                <TextInput id="wages" name="wages" type="text" value={formData.wages} onChange={handleInput}/>
                <Label htmlFor="fedWithheld">Federal income tax withheld (Box 4)</Label>
                <TextInput id="fedWithheld" name="fedWithheld" type="text" value={formData.fedWithheld} onChange={handleInput}/>
            </Form>
        </>
    )
}