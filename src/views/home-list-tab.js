import {Tab} from "tabris";

import handleHomeList from "../helpers-views/handle-home-list.js";

import getFinalClientCar from "../views/get-final-client-car.js";

export default function homeListTab(){

    const homeListTab = new Tab({
      
        layoutData: "stretch",
        image: "resources/icons/home+.png",
        title: "Accueil",
        id: "home-list-tab"

    })

    handleHomeList(homeListTab).subscribe((result)=>{

        return getFinalClientCar(result);

    });

    return homeListTab;
}