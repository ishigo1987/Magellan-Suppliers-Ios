import fetchData from "../helpers/fetchData.js";

export function signIn(email, code){

      return new Promise((resolve)=>{

            const mailFormatRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if([email, code].includes("") === true){

                  return resolve({Message: "fieldsEmpty"});
            }

            if(mailFormatRegex.test(email) === false){

                  return resolve({
  
                        Message: "badEmail"
                  });
  
            }

            const dataToSend = {

                  requestName: "login-user",
                  data:{

                        email: email,
                        authenticationCode: code,
                        userRole: "users"  // This role is used because when at this point the jwtoken does not exist
                  }
            }

            return fetchData(null, dataToSend).then((response)=>{

                  return resolve(response);
            })

            

      });
}