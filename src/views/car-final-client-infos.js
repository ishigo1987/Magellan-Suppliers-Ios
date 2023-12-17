import { ContentView, Composite, contentView, ActivityIndicator, ScrollView} from "tabris";

import {setHorizontal, openHorizontal} from "../helpers/config-magellan.js";

import { areaBackground, primaryColor} from "../helpers/theme-magellan";

import viewAnimationEntrance from "../helpers-views/animation-view-entrance.js";

import uiCloseWithText from "../helpers-views/ui-close-with-text.js";

import closeView from "../helpers-views/close-view.js";

import noResultFound from "../helpers-views/no-result-found.js";

import requestError from "../helpers-views/error-with-request.js";

import getSupplierCarsForFinalClient from "../modules/get-supplier-cars-for-final-client.js";

import cardForFinalClients from "../helpers-views/cards-for-final-clients.js";

import { url } from "../helpers/config-magellan.js";

export default function carFinalClientInfos(supplierName){

    const car = new Composite({

        layoutData: "stretch",
        background: areaBackground, 
        transform: setHorizontal,
        id: 'final-client-cars', 
        class: 'activeView'

    }).append(

        new Composite({

            top: 0, 
            left: 0, 
            right: 0, 
            height: 57, 
            background: primaryColor, 
            elevation: 3

        }),

        new ScrollView({

            top: ["prev()", 0],
            left: 0,
            right: 0,
            bottom: 0,
            id: "body-final-clients-cars"

        }),

        uiCloseWithText(backButtonCallback, `Retour`),

    ).appendTo(contentView)

    return viewAnimationEntrance(car).then(()=>{

         const body = car.find("#body-final-clients-cars").only();

         function wrapperGetSupplierCarsForFinalClient(){

                new ActivityIndicator({

                    centerX:0,
                    centerY:0,
                    height:32,
                    width:32,
                    id:"client-car-loader"

                }).appendTo(body);

                return getSupplierCarsForFinalClient(supplierName).then((response)=>{

                        body.find("#client-car-loader").only().dispose();

                        if(response.Message === "No data retrieved"){
                
                            return noResultFound("Aucune donnée disponible").appendTo(body);
                        }
                
                        if(response.Message === "Problem with database or request"){
                
                            return requestError(body).then((message)=>{
                
                                if(message === "Button clicked"){
                
                                        return wrapperGetSupplierCarsForFinalClient();
                                }
                            });
                        }

                        if(response.Message === "Data retrieved"){

                            const data = response?.Data;

                            data.forEach((info)=>{

                                 let endPicture;

                                 if(info?.picture.includes("files/") === true){

                                      endPicture = `${url}/${info?.picture}`
                                 }else{

                                    endPicture = info?.picture;
                                 }
                                
                                 return cardForFinalClients({
                                      
                                      id: info?._id,
                                      modelNameYear: info?.brandModelYear,
                                      picture: endPicture,
                                      depositDate: info?.depositDate,
                                      tracking: info?.tracking,
                                      receipt846A: info?.receipt846A,
                                      folderStatus: info?.folderStatus,
                                      kbis_importerId: info?. kbis_importerId
                                     
                                 }).appendTo(body);
                            });

                            const buttons = body.find(".card-button");

                            return import("../helpers-views/events/handle-event-car-final-client-infos.js").then((hView)=>{

                                  return hView.handleEventCarFinalClientInfos(buttons);
                            });
    
                             
                        }

                });
         }

         wrapperGetSupplierCarsForFinalClient();

    });

    function backButtonCallback(){ 
        
        return closeView(car);

    }

}