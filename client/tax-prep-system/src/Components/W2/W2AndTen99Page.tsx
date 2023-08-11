import { Accordion, Button, Grid, GridContainer, Header, Title} from "@trussworks/react-uswds";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { addNewTen99Form } from "../../Slices/Ten99Slice";
import { AccordionItem, AccordionItemProps } from "@trussworks/react-uswds/lib/components/Accordion/Accordion";
import W2Form from "./W2Form";
import { addNewW2Form } from "../../Slices/W2Slice";
import Ten99Form from "../Ten99/Ten99Form";
import api from '../../api/axiosConfig';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


var w2InitialArray: AccordionItemProps[] = [{
  title: 'W2 #1',                               //TODO: TRY CSS STYLING
  content:<W2Form index={0}/>,
  expanded: false,
  id: 'w2-1',
  headingLevel: 'h4',
}]

var ten99InitialArray: AccordionItemProps[] = [{
  title: '1099 #1',
  content: <Ten99Form index={0}/>,
  expanded: false,
  id: '1099-1',
  headingLevel: 'h4',
}]

//page for the calculation component when user first register the site
export default function W2AndTen99Page() {
    const {t} = useTranslation();

    const [w2Array, setw2Array] = useState(w2InitialArray);
    const [ten99Array, setTen99Array] = useState(ten99InitialArray);
    const ten99FormArray = useSelector((state: any) => state.ten99s);
    const dispatch = useDispatch();
    const [w2OrTen99, setw2OrTen99] = useState("w2");
    const w2FormArray = useSelector((state:any) => state.w2s);
    const userSSN = useSelector((state: any) => state.auth.ssn);
    const navigate = useNavigate();

    function incrementw2Array() {
      dispatch(addNewW2Form());
      setw2Array([...w2Array, {
        title: `W2 #${w2Array.length + 1}`,
        content: <W2Form index={w2FormArray.forms.length}/>,
        expanded: false,
        id: `w2-${w2Array.length + 1}`,
        headingLevel: 'h4',
    }])
    }

    function incrementTen99Array() {
      dispatch(addNewTen99Form());
      setTen99Array([...ten99Array, {
        title: `1099 #${ten99Array.length + 1}`,
        content: <Ten99Form index={ten99FormArray.forms.length}/>,
        expanded: false,
        id: `ten99-${ten99Array.length + 1}`,
        headingLevel: 'h4',
    }])
    }

    function submitAllW2AndTen99() {
      console.log(w2FormArray)
      if (w2FormArray.forms[0].empTin > 0) {
        w2FormArray.forms.forEach((w2: any) => {
          api.post('/w2s/w2', {
            "w2Id": {
              "social": userSSN,
              "empTin": w2.empTin
            },
            "wages": w2.wages,
            "fedWithheld": w2.fedWithheld
          }).then(response => {
  
          }).catch(error => {
            console.error("Error:", error);
          })
          });
      }

      if (ten99FormArray.forms[0].payerTin > 0) {
        ten99FormArray.forms.forEach((ten99: any) => {
          api.post('/ten99s/ten99', {
            "ten99Id": {
              "social": userSSN,
              "payerTin": ten99.payerTin
            },
            "wages": ten99.wages,
            "fedWithheld": ten99.fedWithheld
          }).then(response => {
  
          }).catch(error => {
            console.error("Error:", error);
          })
          });
      }

        navigate('/review');
    }

    if (w2OrTen99 === "w2") {
      return (
        <>
        <div className='bg-base-lightest'>
          <GridContainer className="usa-section">
            <Grid row>
              <Title>{t('w2Title')}</Title>
            </Grid>
            <Grid row>
              <h3>{t('addW2')}</h3>
            </Grid>
            <Grid row>
              <Accordion items={w2Array} multiselectable={true} />
            </Grid>
            <Grid row>
              <Grid col = {5} offset = {10}>
                <h4>{t('addMoreW2')}</h4>
              </Grid>
              <Grid col = {2} offset = {10}>
                <Button className="AddW2" id="newW2" type="button" onClick={() => {incrementw2Array()}}>{t('addNewW2')}</Button>
              </Grid>
            </Grid>
            <Grid row>
              <Grid tablet={{ col: true }}>
                <Button type="button" onClick={() => navigate('/review')}>{t('backBtn')}</Button>   
              </Grid>
              <Grid col = {9}></Grid>
              <Grid tablet={{ col: true }}>
                <Button type="button" onClick={(e) =>{e.preventDefault(); setw2OrTen99("ten99")}}>{t('nextBtn')}</Button>
              </Grid>
            </Grid>
          </GridContainer>
          </div>
        </>
      )
    }
    return (
        <>
        <div className='bg-base-lightest'>
          <GridContainer className="usa-section">
            <Grid row>
              <Title>{t('w2Title')}</Title>
            </Grid>
            <Grid row>
              <h3>{t('add1099')}</h3>
            </Grid>  
            <Accordion items={ten99Array} multiselectable={true}/>
            <Grid row>
              <Grid col = {5} offset = {10}>
                <h4>{t('addMore1099')}</h4>
              </Grid>
              <Grid className="Add1099" col = {3} offset = {9}>
                <Button id="newTen99" type="button" onClick={() => {incrementTen99Array()}}>{t('addNew1099')}</Button>
              </Grid>
            </Grid>
            <Grid row>
              <Grid tablet={{ col: true }}>
                <Button type="button" onClick={(e) =>{ e.preventDefault(); setw2OrTen99("w2")}} >{t('backBtn')}</Button>   
              </Grid>
              <Grid col = {9}></Grid>
              <Grid tablet={{ col: true }}>
                <Button type="button" onClick={(e) => {submitAllW2AndTen99(); }}>{t('nextBtn')}</Button>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
        </>
    )
}