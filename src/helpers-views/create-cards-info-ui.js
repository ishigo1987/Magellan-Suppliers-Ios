import{Composite, ImageView, TextView, TextInput, Button, ActionSheet} from "tabris";

import { primaryColor, thirdTextColor, secondaryTextColor, iconLight, iconDark } from "../helpers/theme-magellan";

import { url } from "../helpers/config-magellan";

export default function createCardsInfoUi(cardInfos){ 

      let{element, type, title, id, fieldName} = cardInfos;

      const cardSkeleton = new Composite({
        
           top: ["prev()", 10],
           left: 5,
           right: 5,
           cornerRadius: 5,
           background: "#eeeeee",
           elevation: 1

      }).append(

          new TextView({
 
             left:15,
             right:15,
             top: 10,
             maxLines:1,
             text: title,
             font:"15px",
             id: "card-title"

          }),

          new Button({

            top: [".element", 10],
            left: 15,
            height: 45, 
            cornerRadius: 20, 
            font:"11px", 
            background: primaryColor,
            text: "Upload",
            image: { src: 'resources/icons/edit.png', width: 16, height: 16 },
            imageTintColor: iconLight,
            textColor: thirdTextColor,
            autoCapitalize: "none",
            class: "card-button",
            data: {action: "edit"}

          }),

          new Button({

            right: 15,
            top: [".element", 10],
            text:"Voir",
            cornerRadius: 20,
            textColor: secondaryTextColor,
            height:45,
            font: "12px",
            image: { src: 'resources/icons/eye-outline.png', width: 16, height: 16 },
            imageTintColor: iconDark,
            style: "outline",
            autoCapitalize: "none",
            strokeColor: primaryColor,
            class: "card-button card-button-outline",
            data: {action: "see"}

          }),

          new Composite({

              top: ["prev()", 10],
              height: 0,
              left: 0,
              right: 0
          })
      )

      if(type === "image"){

           if(element.includes("files/") === true){

               element = `${url}/${element}`;
           }

           new ImageView({

                top: ["#card-title", 10],
                left: 0,
                right: 0,
                height: 200,
                scaleMode: "fill",
                image: {src: element, width: screen.width, height: 200},
                class: "element",
                data:{dataType: type, id: id, dataFieldName: fieldName, dataPath: element}
             
           }).appendTo(cardSkeleton);
           
      }

      if(type === "input"){

          cardSkeleton.find(".card-button-outline").only().excludeFromLayout = true;

          new TextInput({

              top: ["#card-title", 10],
              left: 15,
              right: 15,
              text: element.toUpperCase(),
              font: "16px",
              editable: false,
              class: "element",
              data:{dataType: type, id: id, dataFieldName: fieldName}

          }).appendTo(cardSkeleton);
      }

      if(type === "text"){

         cardSkeleton.find(".card-button-outline").only().excludeFromLayout = true;

         new TextView({

          top: ["#card-title", 10],
          left: 15,
          right: 15,
          text: element.toUpperCase(),
          font: "16px",
          class: "element",
          data:{dataType: type, id: id, dataFieldName: fieldName}

         }).appendTo(cardSkeleton);
      }

      if(type === "fichier"){

                const fileExtension = element.split(".").pop().toLowerCase();

                let imgSrc;

                if(fileExtension === "pdf"){

                     imgSrc = "resources/images/document.png";
                }

                if(["jpg", "jpeg", "png", "web"].includes(fileExtension) === true){

                    if(element.includes("no-picture") === false){

                        imgSrc = `${url}/${element}`;

                    }else{

                        imgSrc = element;
                    }

                    
                }

                new ImageView({

                  top: ["#card-title", 10],
                  left: 0,
                  right: 0,
                  height: 200,
                  scaleMode: "fill",
                  image: {src: imgSrc, width: screen.width, height: 200},
                  class: "element",
                  data:{dataType: type, id: id, dataFieldName: fieldName, dataPath: element}
              
                }).appendTo(cardSkeleton);
          
            
      }

      if(type === "text-read-only"){

          cardSkeleton.find(".card-button").set({

               excludeFromLayout: true
          });

          new TextView({

            top: ["#card-title", 10],
            left: 15,
            right: 15,
            text: element,
            font: "14px",
            textColor: secondaryTextColor,
  
           }).appendTo(cardSkeleton);

           new Composite({

            top: ["prev()", 0],
            left: 0,
            height:10,
            right: 0

           }).appendTo(cardSkeleton);
      }


      return cardSkeleton;
}