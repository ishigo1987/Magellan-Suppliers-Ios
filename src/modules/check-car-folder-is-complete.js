import fetchData from "../helpers/fetchData";

export default function checkCarFolderIsComplete(carId){

        return new Promise((resolve)=>{

                if(["", undefined].includes(carId) === true){

                     return resolve({Message: "Pas d'identifiant pour la voiture"});
                }

                const dataToSend = {

                      requestName: "check-car-folder-is-complete",
                      data:{

                          carId: carId
                      }
                }

                return fetchData(null, dataToSend).then((response)=>{

                        return resolve(response);
                })

        });
}