
import toast from "./toast.js";

import commonServerErrors from "../helpers/common-server-errors.js";

import updateText from "../modules/update-text.js";

export default function updateText(parent, mainButton){ 

        const dataFieldName = parent?.data?.dataFieldName;

        const dataId = parent?.data?.id;

        const text = parent.text;

        const oldValue = mainButton?.data?.oldValue;

        if(oldValue.toLowerCase() === text.toLowerCase()){

            toast(commonServerErrors("No change"), 3000, "bottom");

            return mainButton.set({

                data: {action: "edit", oldValue: parent.text},
                image: {src: "resources/icons/edit.png", width: 16, height: 16},
                text: "Editer"
             })
        }

        toast("Mise à jour en cours...", 3000, "bottom");

        return updateText(text, dataId, dataFieldName).then((response)=>{

            if(response.Message === "Update ok"){

                 parent.editable = false;

                 return mainButton.set({

                    data: {action: "edit", oldValue: parent.text},
                    image: {src: "resources/icons/edit.png", width: 16, height: 16},
                    text: "Editer"
                 })

            }

            return toast(commonServerErrors(response.Message), 3000, "bottom");

        });
     
}