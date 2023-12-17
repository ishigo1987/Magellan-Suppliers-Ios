import card from "./card.js";

import { url } from "../helpers/config-magellan.js";

import handleEventCards from "./events/handle-event-cards.js";

export default function handleCardCars(array, body){

    body.children().dispose();

    array.forEach((info)=>{

        let picture = "resources/images/no-car.png"

        if(info?.picture.includes("no-car") === false){ 

            picture = `${url}/${info?.picture}`;

        }

        card({
           
           id: info?._id,
           modelNameYear : info?.brandModelYear,
           serialNumber : info?.serialNumber ?? "Pas de numéro de série",
           picture: picture,
           comment: info?.comment,
           bl: info?.blNumber,
           status: info?.folderStatus,
           allInfos: info
           
       }).appendTo(body);

    });

    return handleEventCards(body);
}