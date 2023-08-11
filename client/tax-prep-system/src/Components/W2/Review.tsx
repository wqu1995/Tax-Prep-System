import { Button, Grid, GridContainer, Table, Title } from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from '../../api/axiosConfig';
import axios from "axios";
import { selectCurrentSSN} from '../../Slices/AuthSlicer';
import { useTranslation } from "react-i18next";
import { setStoreW2Data, setStoreTen99Data } from '../../Slices/dataSlice';

export default function Review() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const userSSN = useSelector(selectCurrentSSN);
    //console.log(userSSN)
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [filingStatus, setFilingStatus] = useState("");
    //const [w2Data, setW2Data] = useState([]);
    //const [ten99Data, setTen99Data] = useState([]);
    const w2Data = useSelector((state: any) => state.data.w2Data);
    const ten99Data = useSelector((state: any) => state.data.ten99Data);
    const dispatch = useDispatch();

    useEffect(() => {
        if(userSSN != null){
            api.get(`/w2s/${userSSN}`)
                .then(response => {
                    //setW2Data(response.data);
                    dispatch(setStoreW2Data(response.data));
                })
                .catch(error => console.error(error));
            api.get(`/ten99s/${userSSN}`)
                .then(response => {
                    //setTen99Data(response.data);
                    dispatch(setStoreTen99Data(response.data));
                })
                .catch(error => console.error(error));
            api.get(`/users/user/${userSSN}`)
                .then(response => {
                    setUserName(`${response.data.firstName} ${response.data.lastName}`);
                    setAddress(`${response.data.streetAddr}, ${response.data.city}, ${response.data.state}, ${response.data.zip}`);
                    setPhone(response.data.phone);
                    switch(response.data.status) {
                        case "S":
                            setFilingStatus(t('status2'));
                            break;
                        case "MS":
                            setFilingStatus(t('status4'));
                            break;
                        case "MJ":
                            setFilingStatus(t('status3'));
                            break;
                        case "H":
                            setFilingStatus(t('status5'));
                            break;
                        default:
                            console.log(t('status6'));
                    }
                })
                .catch(error => console.error(error));
        }
    }, [userSSN, w2Data, ten99Data]);

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
        <div className='bg-base-lightest'>
          <GridContainer className="usa-section">
            <Grid row>
                <Title>{t('Review')}</Title>
            </Grid>
            <Grid row>
                <h3>{('please')} </h3>
            </Grid>
            <Grid row>
                <h3>{t('personalInfoLabel')} </h3>
            </Grid>
            <Table bordered={false}>
                <tbody>
                    <tr>
                        <td scope="col"><b>{t('nameLabel')}: </b>{userName}</td>
                    </tr>
                    <tr>
                        <td scope="col"><b>{t('fullAddLabel')}: </b>{address}</td>
                    </tr>
                    <tr>
                        <td scope="col"><b>{t('phoneLabel')}: </b>{formatPhoneNumber(phone)}</td>
                    </tr>
                    <tr>
                        <td scope="col"><b>{t('ssnLabel')}: </b>{formatSSN(userSSN)}</td>
                    </tr>
                    <tr>
                        <td scope="col"><b>{t('fillingStatusLabel')}: </b>{filingStatus}</td>
                    </tr>
                </tbody>
            </Table>
            <Grid row>
                <h3>{t('financialLabel')}</h3>
            </Grid>  
            <Table bordered={false}>
                <thead>
                    <tr>
                        <th scope="col">{t('documentType')}</th>
                        <th scope="col">{t('ein/tin')}</th>
                        <th scope="col">{t('wages/comp')}</th>
                        <th scope="col">{t('fedwith')}</th>
                    </tr>
                </thead>
                <tbody>
                    {w2Data.map((w2: any) => {
                        return (
                            <tr key={w2.w2Id.empTin}>
                                <td>W2</td>
                                <td>{w2.w2Id.empTin}</td>
                                <td>{w2.wages}</td>
                                <td>{w2.fedWithheld}</td>
                            </tr>
                        )
                    })}
                    {ten99Data.map((ten99: any) => {
                        return (
                            <tr key={ten99.ten99Id.payerTin}>
                                <td>1099</td>
                                <td>{ten99.ten99Id.payerTin}</td>
                                <td>{ten99.wages}</td>
                                <td>{ten99.fedWithheld}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Grid row>
              <Grid className="proceed" col = {5} offset = {8}>
                <h4>{t('correctMsg')}</h4>
              </Grid>
            </Grid>
            <Grid row>
              <Grid tablet={{ col: true }}>
                <Button type="button" onClick={(e) =>{ navigate('/financialInfo')}} >{t('backBtn')}</Button>   
              </Grid>
              <Grid col = {9}></Grid>
              <Grid tablet={{ col: true }}>
                <Button type="button" onClick={(e) => {navigate('/results'); }}>{t('result')}</Button>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
        
        
        
        </>
    )
}