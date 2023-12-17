import { Composite, WebView, contentView } from "tabris";

import uiCloseWithText from "./ui-close-with-text";

import {setHorizontal, openHorizontal} from "../helpers/config-magellan.js";

import { primaryColor,areaBackground } from "../helpers/theme-magellan";

import viewAnimationEntrance from "./animation-view-entrance";

import closeView from "./close-view";

export default function openOnWebview(link){

    contentView.find(".enforce-dispose").dispose();

    const area = new Composite({

        layoutData: "stretch",
        background: areaBackground, 
        transform: setHorizontal,
        id: 'area-webview', 
        class: 'enforce-dispose activeView'

    }).append(

        new Composite({

            top: 0, 
            left: 0, 
            right: 0, 
            height: 57, 
            background: primaryColor, 
            elevation: 3

        }),

        new WebView({

             top: ["prev()", 0],
             left: 0,
             right: 0,
             bottom: 0,
             url: link
        }),

        uiCloseWithText(backButtonCallback, `Retour`),

    ).appendTo(contentView);

    return viewAnimationEntrance(area);

    function backButtonCallback(){ 
        
        return closeView(area);

    }

}