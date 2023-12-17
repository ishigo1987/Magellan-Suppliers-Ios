import{TextView, contentView, Composite, ImageView, ActivityIndicator, CollectionView} from "tabris";

import uiCloseWithText from "../helpers-views/ui-close-with-text.js";

import {setHorizontal, openHorizontal} from "../helpers/config-magellan.js";

import { primaryColor,areaBackground, secondaryTextColor, fourthTextColor } from "../helpers/theme-magellan.js";

import viewAnimationEntrance from "../helpers-views/animation-view-entrance.js";

import getMessages from "../modules/get-messages.js";

import closeView from "../helpers-views/close-view.js";

import requestError from "../helpers-views/error-with-request.js";

import noResultFound from "../helpers-views/no-result-found.js";

export default function displayMessages(senderName){

    const area = new Composite({

        layoutData: "stretch",
        background: areaBackground, 
        transform: setHorizontal,
        id: 'area-display-messages', 
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

        new Composite({

             top: ["prev()", 0],
             bottom: 50,
             left:0,
             right:0,
             id: "area-messages"
        }),

        new Composite({

             bottom:0,
             left:0,
             right:0,
             elevation: 2,
             height:50

        }).append(

            new Composite({

                top:0,
                height:1,
                left:0,
                right:0,
                background:fourthTextColor
    
            }),

            new TextView({

                 centerY:0,
                 alignment: "centerX",
                 left: 15,
                 right: 15,
                 text: "Vous ne pouvez pas répondre à ces messages.",
                 textColor: secondaryTextColor,
                 font:"14px"
            })
        ),

        uiCloseWithText(backButtonCallback, senderName)

    ).onTap(()=>{

    }).appendTo(contentView);

    return viewAnimationEntrance(area).then(()=>{

        const areaMessage = area.find("#area-messages").only();
  
        function wrapperGetMessages(){

            new ActivityIndicator({
    
                width:32,
                height: 32,
                centerY: 0,
                centerX: 0,
                id: "loader-message"
    
           }).appendTo(areaMessage);
    
           getMessages(senderName).then((response)=>{
    
            areaMessage.find("#loader-message").only().dispose();
    
                 if(response.Message === "No messages"){
            
                    return noResultFound("Aucune donnée disponible").appendTo(areaMessage);
                 }
    
                 if(response.Message === "Problem with database or request"){ 
    
                    return requestError(areaMessage).then((result)=>{ 
    
                        if(result === "Button clicked"){ 
    
                                return wrapperGetMessages();
                        }
                    });
                 }
    
                 const messages = response?.Data;
    
                 return new CollectionView({
            
                    layoutData: "stretch",
                    cellHeight: "auto",
                    itemCount: messages.length,
                    scrollbarVisible: false,
                    createCell: ()=>{
    
                        const cell = new Composite({
                            
                            top:0,
                            left:0,
                            right:0
    
                        }).append(

                            new Composite({

                                 left: 15,
                                 top: ["prev()", 5],
                                 right: 45,
                                 background: "#fee3cc",
                                 cornerRadius: 10,
                                 padding: 10

                            }).append(

                                new TextView({

                                     top: 0,
                                     left: 0,
                                     right: 0,
                                     font: "14px",
                                     id: "message-text"
                                }),

                                new TextView({

                                     top: ["prev()", 5],
                                     left: 0,
                                     right: 0,
                                     textColor: secondaryTextColor,
                                     id: "message-date",
                                     font: "12px"
                                })
                            )

                        );
    
                        return cell;
                    },
                    updateCell:(cell, index)=>{

                        cell.find("#message-text").only().text = messages[index]?.message;

                        cell.find("#message-date").only().text = messages[index]?.messageDate;
    
                    }
    
                 }).appendTo(areaMessage);
    
           });
        }

        return wrapperGetMessages();

    });


    function backButtonCallback(){ 
       
       return closeView(area);

    }
}