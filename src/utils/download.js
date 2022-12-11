export const downloadFile = function(filename,text){
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.click();
}
export const downloadRes = function(filename,url){
        let element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', filename);
        element.click();
}