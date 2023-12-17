import fetchData from "../helpers/fetchData";

export default function getFinalClientCar(clientName){

     return new Promise((resolve)=>{

            if([undefined, ""].includes(clientName) === true){

                 return resolve(false);
            } 

            const dataToSend = {

                 requestName: "get-final-client-car",
                 data:{

                     finalClientName: clientName
                 }
            }

            return fetchData(null, dataToSend).then((response)=>{

                if(response.Message === "Data retrieved"){

                    const newData = response?.Data.map((car)=>{

                         car.picture = car?.picture ?? "resources/images/no-car.png";

                         car.comment = car?.comment ?? "Pas de commentaire pour cette voiture.";

                         return car;

                    });

                    return resolve({

                        Message: response.Message,
                        Data: newData
                    });
                }

                 return resolve(response);
            })
     });
}