export default function debounce(userInputValue){

    let timeOut;
       
    return new Promise((resolve, reject)=>{

        clearTimeout(timeOut);

        timeOut = setTimeout(()=>{

           if(userInputValue.length === 0){

               return resolve("Cancel search");

           }

           return resolve(userInputValue);
             
        },1000);


    });

}