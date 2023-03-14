// import axios from axios
import ABI from './ABI.json'
import axios from 'axios';
import { setBills, setRewards } from '../store/user/user.reducer';
import { alert, close } from '../store/alert/alert.modal.reducer';
import { Connection, PublicKey, clusterApiUrl , sendAndConfirmTransaction} from "@solana/web3.js";
import {
	Program,
	AnchorProvider,
	web3,
	utils,
	BN,
} from "@project-serum/anchor";
import type { Cluster } from '@solana/web3.js';
// import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { parseURL, createTransfer } from '@solana/pay';
window.Buffer = Buffer;

const programID = new PublicKey(ABI.metadata.address);
const network = clusterApiUrl("devnet");
const opts = {
	preflightCommitment: "processed",
};
const { SystemProgram } = web3;




/**
 * Establish a connection to the cluster
 */
export async function establishConnection(cluster: Cluster = 'devnet'): Promise<Connection> {
    const endpoint = clusterApiUrl(cluster);
    const connection = new Connection(endpoint, 'confirmed');
    const version = await connection.getVersion();
    console.log('Connection to cluster established:', endpoint, version);

    return connection;
}


const getProvider = () => {
    //@ts-ignore
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
        connection,
        //@ts-ignore
        window.solana,
        //@ts-ignore
        opts.preflightCommitment
    );
    return provider;
};

// base URL
const baseUrl : string = 'https://solpayplus-server.herokuapp.com'

// get rewards
export const getRewards = async (walletAddress : string| null, dispatch: any, Navigate : any) => {
     axios.get(`${baseUrl}/user/${walletAddress}`).
     then((response) => {
        if(response) {
            dispatch(setRewards(response.data))
            Navigate('/transactions');
        }   
     })    
}

// get bills
 export const getBills = async (countryCode : any, category : any, Navigate : any, dispatch : any) => {
    console.log(countryCode, category)
    dispatch(alert('Getting Bills ⌛️'));
    setTimeout(() => {
       dispatch(close(""));
     }, 1200);

     axios.post(`${baseUrl}/bill/category`, {
        country : countryCode,
        category : category
     }).then((response)=> {
        console.log(response.data?.data)
        if(response) {
            dispatch(setBills(response?.data?.data))
            Navigate('/payment' , {state : category})
        }
     })
 }

 //  rewards;
 export const userRewards = async (walletAddress :string |null, dispatch : any) => {
    axios.get(`${baseUrl}/user/${walletAddress}`)
    .then((response) =>{
         console.log(response.data);
        dispatch(setRewards(response?.data))
    })
 }

 // sort user;
 export const sortUser = async (walletAddress : any) => {
    axios.get(`${baseUrl}/user/${walletAddress}`)
     .then(async (response) => {
        if(!response?.data?.message) {
            try {
                const provider = getProvider();
                //@ts-ignore
                const program = new Program(ABI, programID, provider);
                const [sppuser] = await PublicKey.findProgramAddress(
                    [
                        utils.bytes.utf8.encode("SOLPAYPLUS"),
                        provider.wallet.publicKey.toBuffer(),
                    ],
                    program.programId
                );
                await program.rpc.createAccount({
                    accounts: {
                        sppuser,
                        user: provider.wallet.publicKey,
                        systemProgram: SystemProgram.programId,
                    },
                });
                console.log(
                    "Created a new user w/ address:",
                    sppuser.toString()
                );
            } catch (error) {
                console.error("Error creating user account:", error);
            }
        }
     })
 }
 
 export const payWithSolanaPay = async(publicKey : any, usdAmount: any, labelName : any, dispatch : any, country :any, customer : any, type: any, naira : any) => {
    console.log(usdAmount*750)
    dispatch(alert("Generating connection 🚀"));
    console.log(usdAmount/25)
     const connection = await establishConnection();
     setTimeout(() => {
        dispatch(close(""))
    }, 700)
     console.log(connection);
    axios.post(`${baseUrl}/payment/initialize`, {
        amount : (usdAmount/25).toFixed(4) ,
        label : labelName
      }).then(async (response : any) => {
          if (response) {
            console.log(response?.data?.data?.url, "url")
            const url = response?.data?.data?.url
            const payer = publicKey;
            const { recipient, amount, splToken, reference, label, message, memo }: any= parseURL(url);
            console.log(reference.toString());
            dispatch(alert("Making payment with Solana-pay 💸"));
            const tx = await createTransfer(connection, payer, { recipient, amount, reference, memo });
            setTimeout(() => {
                dispatch(close(""))
            }, 700)
            console.log(tx);
            dispatch(alert("Confirming Transaction ⌛️"));
            //@ts-ignore
           let signed = await getProvider().wallet.signTransaction(tx)
           let signature = await connection.sendRawTransaction(signed.serialize());
           await connection.confirmTransaction(signature);
           setTimeout(() => {
            dispatch(close(""))
        }, 700)
           if(signature) {
            dispatch(alert("Creating Bill 📃"));
            console.log({
                country,
                customer,
                amount : naira,
                amount_paid : amount,
                type,
                reference : reference.toString(),
                recurrence : "ONCE"
             })
            console.log(amount, "amount")
            axios.post(`${baseUrl}/bill`, {
                country,
                customer,
                amount : naira,
                amount_paid : amount,
                type,
                reference : reference.toString(),
                recurrence : "ONCE"
             }).then ((response ) => {
                if(response) return dispatch(alert(`${type} Paid ✅`));
            })
           }
            
          }
      })
   
   
 }

 // for electricity and cables
 export const getCustomerName = (customer : any, billerCode : any, name : any, item : any) => {
    console.log(customer, billerCode, item)
      axios.post(`${baseUrl}/bill/validate`, {
        item_code : item,
        code : billerCode,
        customer
      }). then((response) => {
             name(response.data.data.data.name)
      })
 }