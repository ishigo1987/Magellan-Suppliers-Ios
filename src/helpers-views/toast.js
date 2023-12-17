import {snackbarColor} from "../helpers/theme-magellan.js";

export default function toast(message, duration, position){

    window.plugins.toast.showWithOptions({

        message: message,

        duration: duration, // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.

        position: position,

        addPixelsY: -50,  // added a negative value to move it up a bit (default 0)

        styling: {
            
            backgroundColor: snackbarColor, // make sure you use #RRGGBB. Default #333333

            textSize: 15, // Default is approx. 13.
        }
    });

}
