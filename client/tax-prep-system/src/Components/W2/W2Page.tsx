import { Accordion, AccordionItemProps, Button, Grid, GridContainer} from "@trussworks/react-uswds";


export default function W2Page() {

    const testItems: AccordionItemProps[] = [
        {
          title: 'W2 #1',
          content: (
            <p>
              This is where the W2 Form will go once I add State!!!
            </p>
          ),
          expanded: true,
          id: '123',
          headingLevel: 'h4',
        }
    ]
    return (
        <>
          <GridContainer>
            <div>Do you have more than one W2 to add?</div>
            <Accordion items={testItems} multiselectable={true}/>
            <Grid row>
              <Grid col = {2} offset = {10}>
                <Button type="button">Add A New W2</Button>
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