import { Grid, GridContainer, SummaryBox, SummaryBoxHeading } from "@trussworks/react-uswds";
import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import api from '../../api/axiosConfig';

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
    const { t } = useTranslation();
    const userSSN = 333444555; //   TESTING PURPOSES ONLY RESET TO: useSelector((state: any) => state.auth.ssn);
    const jwtToken = localStorage.getItem("token");
    let filingStatus = "";
    let w2s: W2[] = [];
    let ten99s: Ten99[] = [];
    let totalWages: number = 0;
    let totalWithheld: number = 0;

    useEffect(() => {
        api.get(`/w2s/${userSSN}`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Authorization": `Bearer ${jwtToken}`
            }
        })
            .then(response => {
                w2s = response.data;
            })
            .catch(error => console.error(error));
        api.get(`/ten99s/${userSSN}`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Authorization": `Bearer ${jwtToken}`
            }
        })
            .then(response => {
                ten99s = response.data;
            })
            .catch(error => console.error(error));
        api.get(`/users/user/${userSSN}`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Authorization": `Bearer ${jwtToken}`
            }
        })
            .then(response => {
                filingStatus = response.data.filingStatus;
            })
            .catch(error => console.error(error));
    }, []);

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
            case "sms":
                deduction = 12950;
                break;
            case "mj":
                deduction = 25900;
                break;
            case "h":
                deduction = 19400;
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
    const taxOwedValue = Math.abs(taxOwed).toLocaleString();

    if (taxOwed > 0) {
        return (
            <>
                <GridContainer>
                    <Grid row offset={3}>
                        <SummaryBox>
                            <SummaryBoxHeading headingLevel="h3">You owe ${taxOwedValue} in federal taxes.</SummaryBoxHeading>
                        </SummaryBox>
                    </Grid>
                </GridContainer>
            </>
        )
    } else {
        return (
            <>
                <GridContainer>
                    <Grid row offset={3}>
                        <SummaryBox>
                            <SummaryBoxHeading headingLevel="h3">You have a tax refund of ${taxOwedValue}!</SummaryBoxHeading>
                        </SummaryBox>
                    </Grid>
                </GridContainer>
            </>
        )
    }


}