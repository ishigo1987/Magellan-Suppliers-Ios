import {Tab,TextView, Button, ScrollView, Composite} from "tabris";

import createInputElement from "../helpers-views/create-input-element.js";

import {primaryTextColor, thirdTextColor, primaryColor, secondaryTextColor} from "../helpers/theme-magellan.js";

import snackbar from "../helpers-views/snackbar.js";

export default function userInformations(){

    const partnersTab = new Tab({

        layoutData: "stretch",
        id: "user-informations"

    }).append(

        new ScrollView({

            layoutData: "stretch"

        }).append(

            new TextView({
    
                left: 15,
                right: 15,
                top:["prev()", 15],
                textColor: primaryTextColor,
                text: "Votre téléphone",
                font: "14px"
    
            }),
    
            createInputElement("phone", "Entrez Votre téléphone", "phone"),

            new TextView({
    
                left: 15,
                right: 15,
                top:["prev()", 15],
                textColor: primaryTextColor,
                text: "Votre adresse",
                font: "14px"
    
            }),
    
            createInputElement("address", "Entrez Votre adresse", "address"),

            // new Button({

            //     top: ["prev()", 10],
            //     left: 15,
            //     right: 15,
            //     height: 60, 
            //     cornerRadius: 10, 
            //     font:"14px late", 
            //     strokeColor: primaryColor,
            //     style: "outline",
            //     text: "Uploader votre k-bis", 
            //     image: {src: "resources/icons/cloud-upload.png", width: 24, height: 24},
            //     imageTintColor: primaryColor,
            //     autoCapitalize: "none",
            // }),

            new Button({

                top: ["prev()", 20],
                left: 15,
                right: 15,
                height: 60, 
                cornerRadius: 10, 
                font:"14px late", 
                background: primaryColor,
                text: "Enrégistrer", 
                textColor:thirdTextColor,
                autoCapitalize: "none",

            }).onSelect(()=>{

                 // Module calling

                 const userStorage = JSON.parse(localStorage.getItem("userInfos"));

                 userStorage.authenticationStatus = "Done";

                 localStorage.setItem("userInfos", JSON.stringify(userStorage));

                 return import("./home.js").then((view)=>{

                      return view.home();

                 });

            }),

            new Composite({

                bottom: 10
            })

        )

    );

    partnersTab.find("#phone").only().keyboard = "phone"

    return partnersTab;
}