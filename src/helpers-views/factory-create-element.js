import { ImageView, PdfView } from "tabris";

import { areaBackground } from "../helpers/theme-magellan";

import { url } from "../helpers/config-magellan";

export default function createElement(file){

     if(typeof(file) === "string"){

         // This is an image path

         const fileExtension = file.split(".").pop().toLowerCase();
     
        const allowedImagesExtensions = ["jpg", "jpeg", "png", "jpg"];

         if(allowedImagesExtensions.includes(fileExtension) === true){

                let path;

                if(file.includes("http://") === true || file.includes("https://") === true){

                    path = file;

                }else{

                    path = `${url}/${file}`;
                }

                return new ImageView({

                     top: ["prev()", 0],
                     left: 0,
                     right:0,
                     bottom: 0,
                     scaleMode: "fit",
                     zoomEnabled: true,
                     image: {src: path, width: screen.width, height: screen.height}

                });
          
         }
     }

     if(typeof(file) === "object"){

        const pdf = new PdfView({
   
            top: ["prev()", 0],
            left: 0,
            right: 0,
            bottom: 0,
            background: areaBackground,
            pageElevation: 2,
            spacing: 12,
            zoomEnabled: true

        });
        
        pdf.src = file;

        return pdf;
         
     }


    
}