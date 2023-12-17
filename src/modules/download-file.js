import { url } from "../helpers/config-magellan";

export default function downloadFile(file, contentType){ 

      return new Promise((resolve)=>{

            const options = {

                  method: "GET",
                  timeout: 8000,
                  credentials: "same-origin",
                  headers: {
                    "Content-Type": contentType,
                  }
            }

            return fetch(`${url}/${file}`, options).then((response)=>{

                  return response.blob();

            }).then((result)=>{

                  return resolve({

                        Message: "Download ok",
                        Data: result
                  })

            }).catch((error)=>{

                  return resolve({Message: "Problem with download"});
            })

      });
}