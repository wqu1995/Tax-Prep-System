import { SummaryBox, SummaryBoxHeading } from "@trussworks/react-uswds";
import { useSelector } from "react-redux";

interface W2 {
    empTin: number,
    wages: number,
    fedWithheld: number,
}

interface Ten99 {
    payerTin: number,
    wages: number,
    fedWithheld: number,
}


export default function ResultsPage() {
    const filingStatus = "s"                                                    //PLACEHOLDER FOR USER FILING STATUS AXIOS REQUEST
    const w2s: W2[] = [{empTin: 0, wages: 0, fedWithheld: 0}];                //PLACEHOLDER FOR AXIOS REQUEST
    const ten99s: Ten99[] = [{payerTin: 0, wages: 0, fedWithheld: 0}];             // PLACEHOLDER FOR AXIOS REQUEST
    let totalWages: number = 0;                                                     // ALSO NEED TO IMPLEMENT I18N
    let totalWithheld: number = 0;

    function calculateTaxableIncome(w2Array: W2[], ten99Array: Ten99[], filingStatus: any) {
        w2Array.forEach((w2) => totalWages = totalWages + w2.wages)
        ten99Array.forEach((ten99) => totalWages = totalWages + ten99.wages)
        w2Array.forEach((w2) => totalWithheld = totalWithheld + w2.fedWithheld)
        ten99Array.forEach((ten99) => totalWithheld = totalWithheld + ten99.fedWithheld)
 
        let deduction = 0;
        switch (filingStatus) {
            case "s":
                deduction = 12950;
                break;
            case "m":
                deduction = 25900;
                break;
            default:
                console.log("invalid filing status");
        }

        return totalWages - deduction;


    }

    function calculateTaxes(w2Array: W2[], ten99Array: Ten99[], filingStatus: any) {
        const taxableIncome = calculateTaxableIncome(w2Array, ten99Array, filingStatus);

        switch (filingStatus) {
            case "s":
                if (taxableIncome <= 10275) {
                    return taxableIncome * .1;
                } else if (taxableIncome <= 41775) {
                    return ((taxableIncome - 10275) * .12) + 1027.5
                } else if (taxableIncome <= 89075) {
                    return ((taxableIncome - 41775) * .22) + 4807.5
                } else if (taxableIncome <= 170050) {
                    return ((taxableIncome - 89075) * .24) + 15213.5
                } else if (taxableIncome <= 215950) {
                    return ((taxableIncome - 170050) * .32) + 34647.5
                } else if (taxableIncome <= 539900) {
                    return ((taxableIncome - 215950) * .35) + 49335.5
                } else if (taxableIncome <= Infinity) {
                    return ((taxableIncome - 539900) * .37) + 162718
                }
                break;
            case "mj":
                if (taxableIncome <= 20550) {
                    return taxableIncome * .1;
                } else if (taxableIncome <= 83550) {
                    return ((taxableIncome - 20550) * .12) + 2055
                } else if (taxableIncome <= 178150) {
                    return ((taxableIncome - 83550) * .22) + 9615
                } else if (taxableIncome <= 340100) {
                    return ((taxableIncome - 178150) * .24) + 30427
                } else if (taxableIncome <= 431900) {
                    return ((taxableIncome - 340100) * .32) + 69295
                } else if (taxableIncome <= 647850) {
                    return ((taxableIncome - 431900) * .35) + 98671
                } else if (taxableIncome <= Infinity) {
                    return ((taxableIncome - 647850) * .37) + 174253.5
                }
                break;
            case "ms":
                if (taxableIncome <= 10275) {
                    return taxableIncome * .1;
                } else if (taxableIncome <= 41775) {
                    return ((taxableIncome - 10275) * .12) + 1027.5
                } else if (taxableIncome <= 89075) {
                    return ((taxableIncome - 41775) * .22) + 4807.5
                } else if (taxableIncome <= 170050) {
                    return ((taxableIncome - 89075) * .24) + 15213.5
                } else if (taxableIncome <= 215950) {
                    return ((taxableIncome - 170050) * .32) + 34647.5
                } else if (taxableIncome <= 323925) {
                    return ((taxableIncome - 215950) * .35) + 49335.5
                } else if (taxableIncome <= Infinity) {
                    return ((taxableIncome - 323925) * .37) + 87126.75
                }
                break;
            case "h":
                if (taxableIncome <= 14650) {
                    return taxableIncome * .1;
                } else if (taxableIncome <= 55900) {
                    return ((taxableIncome - 14650) * .12) + 1465
                } else if (taxableIncome <= 89050) {
                    return ((taxableIncome - 55900) * .22) + 6415
                } else if (taxableIncome <= 170050) {
                    return ((taxableIncome - 89050) * .24) + 13708
                } else if (taxableIncome <= 215950) {
                    return ((taxableIncome - 170050) * .32) + 33148
                } else if (taxableIncome <= 539900) {
                    return ((taxableIncome - 215950) * .35) + 47836
                } else if (taxableIncome <= Infinity) {
                    return ((taxableIncome - 539900) * .37) + 161218.5
                }
                break;
        }
        return 0;
    }

    const taxOwed = calculateTaxes(w2s, ten99s, filingStatus)

    if (taxOwed > 0) {
        return (
            <>
                <SummaryBox>
                    <SummaryBoxHeading headingLevel="h3">You owe {taxOwed} in federal taxes.</SummaryBoxHeading>
                </SummaryBox>
            </>
        )
    } else {
        return (
            <>
                <SummaryBox>
                    <SummaryBoxHeading headingLevel="h3">You have a tax refund of {taxOwed}!</SummaryBoxHeading>
                </SummaryBox>
            </>
        )
    }


}