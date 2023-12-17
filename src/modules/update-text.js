import fetchData from "../helpers/fetchData";

export default function updateText(text, id, fieldName){

     return new Promise((resolve)=>{

            if([text, id, fieldName].includes("") === true || [text, id, fieldName].includes(undefined) === true){

                  return resolve({Message: "fieldsEmpty"});
            }

            const dataToSend = {

                  requestName: "update-text",
                  data:{

                      text: text.toUpperCase(),
                      carId: id,
                      carFieldName: fieldName
                  }
            };

            return fetchData(null, dataToSend).then((response)=>{

                    return resolve(response);

            });
          
     });
};