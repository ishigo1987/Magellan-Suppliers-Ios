import {Composite,contentView,ImageView,TextView, navigationBar, statusBar, ActivityIndicator} from "tabris";

import {primaryTextColor, areaBackground,  maskBackground, navigationBarColorPrimary, statusBarColor, primaryColor, navigationBarColorSecondary} from "../helpers/theme-magellan.js";

import colorStatusbarNavigationbar from "./color-statusBar-navigationBar.js";

export default function loader(message, show = true){

    const modalMask = new Composite({
      
      top:0,
      right:0,
      left:0,
      bottom:0,
      background: maskBackground,
      id:"loader-mask",
      class:'activeView'

    }).append(

        new Composite({
          
          left:20,
          right:20,
          centerY:0,
          background:"#ffffff", 
          elevation:1,
          padding:15,
          cornerRadius:5

        }).append(

          new ActivityIndicator({ 
            
            width:24, 
            height:24, 
            centerY:0, 
            
          }),

          new TextView({
            
            left:["prev()", 10],
            right:0, 
            centerY:0, 
            textColor:primaryTextColor,
            text:message
          
          })

        )
    ).onTap(()=>{

       // This hack is because without event the mask will be transparent 
    });

    if(show === true){

       colorStatusbarNavigationbar("statusbar", statusBarColor);

       colorStatusbarNavigationbar("navigationbar", navigationBarColorSecondary);

       return modalMask.appendTo(contentView);

    }

    colorStatusbarNavigationbar("statusbar", primaryColor);

    colorStatusbarNavigationbar("navigationbar", navigationBarColorPrimary);

    return contentView.find("#loader-mask").dispose();
  
}

