import { Accordion, Button, Grid, GridContainer} from "@trussworks/react-uswds";
import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import { addNewTen99 } from "../../Slices/Ten99Slice";
import { AccordionItemProps } from "@trussworks/react-uswds/lib/components/Accordion/Accordion";
import W2Form from "./W2Form";

import { selectCurrentFirstName, selectCurrentLastName, selectCurrentSSN } from '../../Slices/AuthSlicer';

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
    const ssn = useSelector(selectCurrentSSN);
    const firstName = useSelector(selectCurrentFirstName);
    const lastName = useSelector(selectCurrentLastName);

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

    if (w2OrTen99 === "w2") {
      return (
        <>
          <p>ssn: {ssn}</p>
          <p>name: {firstName}{lastName}</p>
          <GridContainer>
            <Accordion items={w2Array} multiselectable={true}/>
            <Grid row>
              <Grid col = {5} offset = {8}>
                <div>Do you have more than one W2 to add?</div>
              </Grid>
              <Grid col = {2} offset = {10}>
                <Button id="newW2" type="button" onClick={() => {incrementw2Array()}}>Add A New W2</Button>
              </Grid>
            </Grid>
            <Grid row>
              <Grid tablet={{ col: true }}>
                <Button type="button" /*onClick={/* set logic to return to user info page}*/>Back</Button>   
              </Grid>
              <Grid col = {9}></Grid>
              <Grid tablet={{ col: true }}>
                <Button type="button" onClick={(e) =>{e.preventDefault(); setw2OrTen99("ten99")}}>Next Step</Button>
              </Grid>
            </Grid>
          </GridContainer>
        </>
      )
    }
    return (
        <>
          <GridContainer>
            <Accordion items={ten99Array} multiselectable={true}/>
            <Grid row>
              <Grid col = {5} offset = {8}>
                <div>Do you have more than one W2 to add?</div>
              </Grid>
              <Grid col = {2} offset = {10}>
                <Button id="newW2" type="button" onClick={() => {dispatch(addNewTen99());}}>Add A New 1099</Button>
              </Grid>
            </Grid>
            <Grid row>
              <Grid tablet={{ col: true }}>
                <Button type="button" onClick={(e) =>{ e.preventDefault(); setw2OrTen99("w2")}} >Back</Button>   
              </Grid>
              <Grid col = {9}></Grid>
              <Grid tablet={{ col: true }}>
                <Button type="button" /*onClick={/* set logic to go to results page}*/>Next Step</Button>
              </Grid>
            </Grid>
          </GridContainer>
        </>
    )
}