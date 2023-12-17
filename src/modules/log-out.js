import fetchData from "../helpers/fetchData";

export function logOut(userType){

     return new Promise((resolve)=>{

            const dataToSend = {

                 requestName: "user-log-out",
                 data:{
                    
                     userType: userType
                 }
            };


            return fetchData(null, dataToSend).then((response)=>{

                 return resolve(response);
            });

     });
}