export default function removeFilePrefix(filePath){

    const filePrefix = "file:///";

    if(filePath.startsWith(filePrefix) === true){

          return filePath.slice(filePrefix.length);
    }

    return filePath;
}