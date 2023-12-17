import {Composite, TextView, ImageView, ActivityIndicator, Button} from "tabris";

import { primaryColor, secondaryTextColor, thirdTextColor } from "../helpers/theme-magellan";

import createIcon from "./create-icon";

export default function cardForFinalClients(cardInfos){

      const {id, modelNameYear, picture, depositDate, tracking, receipt846A, folderStatus, kbis_importerId} = cardInfos;

      const card = new Composite({

           left: 5,
           right: 5,
           top: ["prev()", 5],
           height: 320,
           cornerRadius: 5,
           background: "#eeeeee",
           id: "card",
           elevation: 1,
           data: {id: id},
            
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
               image: { src: picture, width:screen.width,  height: 200},
               id: "car-picture"
          
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
               font: "18px",
               id: "modelNameYear"
          }),

          new Composite({

               top: ["#car-picture", 10],
               right: 15,
               padding:7,
               background: folderStatus === "Complet" ? "#009688" : "#ef5350",
               cornerRadius: 15,
          }).append(

               new TextView({

                    centerY:0,
                    left: 5,
                    right: 5,
                    alignment: "centerX",
                    maxLines: 1,
                    text: folderStatus,
                    textColor: "#ffffff",
                    font: "11px"
               })
               
          ),

          new TextView({

               top:["#modelNameYear", 5],
               left: 15,
               right: 15,
               maxLines: 2,
               text: `Date de dépôt le ${depositDate}`,
               font: "14px",
               textColor: secondaryTextColor,
               id: "depositDate"
          }),

          new Button({

            bottom: 10,
            left: 15,
            height: 45, 
            cornerRadius: 20, 
            font:"11px", 
            background: primaryColor,
            text: "Localisation", 
            textColor: thirdTextColor,
            autoCapitalize: "none",
            class: "card-button",
            id: "location-button",
            data: {tracking: tracking}

          }),

          new Button({

            right: 15,
            bottom: 10,
            text: "Voir le 846A",
            cornerRadius: 20,
            textColor: secondaryTextColor,
            height:45,
            font: "11px",
            style: "outline",
            autoCapitalize: "none",
            strokeColor: primaryColor,
            class: "card-button",
            data: {receipt846A: receipt846A}

          })
          
      );

      if(kbis_importerId === undefined){

          new Button({

               bottom: 10,
               left: ["#location-button", 5],
               height: 45, 
               cornerRadius: 20, 
               font:"11px", 
               strokeColor: primaryColor,
               text: "Env kbis/Id",
               style: "outline", 
               textColor: secondaryTextColor,
               autoCapitalize: "none",
               class: "card-button",
               data: {kbis_id: "upload", cardId: id}
   
          }).appendTo(card);


      }

      return card;
}