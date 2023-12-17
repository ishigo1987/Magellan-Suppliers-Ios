import { TextView, Button } from "tabris";

import { primaryColor, primaryTextColor } from "../helpers/theme-magellan";


export default function requestError(widgetParent){

     return new Promise((resolve)=>{

        new TextView({

            alignment: "centerX",
            left:15,
            right:15,
            centerY:0,
            text: "Il semblerait qu'il y ait un problème avec votre requête, essayez de la relancer."

        }).appendTo(widgetParent);

        new Button({

            top: ["prev()", 15],
            centerX:0,
            text: "Réssayer",
            textColor: primaryTextColor,
            width:150,
            height:50,
            style: "outline",
            strokeColor: primaryColor

        }).onSelect(()=>{

                widgetParent.children().dispose();

                return resolve("Button clicked");

        }).appendTo(widgetParent);

     });
}