import fetchData from "../helpers/fetchData.js";

export default function getConversations(){

     return new Promise((resolve)=>{

           const dataToSend = {

                requestName: "get-conversation",
                data:{}
           }

           return fetchData(null, dataToSend).then((response)=>{

                 return resolve(response);
           });

     });
}