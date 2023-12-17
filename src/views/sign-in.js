import {Tab,TextView, Button} from "tabris";

import createInputElement from "../helpers-views/create-input-element.js";

import {primaryTextColor, thirdTextColor, primaryColor, secondaryTextColor} from "../helpers/theme-magellan.js";

import snackbar from "../helpers-views/snackbar.js";

import commonServerErrors from "../helpers/common-server-errors.js";

import loader from "../helpers-views/loader.js";

import openOnWebview from "../helpers-views/open-on-webview.js";

export default function signIn(){

     const partnersStorage = JSON.parse(localStorage.getItem("userInfos"));

     const signInTab = new Tab({

          layoutData: "stretch",
          id: "sign-in"

     }).onTap(()=>{

        // Important for view transparence 
     }).append(

          new TextView({

               left: 15,
               right: 15,
               top:15,
               textColor: primaryTextColor,
               text: "Votre email",
               font: "14px"
 
          }),
 
          createInputElement("email", "Entrez votre adresse mail", "email"),

          new TextView({

            left: 15,
            right: 15,
            top: ["prev()", 15],
            textColor: primaryTextColor,
            text: "Code confidentiel",
            font: "14px"

         }),

          createInputElement("lock", "Entrez votre code confidentiel", "code"),

          new Button({

               top: ["prev()", 20],
               left: 15,
               right: 15,
               height: 60, 
               cornerRadius: 10, 
               font:"14px late", 
               background: primaryColor,
               text: "Suivant", 
               textColor:thirdTextColor,
               autoCapitalize: "none",

          }).onSelect(()=>{

               const emailValue = signInTab.find("#email").only().text;

               const codeValue = signInTab.find("#code").only().text;

               loader("Connexion en cours...");

               return import("../modules/sign-in.js").then((module)=>{

                    return module.signIn(emailValue, codeValue).then((response)=>{

                         loader("", false);

                         if(response.Message === "Connection done"){

                               localStorage.setItem("userInfos", JSON.stringify({

                                   authenticationStatus: "userInformations",
                                   userRole: response?.Data?.userRole
                               }));

                               localStorage.setItem("token", response?.Data?.token);

                               if(response?.Data?.userRole === "final-client"){

                                   return import("./home-final-client.js").then((view)=>{

                                        view.homeFinalClient();

                                        return signInTab.parent().dispose();
                                   });

                               }

                               return import("./home.js").then((view)=>{

                                     view.home();

                                     return signInTab.parent().dispose();
                               
                               });
      
                         }

                         return snackbar(signInTab,  commonServerErrors(response.Message), 3000);
                              

                    });
               });

          }),

          new TextView({ 
               
               top: ['prev()', 15], 
               alignment: 'centerX', 
               left: 15, 
               right: 15, 
               markupEnabled: true, 
               textColor: secondaryTextColor, 
               text: `En vous authentifiant en tant que partenaire sur Magellan transit, vous acceptez nos<a href='./resources/html/cgu.html' textColor=${primaryColor}> Conditions générales d'utilisation</a> et notre <a href='./resources/html/confidential-politic.html' textColor=${primaryColor}> Politique de confidentialité.</a>`, 
               font: "13px late" 
          }).onTapLink(({url})=>{

               openOnWebview(url)

          })

     )

     return signInTab;
}
