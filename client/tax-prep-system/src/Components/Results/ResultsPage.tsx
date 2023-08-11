import { Button, Grid, GridContainer, SummaryBox, SummaryBoxHeading } from "@trussworks/react-uswds";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import api from '../../api/axiosConfig';
import ErrorPage from "../Home/ErrorPage";
import { Link } from "react-router-dom";

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

//result page for displaying tax results 
export default function ResultsPage() {
    const { t } = useTranslation();
    const userSSN = useSelector((state: any) => state.auth.ssn);
    const [filingStatus, setFilingStatus] = useState("");
    const [w2s, setW2s] = useState([]);
    const [ten99s, setTen99s] = useState([]);
    const [taxOwed, setTaxOwed] = useState(0);
    const [taxOwedValue, setTaxOwedValue] = useState("");

    useEffect(() => {
        if(userSSN!==null){
            api.get(`/w2s/${userSSN}`)
                .then(response => {
                    setW2s(response.data);
                })
                .catch(error => console.error(error));
            api.get(`/ten99s/${userSSN}`)
                .then(response => {
                    setTen99s(response.data);
                })
                .catch(error => console.error(error));
            api.get(`/users/user/${userSSN}`)
                .then(response => {
                    setFilingStatus(response.data.status);
                })
                .catch(error => console.error(error));
        }
    }, [userSSN, filingStatus]);

    useEffect(() => {
        setTaxOwed(calculateTaxes(w2s, ten99s, filingStatus));
        setTaxOwedValue(Math.abs(taxOwed).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits:2}));
    }, [w2s, ten99s, filingStatus])

    function calculateTaxableIncome(w2Array: W2[], ten99Array: Ten99[], filingStatus: string) {
        let totalWages: number = 0;
        w2Array.forEach((w2) => totalWages = totalWages + w2.wages);
        ten99Array.forEach((ten99) => totalWages = totalWages + ten99.wages);
 
        //set up deduction 
        let deduction = 0;
        switch (filingStatus) {
            case "S":
                deduction = 12950;
                break;
            case "MS":
                deduction = 12950;
                break;
            case "MJ":
                deduction = 25900;
                break;
            case "H":
                deduction = 19400;
                break;
            default:
                console.log("invalid filing status");
        }
        const wagesAfterDeduction = totalWages - deduction;

        if (wagesAfterDeduction <= 0) {
            return 0;
        }

        return  wagesAfterDeduction;


    }

    function calculateTaxes(w2Array: W2[], ten99Array: Ten99[], filingStatus: string) {
        const taxableIncome = calculateTaxableIncome(w2Array, ten99Array, filingStatus);
        let totalWithheld: number = 0;
        w2Array.forEach((w2) => totalWithheld = totalWithheld + w2.fedWithheld);
        ten99Array.forEach((ten99) => totalWithheld = totalWithheld + ten99.fedWithheld);

        if (taxableIncome <= 0) {
            return taxableIncome - totalWithheld;
        }

        //perform tax calculation 
        switch (filingStatus) {
            case "S":
                if (taxableIncome <= 10275) {
                    return taxableIncome * .1  - totalWithheld;
                } else if (taxableIncome <= 41775) {
                    return ((taxableIncome - 10275) * .12) + 1027.5 - totalWithheld;
                } else if (taxableIncome <= 89075) {
                    return ((taxableIncome - 41775) * .22) + 4807.5 - totalWithheld;
                } else if (taxableIncome <= 170050) {
                    return ((taxableIncome - 89075) * .24) + 15213.5 - totalWithheld;
                } else if (taxableIncome <= 215950) {
                    return ((taxableIncome - 170050) * .32) + 34647.5 - totalWithheld;
                } else if (taxableIncome <= 539900) {
                    return ((taxableIncome - 215950) * .35) + 49335.5 - totalWithheld;
                } else if (taxableIncome <= Infinity) {
                    return ((taxableIncome - 539900) * .37) + 162718 - totalWithheld;
                }
                break;
            case "MJ":
                if (taxableIncome <= 20550) {
                    return taxableIncome * .1 - totalWithheld;
                } else if (taxableIncome <= 83550) {
                    return ((taxableIncome - 20550) * .12) + 2055 - totalWithheld;
                } else if (taxableIncome <= 178150) {
                    return ((taxableIncome - 83550) * .22) + 9615 - totalWithheld;
                } else if (taxableIncome <= 340100) {
                    return ((taxableIncome - 178150) * .24) + 30427 - totalWithheld;
                } else if (taxableIncome <= 431900) {
                    return ((taxableIncome - 340100) * .32) + 69295 - totalWithheld;
                } else if (taxableIncome <= 647850) {
                    return ((taxableIncome - 431900) * .35) + 98671 - totalWithheld;
                } else if (taxableIncome <= Infinity) {
                    return ((taxableIncome - 647850) * .37) + 174253.5 - totalWithheld;
                }
                break;
            case "MS":
                if (taxableIncome <= 10275) {
                    return taxableIncome * .1 - totalWithheld;
                } else if (taxableIncome <= 41775) {
                    return ((taxableIncome - 10275) * .12) + 1027.5 - totalWithheld;
                } else if (taxableIncome <= 89075) {
                    return ((taxableIncome - 41775) * .22) + 4807.5 - totalWithheld;
                } else if (taxableIncome <= 170050) {
                    return ((taxableIncome - 89075) * .24) + 15213.5 - totalWithheld;
                } else if (taxableIncome <= 215950) {
                    return ((taxableIncome - 170050) * .32) + 34647.5 - totalWithheld;
                } else if (taxableIncome <= 323925) {
                    return ((taxableIncome - 215950) * .35) + 49335.5 - totalWithheld;
                } else if (taxableIncome <= Infinity) {
                    return ((taxableIncome - 323925) * .37) + 87126.75 - totalWithheld;
                }
                break;
            case "H":
                if (taxableIncome <= 14650) {
                    return taxableIncome * .1 - totalWithheld;
                } else if (taxableIncome <= 55900) {
                    return ((taxableIncome - 14650) * .12) + 1465 - totalWithheld;
                } else if (taxableIncome <= 89050) {
                    return ((taxableIncome - 55900) * .22) + 6415 - totalWithheld;
                } else if (taxableIncome <= 170050) {
                    return ((taxableIncome - 89050) * .24) + 13708 - totalWithheld;
                } else if (taxableIncome <= 215950) {
                    return ((taxableIncome - 170050) * .32) + 33148 - totalWithheld;
                } else if (taxableIncome <= 539900) {
                    return ((taxableIncome - 215950) * .35) + 47836 - totalWithheld;
                } else if (taxableIncome <= Infinity) {
                    return ((taxableIncome - 539900) * .37) + 161218.5 - totalWithheld;
                }
                break;
        }
        return 0;
    }

    return(
        <div>
            {userSSN ? (
            taxOwed >= 0 ? (
                <div className='bg-white padding-y-10 padding-x-10'>
                <GridContainer>
                    <Grid className='bg-white padding-y-10 padding-x-10' row offset={3}>
                    <SummaryBox>
                        <SummaryBoxHeading headingLevel="h3">
                        {t('owe')} ${taxOwedValue} {t('taxes')}
                        </SummaryBoxHeading>
                    </SummaryBox>
                    </Grid>
                </GridContainer>
                </div>
            ) : (
                <div className='bg-white padding-y-10 padding-x-10'>
                <GridContainer>
                    <Grid className='bg-white padding-y-10 padding-x-10' row offset={2}>
                    <SummaryBox className='bg-green border-base-lightest'>
                        <SummaryBoxHeading headingLevel="h3">
                        {t('dontowe')} ${taxOwedValue} {t('notax')}

                        </SummaryBoxHeading>

                    </SummaryBox>

                    </Grid>

                </GridContainer>
                </div>
            )
            ) : (
            <ErrorPage errorCode={401} />
            )}
      </div>
    )


}