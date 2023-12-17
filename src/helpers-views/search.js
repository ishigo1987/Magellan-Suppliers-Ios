import { contentView, TextView, ImageView, Composite, TextInput, Observable} from "tabris";

import { areaBackground, iconDark, iconLight, primaryColor, secondaryTextColor, thirdTextColor, primaryTextColor, tabFolderTabArea } from "../helpers/theme-magellan.js";

import { setVertical, openVertical } from "../helpers/config-magellan.js";

import colorStatusbarNavigationbar from "./color-statusBar-navigationBar.js";

import animate from "./animation.js";

import setThemeTabris from "./set-theme-tabris.js";

import chip from "./chip.js";

import debounce from "../helpers/debounce.js";

export function search(widgetParent){

     return new Observable((subscriber)=>{

          let chipChoice;

          colorStatusbarNavigationbar("statusbar", "#ffffff");

          // Set Tabris theme
          setThemeTabris("statusbar", "light");

          const search = new Composite({

              left: 0,
              top: 0,
              right: 0,
              height: 120,
              background: "#ffffff",
              transform: setVertical,
              elevation: 5,

          }).append(

                new ImageView({
            
                    top: 15,
                    left: 15, 
                    width: 36, 
                    height: 36, 
                    cornerRadius: 18, 
                    tintColor: iconDark, 
                    highlightOnTouch: true, 
                    image: { src: 'resources/icons/back.png', width: 24, height: 24 }, 
            
                }).onTap(({target})=>{

                     const searchInput = search.find("#search-input").only();

                     setThemeTabris("statusbar", "dark");

                     colorStatusbarNavigationbar("statusbar", primaryColor);

                     subscriber.next({

                         value: "Search cancel",
                         
                     });
            
                     return animate(search, {transform: setVertical }, null, 200);
            
                }),

                new TextInput({ 
            
                    top: 10, 
                    left: ["prev()", 15], 
                    right: 15, 
                    style: 'none', 
                    floatMessage: false, 
                    focused: true,
                    textColor: secondaryTextColor,  
                    background: 'transparent',
                    message: "Sélectionnez, puis recherchez", 
                    messageColor: secondaryTextColor, 
                    font: "13px",
                    enabled: false,
                    id: "search-input",
                
                }).onInput(({target})=>{

                    return subscriber.next({

                         value: target.text,
                         chipChoice: chipChoice
                    });

                }),

               new Composite({

                   top: ["prev()", 0],
                   left: 0,
                   right:0,
                   bottom: 0,
                   background: "#ffffff",
                   id: "chips-container"

               }).append(

                  chip({
                    leftValue: ["prev()", 10], 
                    topValue: ["#chips-container", 10],
                    imgName: "vin",
                    text: "N° de série",
                    chipName: "Numéro de série"
                
                  }),

                  chip({
                    leftValue: ["prev()", 10], 
                    topValue: ["#chips-container", 10],
                    imgName: "car-info",
                    text: "Marque voiture",
                    chipName: "Marque voiture"
                
                  })
               )

          ).onDispose(()=>{

               setThemeTabris("statusbar", "dark");

               return colorStatusbarNavigationbar("statusbar", primaryColor);

          }).appendTo(widgetParent);

          // handle click on chip

          function handleClickOnChips(){

               const chipsParent = search.find("#chips-container").only();

               search.find(".chip").forEach((chip)=>{

                     chip.onTap(({target})=>{

                         chipsParent.find(".chip").set({

                              background: tabFolderTabArea,
                    
                         });

                         chipsParent.find(".chip-icon").set({

                              tintColor: primaryTextColor,
                         });

                         chipsParent.find(".chip-text").set({

                              textColor: primaryTextColor
                         });

                         target.find(ImageView).only().tintColor = iconLight;

                         target.find(TextView).only().textColor = thirdTextColor;

                         target.background = primaryColor; 
     
                         chipChoice = target?.data?.chipName;

                         return search.find("#search-input").only().set({

                              enabled: true,
                              focused: true
                         });
                          
                     });
               });

              

          }

          handleClickOnChips();

          return animate(search, {transform: openVertical }, null, 200);

     });
}