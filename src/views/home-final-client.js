import {Composite, contentView, TextView} from "tabris";

import createIcon from "../helpers-views/create-icon.js";

import { areaBackground, primaryColor, snackbarColor, thirdTextColor } from "../helpers/theme-magellan";

import handleHomeList from "../helpers-views/handle-home-list.js";

import carFinalClientInfos from "./car-final-client-infos.js";

import commonServerErrors from "../helpers/common-server-errors.js";

import snackbar from "../helpers-views/snackbar.js";

import loader from "../helpers-views/loader.js";

export function homeFinalClient(){

    const userRole = JSON.parse(localStorage.getItem("userInfos")).userRole;

    let observer;

    const home = new Composite({

        layoutData: "stretch",
        background: areaBackground, 
        id: 'home-final-client', 
        class: 'activeView'

    }).append(

        new Composite({

            left: 0,
            right: 0,
            height: 57,
            background: primaryColor,
            id: "home-header"

        }).append(

            new TextView({

                left: 15,
                centerY: 0,
                textColor: thirdTextColor,
                text: "Magellan Transit",
                font: "bold 18px"
            
            }),

            createIcon({imgName: "log-out", side: "right", idIcon: "loug-out"}).onTap(({target})=>{

                loader("Déconnexion en cours...", true);

                return import("../modules/log-out.js").then((module)=>{

                      return module.logOut("final-client").then((response)=>{

                            loader("", false);

                            if(response.Message === "User disconnected"){

                                  localStorage.clear();

                                  return import("./authentication.js").then((view)=>{

                                      view.authentication();

                                      return home.dispose();
                                  }); 
                            }

                            return snackbar(home,  commonServerErrors(response.Message), 3000);

                      });

                });
           
            }),

            createIcon({imgName: "refresh", side: "right", idIcon: "refresh", position: 5}).onTap(({target})=>{

                const bodyFinalClient =  home.find("#body-final-client").only();
     
                bodyFinalClient.children().dispose();

                if(observer !== undefined){
                    
                    observer.unsubscribe();

                }

                return observer = handleHomeList(bodyFinalClient).subscribe((result)=>{

                    return carFinalClientInfos(result);
                });
             
            }),

        ),

        new Composite({

            top: ["prev()", 0],
            left: 0,
            right: 0,
            bottom: 0,
            id: "body-final-client"
        })

    ).onTap(()=>{

        // remove the view transparency for events
    }).appendTo(contentView);

    return handleHomeList(home.find("#body-final-client").only()).subscribe((result)=>{

         return carFinalClientInfos(result);

    });

}