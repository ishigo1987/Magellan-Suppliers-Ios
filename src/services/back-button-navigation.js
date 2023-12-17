import {app,contentView} from "tabris";

import closeView from "../helpers-views/close-view.js";

export default function backButtonNavigation(){

    app.onBackNavigation((event)=>{

        event.preventDefault();

        const activeView = contentView.find('.activeView').last();
        
        if(["authentication", "home", "home-final-client"].includes(activeView.id) === true){

              return app.close();

        }

        if(["final-clients-cars", "final-client-cars", "area-webview", "area-view-file", "capture-photo-view", "import-kbis-view", "user-general-conditions", "area-display-messages"].includes(activeView.id) === true){ 

            return closeView(activeView);
          
        }

       return true;
          
    });

}

