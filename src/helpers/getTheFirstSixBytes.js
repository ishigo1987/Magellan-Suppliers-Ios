export default function getTheFirstSixBytes(arrBuffer){

    const uint8arr = new Uint8Array(arrBuffer);

    const len = 4;

    if (uint8arr.length >= len) {

        let signatureArr = new Array(len);

        for (let i = 0; i < len; i++){

            signatureArr[i] = (new Uint8Array(arrBuffer))[i].toString(16);
        
        }

        const signature = signatureArr.join('').slice(0, 6);

        return signature;
    }

    
}