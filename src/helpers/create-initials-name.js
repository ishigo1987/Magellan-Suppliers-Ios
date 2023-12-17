export default function createInitialsName(name){

     if([undefined, ""].includes(name) === true){

         return false;
     }

     const arrFromName = name.split(" ");

     const firstInitial = arrFromName[0].charAt(0).toUpperCase();

     let secondInitial;

     if(arrFromName.length > 1){

          secondInitial = arrFromName[1].charAt(0).toUpperCase();

          return `${firstInitial}${secondInitial}`;
     }

     return firstInitial;

}