import fetchData from "../helpers/fetchData";

export default function getSupplierCarsForFinalClient(supplierName){

        return new Promise((resolve)=>{

              const dataToSend = {

                  requestName: "get-supplier-cars-for-final-client",
                  data:{

                      supplierName: supplierName
                  }
              }

              return fetchData(null, dataToSend).then((response)=>{ 

                if(response.Message === "Data retrieved"){

                    const newData = response?.Data.map((car)=>{

                         car.picture = car?.picture ?? "resources/images/no-car.png";

                         return car;

                    });

                    return resolve({

                        Message: response.Message,
                        Data: newData
                    });

                }

                    return resolve(response);
              });

        });
    
};