import animate from "./animation";

import {setHorizontal, secondTranslateHorizontal} from "../helpers/config-magellan.js";

export default function closeView(viewToClose, timeToDisappear = 350){

    return new Promise((resolve)=>{
         
        const viewUnderActiveView = viewToClose.siblings(".activeView");

        function animateActiveView(){

             return new Promise((resolve)=>{

                  return animate(viewToClose, { transform: setHorizontal}, null, timeToDisappear).then((response)=>{

                        return resolve(response.Message);
                  });
             });
        }


        function animateViewUnderActiveView(){

             return new Promise((resolve)=>{

                  return animate(viewUnderActiveView[viewUnderActiveView.length - 1], { transform: secondTranslateHorizontal }, null, 350).then((response)=>{

                       return resolve (response.Message);
                  })
             })
        }
      

        return Promise.all([animateActiveView(), animateViewUnderActiveView()]).then(()=>{

             viewToClose.dispose();

             return resolve({Message: "Animation terminée"});

        }).catch((error)=>{

          //   console.log(error)
        })

    })
}