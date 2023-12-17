import {contentView } from "tabris";

import uploadFile from "./upload-file.js";

import updateText from "./update-text.js";

import handleDepositDate from "./handle-deposit-date.js";

import handleImmatOrigin from "./handle-immat-origin.js";

import viewFile from "./view-file.js";

export default function handleEventButtonsCarAllInformations(body){

        const buttons = body.find(".card-button");

        buttons.on({

             select: ({target})=>{

                    const action = target?.data?.action;

                    const parent = target.siblings(".element").only();

                    const dataType = parent?.data?.dataType;

                    const dataFieldName = parent?.data?.dataFieldName;

                    const dataPath = parent?.data?.dataPath;

                    if(action === "edit"){

                        if(["image", "fichier"].includes(dataType) === true){

                            return uploadFile(parent);

                        }

                        if(dataType === "input"){

                              parent.set({

                                   editable: true,
                                   focused: true
                              
                              });

                              target.set({

                                   data: {action: "save", oldValue: parent.text},
                                   image: {src: "resources/icons/save.png", width: 16, height: 16},
                                   text: "Enregistrer"
                              });

                        }

                        if(dataType === "text"){

                              target.set({

                                   data: {action: "save", oldValue: parent.text},
                                   image: {src: "resources/icons/save.png", width: 16, height: 16},
                                   text: "Enregistrer"
                              });

                              // depositDate and immatOrigin cases

                              if(dataFieldName === "depositDate"){

                                   return handleDepositDate(parent, parent.text);
                              }

                              return handleImmatOrigin(parent);

                        }
                    }

                    if(action === "save"){

                         return updateText(parent, target);

                    }

                    if(action === "see"){

                          return viewFile(dataPath);
                    }

             }
        })
}