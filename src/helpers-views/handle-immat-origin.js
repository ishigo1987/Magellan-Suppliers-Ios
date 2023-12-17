import { ActionSheet } from "tabris";

export default function handleImmatOrigin(target){

         const items = [{title: "EAU"}, {title: "USA"}, {title: "BELGIQUE"}, {title: "CANADA"}, {title: "JAPON"}, {title: "FRANCE"}, {title: "PROCHE ORIENT"}, {title: "MAGHREB"}, {title: "AMERIQUE LATINE"}, {title: "ANNULER", style:"destructive"}];
        
         new ActionSheet({
            title: 'Origine immatriculation',
            actions: items
          }).onSelect(({index})=>{

               const title = items[index]?.title;

               if(title !== "ANNULER"){

                   return target.text = title;
               }

               return false;

          }).open();
}