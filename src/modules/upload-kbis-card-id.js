import fetchData from "../helpers/fetchData.js";

import convertToArrayBuffer from "../helpers/convertToArrayBuffer.js";

import getTheFirstSixBytes from "../helpers/getTheFirstSixBytes.js";

export default function uploadKbisCardId(file, cardId){

      return new Promise((resolve)=>{

          //ffd8ff is for Jpg or jpeg, 89504e for Png, 474946 for Gif, 524946 is for webp(riff) and 255044 is for pdf

          const allowedFilesBytes = ["ffd8ff", "89504e", "474946", "524946", "255044"];

          const firstSixBytes = getTheFirstSixBytes(file);

          if(allowedFilesBytes.includes(firstSixBytes) === true){
 
                // We can upload the file

                const dataToSend = {

                    requestName: "upload-final-client-kbis-card-id",
                    data:{

                        cardId: cardId
                    }
                }

                const options = {

                    method: "POST",
                    body: file,
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

           return resolve({Message: "File not handle"});
        
      });
}