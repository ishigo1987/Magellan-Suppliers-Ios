import {ImageView} from "tabris";

import{iconDark, iconLight} from "../helpers/theme-magellan.js";

/** 
   * This view helper handle the icon creation
   * @param {options} object with keys 
   * @param {imgName} string the image name
   * @param {side} string icon left or right
   * @param {position} number the space between icon
   * @param {backgroundColor} string background of icons area
   * @param {tintColorValue} string tint color value
   * @return {ImageView} object
*/

export default function createIcon(options){ 

       const {imgName, side, position, backgroundColor = "transparent", tintColorValue = iconLight, idIcon} = options;

        const icon = new ImageView({ 
            top: 10,
            width: 36, 
            height: 36, 
            cornerRadius: 18, 
            tintColor: tintColorValue,
            background: backgroundColor,
            highlightOnTouch: true, 
            image: { src: `resources/icons/${imgName}.png`, width: 24, height: 24 },
            class: "icon",
            id: idIcon
        
        });

        if(side === "left"){

            icon.left = position === undefined ? 5 : ["prev()", position];

            return icon;
        }

        icon.right = position === undefined ? 5 : ["prev()", position];

        return icon;

}