import {Composite, TextView, ImageView} from "tabris";

import {tabFolderTabArea, primaryTextColor} from "../helpers/theme-magellan.js";

export default function chip(chipOptions){

    const {leftValue, topValue, imgName, text, chipName} = chipOptions;

     const chip = new Composite({

          top: topValue,
          left: leftValue,
          background: tabFolderTabArea,
          cornerRadius: 20,
          height: 40,
          highlightOnTouch: true,
          class: "chip",
          data: {chipName: chipName}

     }).append(

        new ImageView({

            left: 10,
            centerY:0,
            image: {src: `resources/icons/${imgName}.png`, width: 16, height: 16},
            tintColor: primaryTextColor,
            class: "chip-icon"
        }),

        new TextView({

             left: ["prev()", 10],
             right: 10,
             centerY: 0,
             textColor: primaryTextColor,
             text: text,
             font: "12px",
             class: "chip-text"
        })
     )

     return chip;
}