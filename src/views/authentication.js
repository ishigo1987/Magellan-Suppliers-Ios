import {contentView, TextView, Composite, TabFolder, Button, ImageView} from "tabris";

import { areaBackground, primaryColor } from "../helpers/theme-magellan.js";

import headerBodyTexts from "../helpers-views/header-body-texts.js";

import signIn from "./sign-in.js";

import userInformations from "./user-informations.js";

import toast from "../helpers-views/toast.js";

/** 
   * This view display the employees sign in view
   * @param {} 
   * @return {Composite} Ui object type
*/

export function authentication(){

    const userStorage = JSON.parse(localStorage.getItem("userInfos"));

    new Composite({

        layoutData: "stretch",
        background: areaBackground, 
        id: 'authentication', 
        class: 'activeView'

    }).append(

        new Composite({

            top: 0,
            left: 0,
            right: 0,
            padding:15,
            height: 220,
            background: primaryColor,
            id: "header"
        }).append(

            headerBodyTexts("Authentifiez vous", "En tant que fournisseur ou client final de Magellan transit, veuillez rentrer vos informations d'authentification.")

        ),

        new TabFolder({

            top: ["prev()", 0],
            bottom: 0,
            left: 0,
            right: 0,
            paging: false,
            tabBarLocation: "hidden",
            id: "authentication-tabfolder"
           
        }).append(

             signIn(),

             userInformations(),

        ).onSelectionChanged(({target})=>{

            return setTimeout(()=>{

                 target.paging = false;
                 
            },500);
        })


    ).appendTo(contentView);


    // if(userStorage !== null){

    //     if(userStorage.authenticationStatus === "userInformations"){

    //         return $("#authentication-tabfolder").only().selectionIndex = 1;
            
    //     }

    //     return true;

    // }

    return true;

    
};