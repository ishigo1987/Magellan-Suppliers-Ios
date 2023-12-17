import {Composite, TextView, ImageView, ActivityIndicator} from "tabris";

import {primaryColor, secondaryTextColor } from "../helpers/theme-magellan";

export default function card(cardInfos){

      const {modelNameYear, picture, bl, serialNumber, comment, status, _id, allInfos} = cardInfos;

      const card = new Composite({

           left: 5,
           right: 5,
           top: ["prev()", 5],
           height: 320,
           cornerRadius: 5,
           background: "#eeeeee",
           class: "card",
           elevation: 1,
           data: {allInfos: allInfos} // We can add all the cards informations here to avoid another round trip to ther server
            
      }).append(

          new ActivityIndicator({

               centerX: 0,
               centerY: 0,
               width: 24,
               height: 24,
               class: "loader-img"
          }),

          new ImageView({
               top: 0,
               left: 0,
               right: 0,
               height:200,
               scaleMode: "fill",
               visible:false,
               image: { src: picture, width: screen.width,  height: 200},
          
          }).onLoad(({target, error})=>{

               if(error === false){

                    card.find(".loader-img").only().dispose();

                    return target.visible = true;

               }

          }),

          new TextView({

               top:["prev()", 10],
               left: 15,
               right: 15,
               maxLines: 1,
               text: modelNameYear,
               font: "14px"
          }),

          new TextView({

               top:["prev()", 5],
               left: 15,
               right: 15,
               maxLines: 2,
               text: comment,
               font: "14px",
               textColor: secondaryTextColor,
               id: "comment"
          }),

          new TextView({

               bottom:15,
               right: 15,
               maxLines: 1,
               text: `Numéro de série: ${serialNumber}`,
               font: "11px"
          }),
          
          new Composite({

               left: 15,
               bottom: 15,
               padding:7,
               background: status === "Complet" ? "#009688" : "#ef5350",
               cornerRadius: 15,
          }).append(

               new TextView({

                    centerY:0,
                    left: 5,
                    right: 5,
                    alignment: "centerX",
                    maxLines: 1,
                    text: status,
                    textColor: "#ffffff",
                    font: "11px"
               })
               
          )
          
      );

      return card;
}