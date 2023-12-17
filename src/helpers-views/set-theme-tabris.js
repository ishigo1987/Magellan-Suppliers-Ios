import {statusBar, navigationBar} from 'tabris';

export default function setThemeTabris(statusOrNav, theme){

    if(statusOrNav === "statusbar"){

          return statusBar.theme = theme;
    }

    if(statusOrNav = "navigationbar"){

        return navigationBar.theme = theme;
    }

    if(statusOrNav === "all"){

        statusBar.theme = theme;
    
        return navigationBar.theme = theme;
    }

 };