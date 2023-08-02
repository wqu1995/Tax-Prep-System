import { Form, Label, TextInput} from "@trussworks/react-uswds";
import { useDispatch, useSelector } from "react-redux";
import { updateW2Form } from "../../Slices/W2Slice";

interface W2FormProps {
    index: number;
  }

export default function W2Form({index}: W2FormProps) {
    const dispatch = useDispatch();
    const formData = useSelector((state: any) => state.w2s.forms[index]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("submitted W2!!!")
    }

    const handleInput = (e: any) => {
        const {name, value} = e.target;
        dispatch(updateW2Form({index, data: {...formData, [name]: value}}));
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="empTin">Employer identification number (Box b)</Label>
                <TextInput id="empTin" name="empTin" type="text" value={formData.empTin} onChange={handleInput}/>
                <Label htmlFor="wages">Wages, tips, and other compensation (Box 1)</Label>
                <TextInput id="wages" name="wages" type="text" value={formData.wages} onChange={handleInput}/>
                <Label htmlFor="fedWithheld">Federal income tax withheld (Box 2)</Label>
                <TextInput id="fedWithheld" name="fedWithheld" type="text" value={formData.fedWithheld} onChange={handleInput}/>
            </Form>
        </>
    )
}