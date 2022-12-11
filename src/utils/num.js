export const getRandomString = function(number,type){
    if (type == 'num'){
        let x='AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    let str = ''
    for(let i=0;i<number;i++){
        str +=  x[parseInt(Math.random()*x.length)]
    }
    return str
    }
    let x='AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789/'
    let str = ''
    for(let i=0;i<number;i++){
        str +=  x[parseInt(Math.random()*x.length)]
    }
    return str
}