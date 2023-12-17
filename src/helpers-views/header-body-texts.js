import {TextView, Composite} from "tabris";

/** 
   * This widget display the two first text of view
   * @param {string} firstText
   * @param {string} secondText
   * @return {object} Composite
*/


export default function headerBodyTexts(firstText, secondText){

    const {thirdTextColor, fourthTextColor} = require("../helpers/theme-magellan.js");

    return new Composite({

        top: 90,
        left:0,
        right:0,
        background:"transparent"

    }).append(

        new TextView({

            top: 0,
            alignment:"left",
            left: 0,
            font: "bold 24px", 
            text: firstText,
            textColor: thirdTextColor,
            class: "header-first-text"
        }),
    
        new TextView({
            
            top: ["prev()", 5],
            right: 0,
            alignment:"left",
            left: 0,
            font: "14px", 
            textColor: fourthTextColor,
            text: secondText,
            class: "header-second-text"
        })

    );

};