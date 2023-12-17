import fetchData from "../helpers/fetchData";

import convertToArrayBuffer from "../helpers/convertToArrayBuffer.js";

import getTheFirstSixBytes from "../helpers/getTheFirstSixBytes.js";

export default function addNewArticleTab(formData){

      const{carPicture, carBrandModelYear, carSerialNumber, carFinalClientName, carDepositDate} = formData;

      //ffd8ff is for Jpg or jpeg, 89504e for Png, 474946 for Gif, 524946 is for webp(riff)

      const allowedFilesBytes = ["ffd8ff", "89504e", "474946", "524946"];

      return new Promise((resolve)=>{

            const userData = Object.values(formData);

            if(userData.includes("") === true || userData.includes(undefined) === true){

                 return resolve({Message: "fieldsEmpty"});
            }

            if(carDepositDate === "Entrez la date de réception de dépôt"){

                return resolve({Message: "fieldsEmpty"});
            }

            const firstSixBytes = getTheFirstSixBytes(carPicture);

            if(allowedFilesBytes.includes(firstSixBytes) === true){

                // We can upload the file

                const dataToSend = {

                    requestName: "add-new-article-tab",
                    data:{
  
                        carBrandModelYear: carBrandModelYear,
                        carSerialNumber: carSerialNumber,
                        carFinalClientName: carFinalClientName,
                        carDepositDate: carDepositDate
                    }
                };

                const options = {

                    method: "POST",
                    body: carPicture,
                    timeout: 2000000,
                    credentials: "same-origin",
                    headers: {
                      "Content-Type": "application/octet-stream",
                      "User-informations": `${JSON.stringify(dataToSend)}`
    
                    }
                }
  
                return fetchData(options, null).then((response)=>{ 

                      return resolve(response);
    
                });
               
            }

            return resolve({Message: "only pictures"});
            

      });
}