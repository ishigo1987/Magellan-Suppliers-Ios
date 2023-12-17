import {Tab,TextView, Composite, ImageView, ActivityIndicator, CollectionView, RefreshComposite} from "tabris";

import {primaryTextColor, tabFolderTabArea, secondaryTextColor, primaryColor} from "../helpers/theme-magellan.js";

import getConversations from "../modules/get-conversations.js";

import noResultFound from "../helpers-views/no-result-found.js";

import requestError from "../helpers-views/error-with-request.js";

import displayMessages from "./display-messages.js";

export default function messageTab(){

    const area = new Tab({
      
        layoutData: "stretch",
        image: "resources/icons/message-outline.png",
        title: "Messages",
        id: "messages-tab"

    }).append(

        new RefreshComposite({
            layoutData: 'stretch',
            id: "refresh-message-tab"
        }).onRefresh(()=>{

            wrapperGetConversations();
        })
 
    );

    const areaRefresh = area.find("#refresh-message-tab").only();

    function wrapperGetConversations(){

        areaRefresh.children().dispose();

        new ActivityIndicator({

            width:32,
            height: 32,
            centerY: 0,
            centerX: 0,
            id: "loader-message"

       }).appendTo(areaRefresh);

       getConversations().then((response)=>{

             areaRefresh.find("#loader-message").only().dispose();

             areaRefresh.refreshIndicator = false;

             if(response.Message === "No conversations"){
        
                return noResultFound("Aucune donnée disponible").appendTo(areaRefresh);
             }

             if(response.Message === "Problem with database or request"){ 

                return requestError(areaRefresh).then((result)=>{ 

                    if(result === "Button clicked"){ 

                            return wrapperGetConversations();
                    }
                });
             }

             const conversations = response?.Data;

             return new CollectionView({
        
                layoutData: "stretch",
                cellHeight: 64,
                itemCount: conversations.length,
                createCell: ()=>{

                    const cell = new Composite({

                        left:0,
                        right:0,
                        height:64,
                        highlightOnTouch: true,
                        background: "#ffffff"

                    }).append(

                        new ImageView({
                                
                            left:15,
                            centerY:0,
                            width:40,
                            height:40,
                            cornerRadius:20,
                            image: { src: "resources/images/no-profile-picture.jpg", width: 40, height: 40},
                            id: "sender-picture"

                        }),

                        new TextView({

                             top:15,
                             left: ["prev()", 15],
                             right: 15,
                             id: "sender-name",
                             font: "16px"

                        }),

                        new TextView({

                            right: 15,
                            top: 15,
                            font: "12px",
                            id: "message-date",
                            textColor:primaryColor

                        }),

                        new TextView({

                            top:["#sender-name", 0],
                            left: ["#sender-picture", 15],
                            right: 15,
                            font: "13px",
                            textColor: secondaryTextColor,
                            maxLines:1,
                            id: "message"

                       })

                    ).onTap(({target})=>{

                        return displayMessages(target.find("#sender-name").only().text);

                    });

                    return cell;
                },
                updateCell:(cell, index)=>{

                    cell.find("#sender-name").only().text = conversations[index]?.name;

                    cell.find("#message-date").only().text = conversations[index]?.lastMessageDate;

                    cell.find("#message").only().text = conversations[index]?.lastMessage;
                }

             }).appendTo(areaRefresh);

       });
    }

    wrapperGetConversations();

    return area;
}