import {Composite, contentView, TextView, TabFolder} from "tabris";

import createIcon from "../helpers-views/create-icon.js";

import { areaBackground, primaryColor, thirdTextColor } from "../helpers/theme-magellan";

import handleHomeList from "../helpers-views/handle-home-list.js";

import getFinalClientCar from "../views/get-final-client-car.js";

import homeListTab from "./home-list-tab.js";

import addNewArticleTab from "./add-new-article-tab.js";

import messagesTab from "./messages-tab.js";

import loader from "../helpers-views/loader.js";

import snackbar from "../helpers-views/snackbar.js";

import commonServerErrors from "../helpers/common-server-errors.js";

export function home(){

    const userRole = JSON.parse(localStorage.getItem("userInfos")).userRole;

    let observer;

    const home = new Composite({

        layoutData: "stretch",
        background: areaBackground, 
        id: 'home', 
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
                font: "bold 18px magellan"
            
            }),

            createIcon({imgName: "log-out", side: "right", idIcon: "loug-out"}).onTap(({target})=>{

                loader("Déconnexion en cours...", true);

                return import("../modules/log-out.js").then((module)=>{

                      return module.logOut("supplier").then((response)=>{

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

                        const homeListTab =  home.find("#home-list-tab").only();
        
                        homeListTab.children().dispose();
        
                        if(observer !== undefined){
                            
                            observer.unsubscribe();
        
                        }
        
                        return observer = handleHomeList(homeListTab).subscribe((result)=>{
        
                            return getFinalClientCar(result);
                        });
             
            }),

            createIcon({imgName: "notification", side: "right", idIcon:"notifications", position: 5}).onTap(({target})=>{
     
                 
                
            })

        ),

        new TabFolder(({

            top: ["prev()", 0],
            bottom: 0,
            left: 0,
            right: 0,
            paging: false,
            selectedTabTintColor: primaryColor,
            tabBarElevation: 5,
            tabBarLocation: "bottom",
            tabTintColor: "#9e9e9e",
            tabBarBackground:  areaBackground

        })).append(

            homeListTab(),
            
            addNewArticleTab(),

            messagesTab()

        ).onSelectionIndexChanged(({target})=>{

                const refreshIcon = home.find("#refresh").only();

                if(target.selectionIndex === 0){

                     return refreshIcon.excludeFromLayout = false;

                }

                return refreshIcon.excludeFromLayout = true;

        })

    ).onTap(()=>{

         // remove the view transparency for events
    }).appendTo(contentView);

}