import { statusBar, navigationBar } from "tabris";

export default function colorStatusbarNavigationbar(statusOrNavigation, color){

    if(statusOrNavigation === "statusbar"){

        return statusBar.background = color;
    }

    if(statusOrNavigation === "navigationbar"){

            return navigationBar.background = color;
    }

    if(statusOrNavigation === "all"){

            statusBar.background = color;

            navigationBar.background = color;
    }

    return true;

    
}

