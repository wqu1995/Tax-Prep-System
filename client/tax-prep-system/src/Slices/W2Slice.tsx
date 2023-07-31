import { createSlice } from "@reduxjs/toolkit";
import W2Form from "../Components/W2/W2Form";
import { AccordionItemProps } from "@trussworks/react-uswds/lib/components/Accordion/Accordion";

var w2Array: AccordionItemProps[] = [{
    title: 'W2 #1',
    content: <W2Form />,
    expanded: true,
    id: 'w2-1',
    headingLevel: 'h4',
}]

const w2sSlice = createSlice({
    name: "w2s",
    initialState: {value: w2Array},
    reducers: {
        initialW2: (state) => {
            state.value = state.value;
        },
        addNewW2: (state) => {
            state.value.push({
                title: `W2 #${state.value.length + 1}`,
                content: <W2Form />,
                expanded: true,
                id: `w2-${state.value.length + 1}`,
                headingLevel: 'h4',
            });
        }
    }
})

export const {initialW2, addNewW2} = w2sSlice.actions;

export default w2sSlice.reducer;