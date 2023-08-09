import { Button, Grid, GridContainer, Table, Title } from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from '../../api/axiosConfig';
import axios from "axios";

export default function Review() {
    const navigate = useNavigate();
    const userSSN = 333444555; //useSelector((state: any) => state.auth.ssn);
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [filingStatus, setFilingStatus] = useState("");
    const [w2Data, setW2Data] = useState([]);
    const [ten99Data, setTen99Data] = useState([]);

    useEffect(() => {
        api.get(`/w2s/${userSSN}`)
            .then(response => {
                setW2Data(response.data);
            })
            .catch(error => console.error(error));
        api.get(`/ten99s/${userSSN}`)
            .then(response => {
                setTen99Data(response.data);
            })
            .catch(error => console.error(error));
        api.get(`/users/user/${userSSN}`)
            .then(response => {
                setUserName(`${response.data.firstName} ${response.data.lastName}`);
                setAddress(`${response.data.streetAddr}, ${response.data.city}, ${response.data.state}, ${response.data.zip}`);
                setPhone(response.data.phone);
                switch(response.data.status) {
                    case "S":
                        setFilingStatus("Single");
                        break;
                    case "MS":
                        setFilingStatus("Married Filing Separately");
                        break;
                    case "MJ":
                        setFilingStatus("Married Filing Jointly");
                        break;
                    case "H":
                        setFilingStatus("Head of Household");
                        break;
                    default:
                        console.log("invalid filing status");
                }
            })
            .catch(error => console.error(error));
    }, []);

    function formatPhoneNumber(number: any) {

        // Check if the cleaned number is a valid length
        if (number?.length === 10) {
            const areaCode = number.slice(0, 3);
            const firstPart = number.slice(3, 6);
            const secondPart = number.slice(6);

            return `(${areaCode}) ${firstPart}-${secondPart}`;
        } else {
            // If the input does not have a valid length, return the original input
            return number;
        }
    }

    function formatSSN(ssn: any) {
      
        // Check if the cleaned SSN is a valid length
        if (ssn?.length === 9) {
          const firstPart = ssn.slice(0, 3);
          const secondPart = ssn.slice(3, 5);
          const thirdPart = ssn.slice(5);
      
          return `${firstPart}-${secondPart}-${thirdPart}`;
        } else {
          // If the input does not have a valid length, return the original input
          return ssn;
        }
      }

    return(
        <>
        <div className='bg-base-light'>
          <GridContainer className="usa-section">
            <Grid row>
                <Title>Review</Title>
            </Grid>
            <Grid row>
                <h3>Please ensure all of your personal and financial information is correct. </h3>
            </Grid>
            <Grid row>
                <h3>Personal Information </h3>
            </Grid>
            <Table bordered={true}>
                <tbody>
                    <tr>
                        <td scope="col"><b>Name: </b>{userName}</td>
                    </tr>
                    <tr>
                        <td scope="col"><b>Address: </b>{address}</td>
                    </tr>
                    <tr>
                        <td scope="col"><b>Phone Number: </b>{formatPhoneNumber(phone)}</td>
                    </tr>
                    <tr>
                        <td scope="col"><b>Social Security Number: </b>{formatSSN(userSSN)}</td>
                    </tr>
                    <tr>
                        <td scope="col"><b>Filing Status: </b>{filingStatus}</td>
                    </tr>
                </tbody>
            </Table>
            <Grid row>
                <h3>Financial Information </h3>
            </Grid>  
            <Table bordered={false}>
                <thead>
                    <tr>
                        <th scope="col">Document Type</th>
                        <th scope="col">EIN/Payer TIN</th>
                        <th scope="col">Wages/Compensation</th>
                        <th scope="col">Federal Tax Withheld</th>
                    </tr>
                </thead>
                <tbody>
                    {w2Data.map((w2) => {
                        return (
                            <tr key={w2.empTin}>
                                <td>W2</td>
                                <td>{w2.empTin}</td>
                                <td>{w2.wages}</td>
                                <td>{w2.fedWithheld}</td>
                            </tr>
                        )
                    })}
                    {ten99Data.map((ten99) => {
                        return (
                            <tr key={ten99.payerTin}>
                                <td>1099</td>
                                <td>{ten99.payerTin}</td>
                                <td>{ten99.wages}</td>
                                <td>{ten99.fedWithheld}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Grid row>
              <Grid className="proceed" col = {5} offset = {8}>
                <h4>If everything is correct, please proceed.</h4>
              </Grid>
            </Grid>
            <Grid row>
              <Grid tablet={{ col: true }}>
                <Button type="button" onClick={(e) =>{ navigate('/calculate')}} >Back</Button>   
              </Grid>
              <Grid col = {9}></Grid>
              <Grid tablet={{ col: true }}>
                <Button type="button" onClick={(e) => {navigate('/results'); }}>Results</Button>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
        
        
        
        </>
    )
}