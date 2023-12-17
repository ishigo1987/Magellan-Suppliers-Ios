import {permission} from "tabris";

export function permission(permissionName){

    return new Promise((resolve) => {

        if (permission.isAuthorized(permissionName)) {

            return resolve("Permission granted");

        }
            
        return permission.requestAuthorization(permissionName).then((responseStatus) => {

            if(responseStatus !== "granted"){

                return resolve("Permission refused");
            }

            return resolve("Permission granted");
        });
        
    });

}