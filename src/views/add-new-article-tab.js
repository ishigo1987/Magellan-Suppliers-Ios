import {Tab,TextView, Composite, ScrollView, ImageView, Picker, Button} from "tabris";

import {primaryTextColor, tabFolderTabArea, secondaryTextColor, primaryColor, thirdTextColor, iconLight, iconsColor} from "../helpers/theme-magellan.js";

import getPictureFromDevice from "../helpers-views/get-picture-from-device.js";

import createInputElement from "../helpers-views/create-input-element.js";

import addNewArticleTab from "../modules/add-new-article-tab.js";

import toast from "../helpers-views/toast.js";

import commonServerErrors from "../helpers/common-server-errors.js";

import handleDepositDate from "../helpers-views/handle-deposit-date.js";

export default function addNewArticleTab(){

    const userInfos = localStorage.getItem("userInfos");

    let carPicture;

    let finalClientName;

    const addNewArticle = new Tab({
      
        layoutData: "stretch",
        image: "resources/icons/add-outline.png",
        title: "Ajouter",
        id: "add-new-article-tab",

    }).append(

        new ScrollView({

            top: ["prev()", 0],
            bottom: 0,
            left: 0,
            right: 0,
            id: "add-new-article-scrollView",

        })

    ).on({

         appear: ({target})=>{

            const scrollView = addNewArticle.find("#add-new-article-scrollView").only();

            // We get the clients list from the handle-home-list.js file, line 61
    
            const finalClients = target?.data?.finalClients.map((client)=>{
    
                client = client.name;
    
                return client;
            });
    
            scrollView.append(
    
                new Composite({
    
                    top: 10,
                    left: 15,
                    right: 15,
                    cornerRadius: 5,
                    padding:10,
                    background: "#e6e6e6"
     
                }).append(
    
                    new TextView({
    
                        top: 0,
                        left:0,
                        right: 0,
                        textColor: secondaryTextColor,
                        text: "Veuillez remplir ces informations qui sont essentielles pour un début de création d'un dossier de la voiture. Une fois la voiture ajoutée a votre liste, vous pourrez compléter ses informations en cliquant dessus.",
                        font: "14px"
    
                    })
                ),
    
                new Composite({
            
                    top: ["prev()", 10],
                    left: 15,
                    right: 15,
                    cornerRadius: 5,
                    background: "#eeeeee",
                    elevation: 1
    
                }).append(
    
                    new ImageView({
                        top: 0,
                        left: 0,
                        right: 0,
                        height:200,
                        scaleMode: "fill",
                        image: { src: "resources/images/no-car.png", width:screen.width,  height: 200},
                        id: "car-picture-tab"
                   
                    }),
    
                    new Button({
    
                        top: ["prev()", 0],
                        left: 15,
                        height: 45, 
                        cornerRadius: 20, 
                        font:"11px", 
                        background: primaryColor,
                        text: "Prendre une photo", 
                        textColor: thirdTextColor,
                        autoCapitalize: "none",
                        image: { src: 'resources/icons/camera.png', width: 16, height: 16 },
                        imageTintColor: iconLight,
            
                      }).onSelect(()=>{
    
                         getPictureFromDevice().then((result)=>{ 

                                carPicture = result;

                                const carPictureTab = addNewArticle.find("#car-picture-tab").only();

                                carPictureTab.image = {

                                     src: new Blob([carPicture], {type: "image/jpeg"}),
                                     width: screen.width,
                                     height:200
                                }

                                carPictureTab.onLoad(({target, error})=>{

                                     if(error === true){

                                          target.image = { src: "resources/images/no-car.png", width: screen.width, height: 200};

                                          carPicture = undefined;

                                          return toast("Seuls les formats png, jpg, jpeg et webp sont acceptés.", 3000, "bottom");
                                     }
                                });
    
                         });
                      })
                ),
    
                createInputElement("car-side", "Entrez votre la marque, le model et l'année de la voiture", "car-brand-model-year"),
    
                createInputElement("vin", "Entrez le numéro de série(VIN)", "serial-number"),

                new Composite({ 
            
                    top: ["prev()", 10], 
                    left: 15, 
                    right: 15, 
                    height: 50, 
                    cornerRadius: 10, 
                    elevation: 1,
                    background: tabFolderTabArea
            
                }).append(
            
                    new ImageView({ 
                        
                        left: 10, 
                        centerY: 0, 
                        width: 20, 
                        height: 20, 
                        image: { src: "resources/icons/calendar-deposit.png", width: 18, height: 18 }, 
                        tintColor: iconsColor
                    }),
            
                    new TextView({ 
                        
                        centerY: 0, 
                        left: ["prev()", 5], 
                        right: 32, 
                        textColor: secondaryTextColor,
                        text: "Entrez la date de réception de dépôt", 
                        font: "14px",
                        id: "deposit-date-value",
                    
                    })
            
                ).onTap(({target})=>{

                    return handleDepositDate(target.find("#deposit-date-value").only(), Date.now())

                }),
            
    
                new Picker({
    
                    top: ["prev()", 15],
                    left: 15,
                    right: 15,
                    style: "default",
                    textColor: secondaryTextColor,
                    cornerRadius: 10,
                    font: "14px",
                    borderColor: "#e0e0e0",
                    message: "Veuillez choisir un client",
                    itemCount: finalClients.length,
                    floatMessage: false,
                    itemText: index => finalClients[index]
    
                }).onSelect((event)=>{
    
                        return finalClientName = finalClients[event.index];
    
                }),
    
                new Button({
    
                    top: ["prev()", 15],
                    left: 15,
                    right: 15,
                    height: 60, 
                    cornerRadius: 10, 
                    font:"12px", 
                    background: primaryColor,
                    text: "Valider", 
                    textColor: thirdTextColor,
                    autoCapitalize: "all",
    
                }).onSelect(({target})=>{
    
                    const carBrandModelYear = scrollView.find("#car-brand-model-year").only()?.text;
    
                    const carSerialNumber = scrollView.find("#serial-number").only()?.text;

                    const depositDate = scrollView.find("#deposit-date-value").only()?.text;
    
                    const formData = {
    
                         carPicture: carPicture,
                         carBrandModelYear: carBrandModelYear,
                         carSerialNumber: carSerialNumber,
                         carFinalClientName: finalClientName,
                         carDepositDate: depositDate
    
                    }

                    target.text = "Création d'une voiture en cours...";
    
                    return addNewArticleTab(formData).then((response)=>{

                          target.text = "Valider";

                          if(response.Message === "New car added"){

                               toast(commonServerErrors(response?.Message), 4000, "bottom");

                               const tabFolder = addNewArticle.parent();

                               return tabFolder.selection = tabFolder.find("#home-list-tab").only();
                          }
    
                          return toast(commonServerErrors(response.Message), 3000, "bottom");
                         
                    });
    
                }),
    
                new Composite({
    
                    top: ["prev()", 10]
    
                })
            )

        
         },

         disappear:({target})=>{ 

             return target.find("#add-new-article-scrollView").only().children().dispose(); 
             
         }
    });

    return addNewArticle;
}