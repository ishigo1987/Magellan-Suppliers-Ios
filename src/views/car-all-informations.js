import{TextView, contentView, Composite, ImageView, ScrollView} from "tabris";

import uiCloseWithText from "../helpers-views/ui-close-with-text.js";

import {setHorizontal, openHorizontal} from "../helpers/config-magellan.js";

import { primaryColor,areaBackground } from "../helpers/theme-magellan";

import viewAnimationEntrance from "../helpers-views/animation-view-entrance.js";

import closeView from "../helpers-views/close-view.js";

import createCardsInfoUi from "../helpers-views/create-cards-info-ui.js";

import handleEventButtonsCarAllInformations from "../helpers-views/handle-event-car-buttons-all-informations.js";

import checkCarFolderIsComplete from "../modules/check-car-folder-is-complete.js";

import toast from "../helpers-views/toast.js";

import commonServerErrors from "../helpers/common-server-errors.js";

export default function carAllInformations(cardInfos){

    const{_id, picture, typeExport, depositDate, immatOrigin, tracking, seawayBill, blNumber, exportBill, brandModelYear, attestationImmatriculation, comment} = cardInfos;

    const area = new Composite({

        layoutData: "stretch",
        background: areaBackground, 
        transform: setHorizontal,
        id: 'area-view-file', 
        class: 'activeView'

    }).append(

        new Composite({

            top: 0, 
            left: 0, 
            right: 0, 
            height: 57, 
            background: primaryColor, 
            elevation: 3

        }),

        new ScrollView({

             top: ["prev()", 0],
             left: 0,
             right: 0,
             bottom: 0,
             id: "body-car-all-informations"

        }).append(

            createCardsInfoUi({element: picture ?? "resources/images/no-car.png", type: "image", title: "Photo du véhicule", id: _id, fieldName: "picture"}),

            createCardsInfoUi({element: typeExport ?? "Pas de type export présent", type: "input", title: "Type export", id: _id, fieldName: "typeExport"}),

            createCardsInfoUi({element: depositDate ?? "Pas de date de dépôt présente", type: "text", title: "Date de dépôt", id: _id, fieldName: "depositDate"}),

            createCardsInfoUi({element: immatOrigin ?? "Pas de lieu d'immatriculation présent", type: "text", title: "Origine immatriculation", id: _id, fieldName: "immatOrigin"}),

            createCardsInfoUi({element: tracking ?? "Pas de lien de tracking présent", type: "input", title: "Tracking du véhicule", id: _id, fieldName: "tracking"}),

            createCardsInfoUi({element: seawayBill ?? "resources/images/no-picture.jpg", type: "fichier", title: "Seawaybill", id: _id, fieldName: "seawayBill"}),

            createCardsInfoUi({element: blNumber ?? "Pas de numéro de BL présent", type: "input", title: "Numéro de BL", id: _id, fieldName: "blNumber"}),

            createCardsInfoUi({element: exportBill ?? "resources/images/no-picture.jpg", type: "fichier", title: "Facture d'export", id: _id, fieldName: "exportBill"}),

            createCardsInfoUi({element: brandModelYear ?? "Pas de marque, année, model presents", type: "input", title: "Marque, année, model", id: _id, fieldName: "brandModelYear"}),

            createCardsInfoUi({element: attestationImmatriculation ?? "resources/images/no-picture.jpg", type: "fichier", title: "Attestation d'immatriculation", id: _id, fieldName: "attestationImmatriculation"}),

            createCardsInfoUi({element: comment ?? "Pas de commentaires pour le moment", type: "text-read-only", title: "Commentaire", id: _id})

        ),

        uiCloseWithText(backButtonCallback, `Mise à jour des informations`),

    ).onDispose(()=>{

        // When the modification page is closed, we check if the folder is complete or not

        return checkCarFolderIsComplete(_id);

    }).appendTo(contentView);
    
    
    return viewAnimationEntrance(area).then(()=>{

         return handleEventButtonsCarAllInformations(area.find("#body-car-all-informations").only());
    });

    function backButtonCallback(){ 
        
        return closeView(area);

    }
}