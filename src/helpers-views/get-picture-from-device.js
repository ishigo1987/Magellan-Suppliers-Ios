import { ActionSheet, fs} from "tabris";

import takePicture from "./take-picture";

import cropImage from "./crop-image";

import removeFilePrefix from "../helpers/removeFilePrefix";

import toast from "./toast";

import commonServerErrors from "../helpers/common-server-errors";

import { folderCache } from "../helpers/config-magellan";

export default function getPictureFromDevice(){

        return new Promise((resolve)=>{

            const allowedPicturesExtensions = ["jpg", "jpeg", "png", "webp", "gif"];

            const items = [{title: "Prendre une photo", image: { src: "resources/icons/camera.png", width: 22, height: 22 }}, {title: "Prendre dans la galerie", image: { src: "resources/icons/picture.png", width: 22, height: 22 }}, {title: 'Annuler', style: 'destructive', image: { src: "resources/icons/close.png", width: 22, height: 22 }}];

            return new ActionSheet({
        
                title: "Choisir un fichier",
                actions: items
        
                }).onSelect(({index})=>{
        
                    // Taking picture from camera
        
                    if(index === 0){ 
        
                        return takePicture().then((result)=>{ 

                            // Copy the blod inside an cache file

                            const filePath = `${fs.cacheDir}/temporary.jpeg`;

                            setTimeout(()=>{

                                return fs.writeFile(filePath, result?.image).then(()=>{

                                    return handleCropImage(`file://${filePath}`);
    
                                }).catch((error)=>{
    
                                    return toast(commonServerErrors("Choice error"), 3000, "bottom");
                                });

                            },250);

                        });
                    }
        
                    // Taking picture from gallery
        
                    if(index === 1){

                            cordova.wavemaker.filePicker.selectFiles(
                                false,
                                 // to select multiple files
                                (selectedFilePaths)=>{
 
                                     if(selectedFilePaths.length !== 0){

                                        const fileExtension = selectedFilePaths[0].split(".").pop().toLowerCase();

                                        if(allowedPicturesExtensions.includes(fileExtension) === true){
    
                                             return handleCropImage(selectedFilePaths[0]);
                                        }

                                        if(fileExtension === "pdf"){

                                             return fs.readFile(removeFilePrefix(selectedFilePaths[0])).then((arrBufferPdf)=>{

                                                    return resolve(arrBufferPdf);
                                             });
                                        }

                                        return false;
    
                                     }

                                     return false;

                                }, (error)=>{
                                  // handle error
                                }
                            );
                    }

                    function handleCropImage(image){

                        return cropImage(image).then((resultImage)=>{

                              if(resultImage.Message === "Crop ok"){

                                   // turn image into arrayBuffer

                                   return setTimeout(()=>{
     
                                        return fs.readFile(removeFilePrefix(resultImage.Data)).then((arrBufferImg)=>{

                                                return resolve(arrBufferImg);

                                        });

                                   }, 100);

                              }
                        });
                    }
                    
                }).open();
        });

}