import carAllInformations from "../../views/car-all-informations";

export default function handleEventCards(body){

      const cards = body.find(".card");

      cards.on({

          tap: ({target})=>{

                return carAllInformations(target?.data?.allInfos);

          }
      })
}