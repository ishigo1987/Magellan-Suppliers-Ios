import{TextView, contentView, Composite, PdfView, ImageView, ActivityIndicator} from "tabris";

import uiCloseWithText from "./ui-close-with-text";

import {setHorizontal, openHorizontal} from "../helpers/config-magellan.js";

import { primaryColor,areaBackground } from "../helpers/theme-magellan.js";

import viewAnimationEntrance from "./animation-view-entrance.js";

import closeView from "./close-view.js";

import createElement from "./factory-create-element.js";

import downloadFile from "../modules/download-file.js";

import snackbar from "./snackbar.js";

import commonServerErrors from "../helpers/common-server-errors";

export default function viewFile(file){

    const area = new Composite({

        layoutData: "stretch",
        background: areaBackground, 
        transform: setHorizontal,
        id: 'area-view-file', 
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

        new ActivityIndicator({

            centerX: 0,
            centerY: 0,
            width: 24,
            height: 24,
            id: "loader-open-file"
        }),

        uiCloseWithText(backButtonCallback, `Retour`),

    ).appendTo(contentView);

    return viewAnimationEntrance(area).then(()=>{

        const fileExtension = file.split(".").pop().toLowerCase();

        if(fileExtension === "pdf"){

            // First we need to download the file

            return downloadFile(file, "application/pdf").then((response)=>{

                  area.find("#loader-open-file").only().dispose();

                  if(response.Message === "Problem with download"){

                       return snackbar(area, commonServerErrors(response.Message), 3000);
                  }

                  // We create the pdf view

                  return createElement(response?.Data).appendTo(area);

                  
            });
        }

        const imgView = createElement(file);

        imgView.onLoad(({error, target})=>{

            if(error === false){

                area.find("#loader-open-file").only().dispose();

                return target.appendTo(area);

            }

            return false;
        });

    });

    function backButtonCallback(){ 
        
        return closeView(area);

    }
};