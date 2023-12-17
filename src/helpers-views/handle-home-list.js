import {Tab,TextView, Composite, ScrollView, ImageView, ActivityIndicator, Button, CollectionView, Observable, contentView} from "tabris";

import {primaryTextColor, tabFolderTabArea, primaryColor} from "../helpers/theme-magellan.js";

import getHomeList from "../modules/get-home-list.js";

import createInitialsName from "../helpers/create-initials-name.js";

import getRandomColor from "../helpers/get-random-color.js";

import requestError from "./error-with-request.js";

import noResultFound from "./no-result-found.js";

export default function handleHomeList(area){
 
      return new Observable((subscriber)=>{

        function handleRequest(){

            const userRole = JSON.parse(localStorage.getItem("userInfos")).userRole;

            new ActivityIndicator({
        
                centerX:0,
                centerY:0,
                height:32,
                width:32,
                id:"loader"
        
            }).appendTo(area);
        
            return getHomeList(userRole).then((response)=>{
        
                area.find("#loader").only().dispose();
        
                if(response.Message === "No data retrieved"){
        
                        return noResultFound("Aucune donnée disponible").appendTo(area);
                }
        
                if(response.Message === "Problem with database or request"){ 
        
                     return requestError(area).then((message)=>{ 
        
                          if(message === "Button clicked"){ 
        
                                return handleRequest();
                          }
                     })
                }
        
                if(response.Message === "Data retrieved"){
        
                    let messageDate;
        
                    const dataArray = response?.Data; 

                    // We copy the list of members on the add-new-article-tab

                    const addNewArticleTabCollection = contentView.find("#add-new-article-tab");

                    if(addNewArticleTabCollection.length !== 0){

                        addNewArticleTabCollection.only().data = {finalClients: dataArray};
                    }

                    userRole === "supplier" ? messageDate = "est votre client depuis le" : messageDate = "est votre fournisseur depuis le";
        
                     return new CollectionView({
        
                        layoutData: "stretch",
                        cellHeight: 64,
                        itemCount: dataArray.length,
                        createCell: ()=>{
        
                            const cell = new Composite({
        
                                left:0,
                                right:0,
                                height:64,
                                highlightOnTouch: true,
                                background: "#ffffff"
        
                            }).append(
        
                                new Composite({
        
                                    left:15,
                                    centerY:0,
                                    width:42,
                                    height:42,
                                    cornerRadius:21,
                                    background: getRandomColor(),
                                    id:"circle-initials"
                                }).append(
        
                                    new TextView({
        
                                        centerY:0,
                                        centerX:0,
                                        alignment:"centerX",
                                        textColor:"#ffffff",
                                        font:"14px",
                                        id:"initials"
                                    })
                                ),
        
                                new TextView({
        
                                     top:15,
                                     left: ["prev()", 15],
                                     right: 15,
                                     id: "user-name",
                                     font: "14px"
        
                                }),
        
                                new TextView({
        
                                    top:["prev()", 0],
                                    left: ["#circle-initials", 15],
                                    right: 15,
                                    font: "12px",
                                    textColor: "#616161",
                                    markupEnabled: true,
                                    id: "user-added"
        
                               })
        
                            ).onTap(({target})=>{
    
                                return subscriber.next(target.find("#user-name").only().text);
        
                            });
        
                            return cell;
                        },
                        updateCell:(cell, index)=>{
        
                            cell.find("#initials").only().text = createInitialsName(dataArray[index]?.name);
        
                            cell.find("#user-name").only().text = dataArray[index]?.name;
        
                            cell.find("#user-added").only().text = `${messageDate} <strong>${dataArray[index]?.clientDateAdded}</strong>`;
                        }
        
                     }).appendTo(area);
                }
        
            });
            
        }

        handleRequest();

      });
}