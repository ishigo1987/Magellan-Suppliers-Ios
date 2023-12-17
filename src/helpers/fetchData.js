
/** 
   * This helper is used to retrieve and send data to the server
   * @param {headers} object
   * @param {requestData} string
   * @param {url} string
   * @return {promise} object
*/

import { app } from "tabris";

import {url} from "./config-magellan.js";

export default function fetchData(options, requestData){ 

    return new Promise((resolve)=>{

        const userToken = localStorage.getItem("token");

        options = options ?? {

            method: "POST",
            body:JSON.stringify(requestData),
            timeout: 8000,
            credentials: "same-origin",
            headers: {
              "Content-Type": "text/json",
            }
        };


        options.headers.Authorization = `Bearer ${userToken}`;

        return fetch(url, options).then((response)=>{

            return response.json();

        }).then((result)=>{

            if(result.Message === "Token expired"){

                localStorage.clear();

                return app.reload();
            }
           
            return resolve(result);

        }).catch((error)=>{
             
            // Do not change this response

             return resolve({Message: "Problem with database or request"});

        });

     });

}
