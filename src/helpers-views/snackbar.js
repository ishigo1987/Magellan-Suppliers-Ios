import {Composite,TextView} from "tabris";

import {snackbarColor, thirdTextColor, primaryColor} from "../helpers/theme-magellan.js";

import animate from "./animation.js";
   
   /** 
   * This widget handle the message return by the module
   * @param {widgetToAttach} string
   * @param {firstTextSnackbar} string
   * @param {delayOfHidingSnackbar} string
   * @param {secondTextSnackbar} string
   * @return {promise} primitive type
*/

export default function snackbar(widgetToAttach, firstTextSnackbar, delayOfHidingSnackbar = 3000, secondTextSnackbar){

     // Single line height = 48dp = 36px but i choose 40px
    //Multi lines height = 80dp = 60px
    return new Promise((resolve)=>{

        const snackbar = new Composite({ 
          
          bottom: 15, 
          left: 15, 
          right: 15, 
          elevation:4, 
          cornerRadius:10, 
          padding: 15, 
          background: snackbarColor, 
          transform:{translationY:250}

        }).appendTo(widgetToAttach);
        
        const firstMessage = new TextView({ 
          
          left: 0, 
          right: 0, 
          font: "14px late", 
          centerY: 0, 
          text: firstTextSnackbar, 
          textColor: thirdTextColor
        
        }).appendTo(snackbar);
        
        if(secondTextSnackbar !== undefined){

          firstMessage.right = 120;

          new TextView({ 
            
            right: 0, 
            highlightOnTouch: true, 
            centerY: 0, 
            text: secondTextSnackbar.toUpperCase(), 
            textColor: primaryColor ,
            font:"bold 15px late"
          
          }).onTap(() =>{

              closeSnackbar();

              resolve("Action Snackbar Clicked");

          }).appendTo(snackbar);

        }
  
        function closeSnackbar(){

            return animate(snackbar, { transform: { translationY: 250 } }, null, 250).then((result)=>{ 

                return snackbar.dispose();

            });  
        }

        return animate(snackbar, { transform: { translationY: 0 } }, null, 300).then((result)=>{

            if(delayOfHidingSnackbar !== "infinite"){

                // i replace delay by setTimeout for some design purposes
                
                return setTimeout(()=>{closeSnackbar();},delayOfHidingSnackbar);
              
            }

        });
    });

}