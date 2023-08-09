import { Button, Form, Grid, GridContainer, Label, Table, TextInput, Title } from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from '../../api/axiosConfig';
import axios from "axios";
import { selectCurrentSSN} from '../../Slices/AuthSlicer';
import W2Form from "../W2/W2Form";

export default function UserFinancialInfo() {
    const userSSN = 333444555//useSelector(selectCurrentSSN);
    const [userName, setUserName] = useState("");
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
            })
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = ((e) => {

    })

    return(
        <>
        <div className='bg-base-lightest'>
          <GridContainer className="usa-section">
            <Grid row>
                <h1>Welcome {userName}</h1>
            </Grid>
            <Grid row>
                <h3>Here is your financial information. </h3>
            </Grid>
            <Grid row>
                <h2>W2's </h2>
            </Grid>
            {w2Data.map((w2) => {
                return (
                    <>
            <Form  onSubmit={handleSubmit}>
            <div style={{display: 'flex', gap : '259px', width:'300%', flexWrap: 'wrap'}}>
                <Label htmlFor="empTin">EIN</Label>
                <Label htmlFor="wages" style={{transform: 'translate(10px)'}}>Wages</Label>
                <Label htmlFor="fedWithheld">Federal Tax Withheld</Label>
            </div>
            <div style={{display: 'flex', gap : '80px', width: '250%',}}>
                <TextInput id="empTin" name="empTin" type="text" value={w2Data.empTin} onChange={(e) => e.target.value}/>
                <TextInput id="wages" name="wages" type="text" value={w2Data.wages} onChange={(e) => e.target.value}/>
                <TextInput id="fedWithheld" name="fedWithheld" type="text" value={w2Data.fedWithheld} onChange={(e) => e.target.value}/>
            </div>
            </Form>
        </>
                )
            })}
          </GridContainer>
        </div>
        
        
        
        </>
    )
}