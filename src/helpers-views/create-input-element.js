import {Composite, TextInput, ImageView} from "tabris";

import {primaryColor, secondaryTextColor, iconsColor, tabFolderTabArea} from "../helpers/theme-magellan.js";

export default function createInputElement(imgName, inputPlaceholder, inputName){

    const composite = new Composite({ 
            
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
            image: { src: `resources/icons/${imgName}.png`, width: 18, height: 18 }, 
            tintColor: iconsColor 
        }),

        new TextInput({ 
            
            centerY: 0, 
            left: ["prev()", 5], 
            right: 32, 
            style: 'none', 
            maxChars:100, 
            type: inputName === "password" ? "password" : "default",
            floatMessage: false, 
            textColor: secondaryTextColor, 
            cursorColor: primaryColor, 
            background: 'transparent',
            message: `${inputPlaceholder}`, 
            messageColor: secondaryTextColor, 
            font: "14px",
            id: inputName,
            class: "input"
        
        })

    )

    const textInput = composite.find(TextInput).only();

    if(textInput.type === "password"){

        composite.append(

            new ImageView({

                right: 10, 
                centerY: 0, 
                width: 20, 
                height: 20, 
                image: { src: "resources/icons/hide-password.png", width: 18, height: 18 }, 
                tintColor: iconsColor 

            }).onTap(({target})=>{

                if(textInput.revealPassword === false){

                    target.image = {src:"resources/icons/show-password.png", width: 18, height: 18};

                    return textInput.revealPassword = true;
                }

                target.image = {src:"resources/icons/hide-password.png", width: 18, height: 18};

                return textInput.revealPassword = false;

            })
        )
    }

    return composite;


};