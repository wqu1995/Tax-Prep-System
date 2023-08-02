import { createSlice } from "@reduxjs/toolkit";
import Ten99Form from "../Components/Ten99/Ten99Form";
import { AccordionItemProps } from "@trussworks/react-uswds/lib/components/Accordion/Accordion";

var ten99Array: AccordionItemProps[] = [{
    title: '1099 #1',
    content: <Ten99Form />,
    expanded: true,
    id: '1099-1',
    headingLevel: 'h4',
}]

const ten99sSlice = createSlice({
    name: "ten99s",
    initialState: {value: ten99Array},
    reducers: {
        addNewTen99: (state) => {
            state.value.push({
                title: `1099 #${state.value.length + 1}`,
                content: <Ten99Form />,
                expanded: true,
                id: `ten99-${state.value.length + 1}`,
                headingLevel: 'h4',
            });
        }
    }
})

export const {addNewTen99} = ten99sSlice.actions;

export default ten99sSlice.reducer;