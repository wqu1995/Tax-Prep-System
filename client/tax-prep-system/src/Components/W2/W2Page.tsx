import { Accordion, Button, Grid, GridContainer} from "@trussworks/react-uswds";
import {useDispatch, useSelector} from "react-redux";
import { addNewW2, initialW2 } from "../../Slices/W2Slice";


export default function W2Page() {
    const w2Array = useSelector((state: any) => state.w2s.value);
    const dispatch = useDispatch();

    return (
        <>
          <GridContainer>
            <Accordion items={w2Array} multiselectable={true}/>
            <Grid row>
              <Grid col = {5} offset = {8}>
                <div>Do you have more than one W2 to add?</div>
              </Grid>
              <Grid col = {2} offset = {10}>
                <Button id="newW2" type="button" onClick={() => {dispatch(addNewW2());}}>Add A New W2</Button>
              </Grid>
            </Grid>
            <Grid row>
              <Grid tablet={{ col: true }}>
                <Button type="button">Back</Button>   
              </Grid>
              <Grid col = {9}></Grid>
              <Grid tablet={{ col: true }}>
                <Button type="button">Next Step</Button>
              </Grid>
            </Grid>
          </GridContainer>
        </>
    )
}