import {TextView, ImageView, Composite} from "tabris";

import {iconsColor, iconLight, iconeBackground, thirdTextColor} from "../helpers/theme-magellan.js";

export default function uiCloseWithText(callback, firstText, secondText){

    const wrap = new Composite({

        top: 0, 
        left: 0, 
        right: 0, 
        height: 57, 
        background: "transparent", 
        elevation: 3

    }).append(

        new ImageView({ 
            
            centerY: 0, 
            left: 5, 
            width: 38, 
            height: 36, 
            cornerRadius: 18, 
            background: iconeBackground, 
            highlightOnTouch: true, 
            tintColor:  iconLight, 
            image: { src: 'resources/icons/back.png', width: 24, height: 24 },
            id: "backImage"

        }).onTap(()=>{

            callback();

        }),

        new TextView({
            centerY: 0,
            left: ["prev()", 0], 
            right: 120,
            maxLines: 1,
            text: firstText, 
            textColor:  thirdTextColor,
            font: "14px late",
            id: "firstText"

        })
        
    );  
    
    if(secondText !== undefined){

         wrap.find("#firstText").only().set({

              top:10,
              centerY: "auto"
         });

         wrap.append(

            new TextView({
    
                top: ["prev()", 0], 
                left: ["#backImage", 0], 
                right: 120,
                maxLines: 1,
                text: secondText, 
                textColor:  primaryTextColor,
                font: "12px late",
            })
    
         )
         
    }

    return wrap;

}