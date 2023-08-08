import { Accordion, Button, Grid, GridContainer} from "@trussworks/react-uswds";
import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import { addNewTen99 } from "../../Slices/Ten99Slice";
import { AccordionItemProps } from "@trussworks/react-uswds/lib/components/Accordion/Accordion";
import W2Form from "./W2Form";

import { selectCurrentSSN } from '../../Slices/AuthSlicer';

var w2InitialArray: AccordionItemProps[] = [{
  title: 'W2 #1',
  content: <W2Form />,
  expanded: true,
  id: 'w2-1',
  headingLevel: 'h4',
}]

export default function W2Page() {
    const [w2Array, setw2Array] = useState(w2InitialArray);
    const ten99Array = useSelector((state: any) => state.ten99s.value);
    const dispatch = useDispatch();
    const [w2OrTen99, setw2OrTen99] = useState("w2");

    //const accessToken = useSelector(selectCurrentToken);
    const accessToken = localStorage.getItem('token');
    const ssn = useSelector(selectCurrentSSN);

  // IDEA:
  // Create a usestate for Accordian items; everytime button is clicked, add a new item to the array (the item being the initialState currently in the store)
  // Instead of sote being for state of amount of forms, it can be for the data for each form

    function incrementw2Array() {
      setw2Array([...w2Array, {
        title: `W2 #${w2Array.length + 1}`,
        content: <W2Form />,
        expanded: true,
        id: `w2-${w2Array.length + 1}`,
        headingLevel: 'h4',
    }])
    }
