import uploadFile from "../modules/upload-file.js";

import toast from "./toast.js";

import { url } from "../helpers/config-magellan.js";

import commonServerErrors from "../helpers/common-server-errors.js";

import getPictureFromDevice from "./get-picture-from-device.js";

export default function uploadFile(parent){

    const dataFieldName = parent?.data?.dataFieldName;

    const dataId = parent?.data?.id;

    getPictureFromDevice().then((result)=>{

      toast("Envoi du fichier en cours...", 2000, "bottom");

      return uploadFile(result, dataId, dataFieldName).then((response)=>{

           if(response.Message === "Upload ok"){

                let filePath = response?.Data;

                const filePathExtension = filePath.split(".").pop().toLowerCase();

                if(filePathExtension === "pdf"){

                      filePath = "resources/images/document.png";
                }else{

                     filePath = `${url}/${filePath}`;
                }

                return parent.image = {src: filePath, width: screen.width, height: 200};

           }

           return toast(commonServerErrors(response.Message), 4000, "bottom");

      });

    });

}