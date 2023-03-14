//import useState from react
import { useState } from "react";

//import custom styles from
import { PayBillAmountIn, PayBillAmountInText, 
         PayBillAmoutCont, PayBillButton, 
         PayBillButtonDiv, PayBillButtonTwo,
         PayBillContainer, PayBillForm,
         PayBillGroup, PayBillHeader,
         PayBillInnerContainer, PayBillInput, 
         PayBillLabel, PayBillPrice, PayBillSQLInText 
        } from "./pay-bill.styles";

//import react phone put 2 library
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';

//import select
import Select from "react-select";

//importing custom dropdown 
import Dropdown from "../dropdown/dropdown";
import { customStyles } from "../../utils/utils";

// importing options from utils
import { airtimeOptions } from "../../utils/utils";
import { DropdownSelectType } from "../../types/types";

// get service name
import { useLocation } from "react-router-dom";

// react-redux
import {useSelector} from 'react-redux'
import { RootState } from "../../store/store";

//JSX Component
const PayBill = () => {
    // use params to get services
    const location = useLocation()
    const category = location.state

    // selector
    const bills = useSelector((state: RootState) => state?.currentUser?.bills)
    //rewards
    const rewards = useSelector((state: RootState) => state?.currentUser?.rewards)
    console.log(rewards);
   console.log(bills, 'bills')

   const billsName = bills?.map((bill : any) => ({
    value: bill.name,
    label: bill.name,
   }))

   const amount = bills?.map((bill : any) => (
      bill.amount
   ))

   const [selectedOption, setSelectedOption] : any = useState("");

   const result = bills?.find((bill: any) => bill.name === selectedOption?.value)

   console.log(result, amount)
    // use state initial values
    const [phone, setPhone] : DropdownSelectType = useState("");
  return (
    <PayBillContainer>
        <PayBillInnerContainer>
            <PayBillHeader>{
             `${category} Recharge`}</PayBillHeader>

            <PayBillForm>
                <PayBillGroup>
                    <PayBillLabel>Phone Number</PayBillLabel>
                    <PhoneInput
                        country={bills[0]?.country.toLowerCase()}
                        regions={'africa'}
                        value={phone}
                        onChange={phone => setPhone(phone)}
                        inputStyle={{
                            width: '100%',
                            fontSize: '0.8rem',
                            color : "grey",
                            borderRadius: '4px',
                            boxShadow: 'none',
                            boxSizing: 'border-box',
                            paddingLeft : '5rem',
                            border : 'none',
                        }}
                        dropdownStyle={{
                            borderRadius: '4px',
                            boxShadow: 'none',
                            boxSizing: 'border-box',
                        }}
                        buttonStyle={{
                            border : 'none',
                            padding : '0 1rem',
                            backgroundColor : 'white',
                            height : '80%',
                            borderRight : '1px solid #959595',
                            top : "50%",
                            transform : "translateY(-50%)"
                        }}
                        containerStyle={{
                            border : '1px solid #959595',
                            borderRadius : '4px',
                            backgroundColor : "white",
                            padding : '0.5rem',
                        }}
                        />
                    </PayBillGroup>

                <PayBillGroup>
                    <PayBillLabel>Network Provider</PayBillLabel>
                    <Select
                        options={billsName}
                        styles={customStyles}
                        //@ts-ignore
                        defaultValue={selectedOption}
                        onChange={(e : any) => setSelectedOption(e)}
                        />
                </PayBillGroup>

                <PayBillGroup>
                    <PayBillLabel>Amount</PayBillLabel>
                    <PayBillAmoutCont>
                    
                        <PayBillInput
                           type = "text" 
                           value={amount[0] === "0" ? "" : result?.amount }
                        />
                        <PayBillAmountIn>
                            <PayBillAmountInText>Amount in</PayBillAmountInText>
                            <PayBillSQLInText>SQL: 10</PayBillSQLInText>
                        </PayBillAmountIn>
                    </PayBillAmoutCont>
                </PayBillGroup>

                <PayBillButtonDiv>
                    <PayBillButton>
                        Pay back with 
                        <img src="/assets/Vector.png" className = "payBackIcon" alt="" />
                        <span className="boldText">Pay</span>
                    </PayBillButton>

                    <PayBillButtonTwo>
                        Pay with Cashback Balance
                    </PayBillButtonTwo>
                    <PayBillPrice>N{rewards?.data?.balance}</PayBillPrice>

                </PayBillButtonDiv>

                
                
            </PayBillForm>
        </PayBillInnerContainer>
    </PayBillContainer>    
)
}

export default PayBill