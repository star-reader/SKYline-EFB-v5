export const getCookie = function (cookie_name) {
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);
    if (cookie_pos != -1) {
        cookie_pos = cookie_pos + cookie_name.length + 1;
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        if (cookie_end == -1) {
            cookie_end = allcookies.length;
        }
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));
    }
    return value;
}
export const clearCookie = function () {  

  setCookie('%7#g_sh', "", -1)
  setCookie('&td_p!6%e', "", -1)
  setCookie('%0_v%srS%w', "", -1)
  setCookie('u_og_Lc!3%e', "", -1)

} 
export const setCookie = function (key,value){
  let date = new Date()
date.setTime(date.getTime() + 25 * 24 * 3600 * 1000)
document.cookie = `${key} = ${value};expires=${date.toGMTString()}`;
}
export const checkCookie = function (that){
    if (that.$route.path.indexOf('/About') == -1){
        if (getCookie('%7#g_sh') != undefined &&
            getCookie('&td_p!6%e') != undefined &&
            getCookie('%0_v%srS%w') != undefined &&
            getCookie('u_og_Lc!3%e') != undefined
        ){
          return 'true'
        }else{
          //未登录
            that.$router.push('/Login')
          return 'false'
        }
  }
}