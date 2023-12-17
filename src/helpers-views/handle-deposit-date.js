import { DateDialog } from "tabris";

export default function handleDepositDate(target, date){

    const depositDate = new Date(date);

    new DateDialog({

        date: depositDate,
        minDate: new Date("1987-12-31")

    }).onSelect(({date})=>{

        const resultDate = date.toISOString().split("T")[0];

        return target.text = resultDate;
        
    }).open();
   
     
}