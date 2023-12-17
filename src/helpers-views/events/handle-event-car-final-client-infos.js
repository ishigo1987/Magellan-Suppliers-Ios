import openOnWebview from "../open-on-webview.js";

import viewFile from "../view-file.js";

import uploadKbisCardId from "../../views/upload-kbis-card-id.js";

import toast from "../toast.js";

export function handleEventCarFinalClientInfos(buttons){

    buttons.on({

        select: ({target})=>{

            if(target?.data?.tracking !== undefined){

                 const trackingLink = target?.data?.tracking;

                 return openOnWebview(trackingLink);
            }

            if(target?.data?.receipt846A !== undefined){

                 const receipt846AFile = target?.data?.receipt846A;

                 return viewFile(receipt846AFile);
            }

            if(target?.data?.kbis_id !== undefined){

                 const cardId = target?.data?.cardId;

                 return uploadKbisCardId(cardId);
            }

            return toast("Impossible d'effectuer l'action demandée, elle n'est pas encore disponible.", 3000, "bottom");
        }

    });
}