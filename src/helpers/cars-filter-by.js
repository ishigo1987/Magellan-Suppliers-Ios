export default function carsFilterBy(array, needle, option){

    return array.filter((element)=>{ 

         if(option === "Numéro de série" && element?.serialNumber?.toLowerCase().includes(needle?.toLowerCase()) === true){

            return element;
         }

         if(option === "Marque voiture" && element?.brandModelYear?.toLowerCase()?.includes(needle.toLowerCase()) === true){

             return element;
         }
         
    });
}