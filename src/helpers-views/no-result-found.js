import { TextView } from "tabris";

export default function noResultFound(message){

    return new TextView({

        centerY:0,
        left:15,
        right:15,
        text: message,
        alignment: "centerX"

    });
}