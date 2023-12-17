import fetchData from "../helpers/fetchData";

export default function getMessages(senderName){

     return new Promise((resolve)=>{

           if([undefined, "", null].includes(senderName) === true){

                return resolve(false);
           }

           const dataToSend = {

               requestName: "get-messages-from-sender",
               data:{
                  
                   senderName: senderName
               }
           };

           return fetchData(null, dataToSend).then((response)=>{

                return resolve(response)
           })

     });
}