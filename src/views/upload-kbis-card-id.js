import { ImageView, TextView, Button, Composite, contentView, ActionSheet } from "tabris";

import { areaBackground, primaryColor, secondaryTextColor, iconDark } from "../helpers/theme-magellan";

import viewAnimationEntrance from "../helpers-views/animation-view-entrance.js";

import uiCloseWithText from "../helpers-views/ui-close-with-text.js";

import {setHorizontal, openHorizontal} from "../helpers/config-magellan.js";

import closeView from "../helpers-views/close-view.js";

import getPictureFromDevice from "../helpers-views/get-picture-from-device.js";

import uploadKbisCardId from "../modules/upload-kbis-card-id.js";

import toast from "../helpers-views/toast.js";

import loader from "../helpers-views/loader.js";

import commonServerErrors from "../helpers/common-server-errors";

import checkCarFolderIsComplete from "../modules/check-car-folder-is-complete";

export default function uploadKbisCardId(cardId){

    const area = new Composite({

        layoutData: "stretch",
        background: areaBackground, 
        transform: setHorizontal,
        id: 'import-kbis-view', 
        class: 'activeView'

    }).append(

        new Composite({

            top: 0, 
            left: 0, 
            right: 0, 
            height: 57, 
            background: primaryColor, 
            elevation: 3

        }),

        new TextView({

             left: 15,
             right: 15,
             alignment: "centerX",
             centerY: 0,
             font: "16px",
             text: "Veuillez nous envoyer pour la première fois, ou bien mettre à jour votre K-bis ou votre carte d'identité.",
             textColor: secondaryTextColor

        }),

        new Button({

            top: ["prev()", 15],
            text:"Uploader",
            cornerRadius: 7,
            centerX:0,
            textColor: secondaryTextColor,
            height:45,
            font: "15px",
            image: { src: 'resources/icons/upload.png', width: 16, height: 16 },
            imageTintColor: iconDark,
            style: "outline",
            autoCapitalize: "none",
            strokeColor: primaryColor

        }).onSelect(()=>{

            return getPictureFromDevice().then((result)=>{

                  loader("Envoi du fichier en cours...", true);

                  return uploadKbisCardId(result, cardId).then((response)=>{

                        loader("", false);

                        if(response?.Message === "Upload ok"){

                                toast("Document mis à jour", 3000, "bottom");

                                return closeView(area);

                        }

                        return toast(commonServerErrors(response.Message), 3000, "bottom");

                  });
            });
        }),

        uiCloseWithText(backButtonCallback, `Importer son Kbis ou son Id`),

    ).onDispose(()=>{

         // When the modification page is closed, we check if the folder is complete or not

         return checkCarFolderIsComplete(cardId);

    }).appendTo(contentView);

    return viewAnimationEntrance(area);

   function backButtonCallback(){ 
       
       return closeView(area);

   }
}