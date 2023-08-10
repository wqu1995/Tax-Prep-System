import { Grid, GridContainer, SummaryBox, SummaryBoxHeading } from "@trussworks/react-uswds";
import axios from "axios";
import { useEffect, useState } from "react";
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
    const userSSN = useSelector((state: any) => state.auth.ssn);
    const [filingStatus, setFilingStatus] = useState("");
    const [w2s, setW2s] = useState([]);
    const [ten99s, setTen99s] = useState([]);
    const [taxOwed, setTaxOwed] = useState(0);
    const [taxOwedValue, setTaxOwedValue] = useState("");

    useEffect(() => {
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
    }, [userSSN, filingStatus]);

    useEffect(() => {
        setTaxOwed(calculateTaxes(w2s, ten99s, filingStatus));
        setTaxOwedValue(Math.abs(taxOwed).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits:2}));
    }, [w2s, ten99s, filingStatus])

    function calculateTaxableIncome(w2Array: W2[], ten99Array: Ten99[], filingStatus: any) {
        let totalWages: number = 0;
        let totalWithheld: number = 0;
        w2Array.forEach((w2) => totalWages = totalWages + w2.wages);
        ten99Array.forEach((ten99) => totalWages = totalWages + ten99.wages);
        w2Array.forEach((w2) => totalWithheld = totalWithheld + w2.fedWithheld);
        ten99Array.forEach((ten99) => totalWithheld = totalWithheld + ten99.fedWithheld);
 
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
        return totalWages - totalWithheld - deduction;


    }

    function calculateTaxes(w2Array: W2[], ten99Array: Ten99[], filingStatus: any) {
        const taxableIncome = calculateTaxableIncome(w2Array, ten99Array, filingStatus);
        if (taxableIncome < 0) {
            return taxableIncome;
        }

        switch (filingStatus) {
            case "S":
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
            case "MJ":
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
            case "MS":
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
            case "H":
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



    if (taxOwed >= 0) {
        return (
            <div className='bg-white padding-y-10 padding-x-10'>
                <GridContainer>
                    <Grid className='bg-white padding-y-10 padding-x-10' row offset={3}>
                        <SummaryBox>
                            <SummaryBoxHeading headingLevel="h3">{t('owe')} ${taxOwedValue} {t('taxes')}</SummaryBoxHeading>
                        </SummaryBox>
                    </Grid>
                </GridContainer>
            </div>
        )
    } else {
        return (
            <div className='bg-white padding-y-10 padding-x-10'>
                <GridContainer>
                    <Grid className='bg-white padding-y-10 padding-x-10' row offset={3}>
                        <SummaryBox className='bg-green border-base-lightest'>
                            <SummaryBoxHeading headingLevel="h3">{t('dontowe')}${taxOwedValue}{t('notax')}</SummaryBoxHeading>
                        </SummaryBox>
                    </Grid>
                </GridContainer>
            </div>
        )
    }


}