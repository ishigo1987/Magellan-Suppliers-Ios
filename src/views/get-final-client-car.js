import { ContentView, Composite, contentView, ActivityIndicator, ScrollView, Observable } from "tabris";

import {setHorizontal, openHorizontal} from "../helpers/config-magellan.js";

import { areaBackground, primaryColor} from "../helpers/theme-magellan";

import viewAnimationEntrance from "../helpers-views/animation-view-entrance.js";

import uiCloseWithText from "../helpers-views/ui-close-with-text.js";

import closeView from "../helpers-views/close-view.js";

import getFinalClientCar from "../modules/get-final-client-car.js";

import noResultFound from "../helpers-views/no-result-found.js";

import requestError from "../helpers-views/error-with-request.js";

import createIcon from "../helpers-views/create-icon.js";

import handleCardsCars from "../helpers-views/handle-cards-cars.js";

import carsFilterBy from "../helpers/cars-filter-by.js";

export default function getFinalClientCar(clientName){

    let observeSearch;

    let responseData;

    let body;

    const clientCar = new Composite({

        layoutData: "stretch",
        background: areaBackground, 
        transform: setHorizontal,
        id: 'final-clients-cars', 
        class: 'activeView'

    }).append(

        new Composite({

            top: 0, 
            left: 0, 
            right: 0, 
            height: 57, 
            background: primaryColor, 
            elevation: 3

        }).append(

            createIcon({imgName: "search", side: "right", position: 5, idIcon: "search-cars"}).onTap(({target})=>{
     
                return import("../helpers-views/search.js").then((view)=>{
    
                      observeSearch = view.search(clientCar).subscribe((result)=>{
    
                            const {value, chipChoice} = result;

                            if(value === "Search cancel"){

                                return setTimeout(()=>{

                                    return handleCardsCars(responseData, body);

                                },250);
                            }

                            const filterResult = carsFilterBy(responseData, value, chipChoice); 

                            if(filterResult.length === 0){

                                  body.children().dispose();

                                  return noResultFound(`Aucun résultat pour : ${value}`).appendTo(body);
                            }

                            return handleCardsCars(filterResult, body);
                            
                      });

                     
    
                });   
            }),
    
        ),

        new ScrollView({

            top: ["prev()", 0],
            left: 0,
            right: 0,
            bottom: 0,
            id: "body-final-clients-cars"

        }),

        uiCloseWithText(backButtonCallback, `Voiture(s) ${clientName.toLowerCase()}`),

    ).onDispose(()=>{

        if(observeSearch !== undefined){

            return observeSearch.unsubscribe();
        }

        return false;

    }).appendTo(contentView);

    return viewAnimationEntrance(clientCar).then(()=>{

           body = clientCar.find("#body-final-clients-cars").only();

           const searchIcon = clientCar.find("#search-cars").only();

           searchIcon.enabled = false;

           function wrapperGetFinalClientCar(){

                new ActivityIndicator({

                    centerX:0,
                    centerY:0,
                    height:32,
                    width:32,
                    id:"client-car-loader"

                }).appendTo(body);

                return getFinalClientCar(clientName).then((response)=>{

                    body.find("#client-car-loader").only().dispose();

                    if(response.Message === "No data retrieved"){
            
                         return noResultFound("Aucune donnée disponible").appendTo(body);
                    }
            
                    if(response.Message === "Problem with database or request"){
            
                         return requestError(body).then((message)=>{
            
                              if(message === "Button clicked"){ 
            
                                    return wrapperGetFinalClientCar();
                              }
                         });
                    }

                    responseData = response?.Data;

                    searchIcon.enabled = true;

                    return handleCardsCars(responseData, body);
                    
            
                });

           }

           wrapperGetFinalClientCar();

    });

    function backButtonCallback(){ 
        
        return closeView(clientCar);

    }
      
}