import fetchData from "../helpers/fetchData";

export default function getHomeList(userRole){

     return new Promise((resolve)=>{

           const dataToSend = {

                requestName: "get-home-list",
                data:{

                    userRole: userRole
                }
           }

           return fetchData(null, dataToSend).then((response)=>{

                if(response.Message === "Data retrieved"){

                     return resolve({

                         Message: "Data retrieved",
                         Data: response?.Data
                     });
                }

                return resolve(response);
           });
     });
}