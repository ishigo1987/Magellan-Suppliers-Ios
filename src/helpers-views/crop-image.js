export default function cropImage(picture){

     return new Promise((resolve)=>{

          let options = {
               quality: 100,
               allowRotate: true,
               keepCropAspectRatio: false,
               showCropGrid: true,
               toolbarTitle: "Rogner l'image",
               targetWidth:600,
               targetHeight:600,
               statusBarColor:  "#fd7500",
          };

          plugins.crop.promise(picture, options).then((newPath)=>{

               // The image cropped came with something like that ?158974325 after the extension, i need to remove it

               newPath = newPath.split("?").slice(0, -1).join("");

               return resolve({ Message: "Crop ok", Data: newPath});

          }).catch((err)=>{ 

              return resolve({Message: "User cancelled"});

          })
          
     });
}