import {ImageView} from "tabris";

import closeView from "./close-view.js";

export default function uiClose(iconTintColor){

     return new ImageView({
           
        top: 15,
        right: 15, 
        width: 36, 
        height: 36, 
        cornerRadius: 18, 
        tintColor: iconTintColor, 
        highlightOnTouch: true, 
        image: { src: 'resources/icons/close.png', width: 24, height: 24 }, 

     }).onTap(({target})=>{

          return closeView(target.parent(".activeView"));

     });
}