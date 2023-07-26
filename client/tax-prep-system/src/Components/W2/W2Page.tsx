import { Accordion, AccordionItemProps} from "@trussworks/react-uswds";


export default function W2Page() {

    const testItems: AccordionItemProps[] = [
        {
          title: 'First Amendment',
          content: (
            <p>
              Congress shall make no law respecting an establishment of religion, or
              prohibiting the free exercise thereof; or abridging the freedom of
              speech, or of the press; or the right of the people peaceably to
              assemble, and to petition the Government for a redress of grievances.
            </p>
          ),
          expanded: false,
          id: '123',
          headingLevel: 'h4',
        }
    ]
    return (
        <>
            <Accordion items={testItems} multiselectable={true}/>
        
        </>
    )
}