
export default function animate(uiToAnime, animationObject, propertiesAnimationObject, animationDuration = 350){
   
  return new Promise((resolve, reject)=>{

     setTimeout(()=>{

       propertiesAnimationObject = propertiesAnimationObject ?? { repeatValue: 0, reverseValue: false, easingValue: "ease-out"}; 

       const{repeatValue, reverseValue, easingValue} = propertiesAnimationObject;

       uiToAnime.animate(animationObject,
         {

           delay: 0, duration: animationDuration, repeat: repeatValue, reverse: reverseValue, easing: easingValue

         }).then(() => {

            return resolve({ Message: "Animation terminée" });

         });
         
     },0);
   });
};
