export default function commonServerErrors(message){

    if(message === "caractère special interdit"){

        return "Votre requête contient des caractères spéciaux interdits, veuillez les remplacer et réessayer.";
    }

    if(message === "Problem with database or request"){

        return "Impossible de joindre le serveur, veuillez vérifier votre connexion internet.";
    }

    if(message === "fieldsEmpty"){

        return "Veuillez remplir tous les champs.";
    }

    if(message === "badEmail"){

        return "Veuillez entrer une adresse mail valide.";
    }

    if(message === "badName"){

        return "Veuillez entrer le nom complet.";
    }

    if(message === "badPassword"){

        return "Veuillez entrer un mot de passe qui contient au moins une lettre majuscule, une lettre minuscule, un chiffre, un caractère spécial autre que ($, && et ||) et qui a au moins 12 caractères.";
    }

    if(message === "bad access"){

        return "Le couple login/code confidentiel n'est pas correct.";
    }

    if(message === "Mauvais JWToken"){

        return "Impossible d'effectuer l'opération demandée.";
    }

    if(message === "Problem with download"){

        return "Impossible d'afficher le fichier.";
    }

    if(message === "File not handle"){

        return "Seuls des images et des fichiers au format pdf sont autorisés.";
    }

    if(message === "No change"){

        return "Vous n'avez fait aucun changement pour le moment.";
    }

    if(message === "New car added"){

        return "La nouvelle voiture vient d'être ajoutée, pour la modifier, cliquer sur ses informations.";
    }

    if(message === "only pictures"){

        return "Seules des images aux formats png, jpg, jpeg, webp sont acceptés. Si le fichier que vous essayez d'envoyer est une image, il se pourrait qu'il soit corrompu, essayez de le renvoyer.";

    }

    if(message === "Choice error"){

        return "Erreur avec la sélection du fichier.";
    }

    return "Aucun affichage";
}