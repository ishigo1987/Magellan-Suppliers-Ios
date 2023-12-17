export default function convertToArrayBuffer(blob){

    return new Promise((resolve) => {

        return blob.arrayBuffer().then((arrBuff)=>{

             return resolve(arrBuff);
              
        });

    });
}