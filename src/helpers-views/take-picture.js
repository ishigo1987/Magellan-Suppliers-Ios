import{ contentView, Composite, TextView, ImageView, CameraView, statusBar, navigationBar, Button, fs} from "tabris";

import cameraSettings from "./camera-settings.js";

import createIcon from "./create-icon.js";

import closeView from "./close-view.js";

import uiClose from "./ui-close.js";

import {primaryColor, areaBackground, iconLight, tabIconUnselected, thirdTextColor} from "../helpers/theme-magellan.js";

import viewAnimationEntrance from "../helpers-views/animation-view-entrance.js";

import colorStatusbarNavigationbar from "./color-statusBar-navigationBar";

import setThemeTabris from "./set-theme-tabris";

import {setHorizontal, openHorizontal} from "../helpers/config-magellan.js";

export default function takePicture(){
        
     return new Promise((resolve)=>{

            const camera = cameraSettings(0);
            
            const frontCamera = cameraSettings(1);
            
            camera.active = true;
            
            const options = {flash:"off"};
            
            let countClickOnFlashIcon = 0;

            colorStatusbarNavigationbar("all","rgb(0,0,0)");

            setThemeTabris("all","dark");
            
            const area = new Composite({ 
                
                layoutData: 'stretch', 
                background: "rgb(0,0,0)", 
                transform: setHorizontal, 
                elevation: 4,
                id: 'capture-photo-view',
                class: "activeView picture-view"

            }).onDispose(()=>{

                    camera.active = false;

                    frontCamera.active = false;

                    colorStatusbarNavigationbar("statusbar", primaryColor);

                    colorStatusbarNavigationbar("navigationbar", "#f5f5f5");

                    setThemeTabris("navigationbar", "light");

                    return setThemeTabris("statusbar","dark");


            }).append(

                new CameraView({
                
                    layoutData: "stretch", 
                    camera,
                    scaleMode: "fill",
                    id: "camera-area"

                }).onTap(()=>{

                    // Useful because the view can become transparent
                }),

                uiClose(iconLight),

                new ImageView({
                    bottom: 118,
                    right: ((screen.width / 2) - 53) / 2,      
                    width: 36, 
                    height: 36, 
                    cornerRadius: 18, 
                    tintColor: iconLight, 
                    highlightOnTouch: true, 
                    image: { src: 'resources/icons/camera-back.png', width: 24, height: 24 }, 

                }).onTap(({target})=>{

                    if(camera.active === true){

                        camera.active = false;

                        frontCamera.active = true;

                        $("#camera-area").only().camera = frontCamera;

                        return target.image = { src: 'resources/icons/camera-front.png', width: 24, height: 24 }
                    }

                    frontCamera.active = false;

                    camera.active = true;

                    $("#camera-area").only().camera = camera;

                    return target.image = { src: 'resources/icons/camera-back.png', width: 24, height: 24 };

                }),
                
            
                new Composite({
                    
                    bottom: 100, 
                    centerX: 0, 
                    width: 70, 
                    height: 70, 
                    cornerRadius: 35, 
                    highlightOnTouch:true, 
                    background: areaBackground
                
                }).append(

                    new Composite({ 
                        
                        centerY: 0, 
                        centerX: 0, 
                        width: 60,
                        height: 60, 
                        cornerRadius: 30, 
                        background: tabIconUnselected, 
                        highlightOnTouch:true,
                        id:"capture-button" 
                        
                    }).onTap(({target})=>{

                        target.enabled = false;

                        return capturePhoto();

                    })

                ),

                new ImageView({
                    bottom:118, 
                    left: ((screen.width / 2) - 53) / 2, 
                    width: 36, 
                    height: 36, 
                    cornerRadius: 18,  
                    highlightOnTouch: true, 
                    tintColor: iconLight, 
                    image: { src: 'resources/icons/flash-off.png', width: 24, height: 24 }, 

                }).onTap(({target})=>{

                    if(countClickOnFlashIcon === 0){

                        target.image = { src: "resources/icons/flash-on.png", width: 24, height: 24 };
                        
                        options.flash = "on";
                        
                        return countClickOnFlashIcon = 1;

                    }
                    
                    if(countClickOnFlashIcon === 1){
                        
                        target.image = { src: "resources/icons/flash-auto.png", width: 24, height: 24 };
                        
                        options.flash = "auto";
                        
                        return countClickOnFlashIcon = 2;

                    }

                    target.image = { src: "resources/icons/flash-off.png", width: 24, height: 24 };
                        
                    options.flash = "off";
                        
                    return countClickOnFlashIcon = 0;

                }),

                new TextView({ 
                    
                    top: ["prev()", 50], 
                    left: 15, 
                    right: 15, 
                    alignment: "centerX", 
                    textColor: thirdTextColor, 
                    text: "Prendre la photo",
                    font:"16px"
                
                })
                
            ).appendTo(contentView);

            /*      We need to be sure that it's have only one instance of cameraWidget open at one time
                    Possible scenario, the camera widget is open and the user receive a message notification
                    if the user click on the notification and then click on the camera inside the message view
                    we will have two instances of cameraWidget, we need to avoid that otherwise , we will have a bug
            */
            
            if($(".pictures-view").length > 1){

                  camera.active = false;

                  frontCamera.active = false;

                  return $(".pictures-view")[0].dispose();

            }

            viewAnimationEntrance(area).then((animation)=>{

                // First we check that if the user have already the permission

                return import("./app-permissions.js").then((hView)=>{

                    return hView.permission("camera").then((result)=>{

                        if(result === "Permission refused"){

                                return closeView(area);
                        }

                        camera.active = true;

                    });

                });

            });

            function capturePhoto(){

                const activeCamera = camera.active === true ? camera : frontCamera;

                return activeCamera.captureImage(options).then((picture) => {

                        area.find("#capture-button").only().enabled = true;

                        resolve(picture);

                        return closeView(area);

                });
                
            }

     });

}