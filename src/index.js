"use strict";

import {app, navigationBar, statusBar, devTools } from "tabris";

import backButtonNavigation from "./services/back-button-navigation.js";

import setThemeTabris from "./helpers-views/set-theme-tabris.js";

import screenOrientationLock from "./helpers-views/screen-orientation-lock.js";

import colorStatusbarNavigationbar from "./helpers-views/color-statusBar-navigationBar.js";

function appInitialization(){

    app.idleTimeoutEnabled = false;

    // Default Setting
    window.SoftInputMode.set('adjustPan');

    // Register font
    // app.registerFont("magellan", "resources/fonts/Montserrat-Regular.ttf");

    // We manage the Android back button
    backButtonNavigation();

    // Lock the screen Orientation
    screenOrientationLock();

    // Set the statusbar color
    colorStatusbarNavigationbar("statusbar", "#fe7500");

    setThemeTabris("statusbar", "dark");

     // Set the navigationbar color
     colorStatusbarNavigationbar("navigationbar", "#f5f5f5");

     setThemeTabris("navigationbar", "light");

    const token = localStorage.getItem("token");

    const userInfos = localStorage.getItem("userInfos");

    if(token === null){

         // We redirect the user to the index view

         return import("./views/authentication.js").then((view)=>{

              return view.authentication();
         });

    }

    if(userInfos !== null){

        const userRole = JSON.parse(userInfos).userRole;

        if(userRole === "final-client"){

               return import("./views/home-final-client.js").then((view)=>{
     
                    return view.homeFinalClient();
               });

        }

        return import("./views/home.js").then((view)=>{
    
            return view.home();
        });
    }


}

appInitialization();

// Need to be removed on production mode

devTools.hideUi();

