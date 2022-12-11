import navidList from './navid.json'
export const getAirportName = function (m,t){
    if (m == 'ZBAA') {
        return '北京/首都';
    }
    else if (m == 'ZBAD') {
        return '北京/大兴';
    }
    else if (m == 'ZBOW') {
        return '包头/东河';
    }
    else if (m == 'ZBDS') {
        return '鄂尔多斯/伊金霍洛';
    }
    else if (m == 'ZBHH') {
        return '呼和浩特/白塔';
    }
    else if (m == 'ZBLA') {
        return '呼伦贝尔/海拉尔';
    }
    else if (m == 'ZBMZ') {
        return '满洲里/西郊';
    }
    else if (m == 'ZBSJ') {
        return '石家庄/正定';
    }
    else if (m == 'ZBTJ') {
        return '天津/滨海';
    }
    else if (m == 'ZBYN') {
        return '太原/武宿';
    }
    else if (m == 'ZGDY') {
        return '张家界/荷花';
    }
    else if (m == 'ZGGG') {
        return '广州/白云';
    }
    else if (m == 'ZUNC') {
        return '南充/高坪';
    }
    else if (m == 'ZGHA') {
        return '长沙/黄花';
    }
    else if (m == 'ZGKL') {
        return '桂林/两江';
    }
    else if (m == 'ZGNN') {
        return '南宁/吴圩';
    }
    else if (m == 'ZGOW') {
        return '揭阳/潮汕';
    }
    else if (m == 'ZGSZ') {
        return '深圳/宝安';
    }
    else if (m == 'ZHCC') {
        return '郑州/新郑';
    }
    else if (m == 'ZHHH') {
        return '武汉/天河';
    }
    else if (m == 'ZJHK') {
        return '海口/美兰';
    }
    else if (m == 'ZJQH') {
        return '琼海/博鳌';
    }
    else if (m == 'ZSY') {
        return '三亚/凤凰';
    }
    else if (m == 'ZSAM') {
        return '厦门/高崎';
    }
    else if (m == 'ZSCG') {
        return '常州/奔牛';
    }
    else if (m == 'ZSCN') {
        return '南昌/昌北';
    }
    else if (m == 'ZSFZ') {
        return '福州/长乐';
    }
    else if (m == 'ZSHC') {
        return '杭州/萧山';
    }
    else if (m == 'ZSJN') {
        return '济南/遥墙';
    }
    else if (m == 'ZSNB') {
        return '宁波/栎社';
    }
    else if (m == 'ZSNJ') {
        return '南京/禄口';
    }
    else if (m == 'ZSNT') {
        return '南通/兴东';
    }
    else if (m == 'ZSOF') {
        return '合肥/新桥';
    }
    else if (m == 'ZSPD') {
        return '上海/浦东';
    }
    else if (m == 'ZSQD') {
        return '青岛/胶东';
    }
    else if (m == 'ZSQZ') {
        return '泉州/晋江';
    }
    else if (m == 'ZSSH') {
        return '淮安/涟水';
    }
    else if (m == 'ZSSS') {
        return '上海/虹桥';
    }
    else if (m == 'ZSTX') {
        return '黄山/屯溪';
    }
    else if (m == 'ZSWH') {
        return '威海/大水泊';
    }
    else if (m == 'ZSWX') {
        return '无锡/硕放';
    }
    else if (m == 'ZSWZ') {
        return '温州/龙湾';
    }
    else if (m == 'ZSYA') {
        return '扬州/泰州';
    }
    else if (m == 'ZSYN') {
        return '盐城/南洋';
    }
    else if (m == 'ZSYT') {
        return '烟台/蓬莱';
    }
    else if (m == 'ZSYW') {
        return '义乌';
    }
    else if (m == 'ZSZS') {
        return '舟山/普陀山';
    }
    else if (m == 'ZSXZ') {
        return '徐州/观音';
    }
    else if (m == 'ZYCC') {
        return '长春/龙嘉';
    }
    else if (m == 'ZYHB') {
        return '哈尔滨/太平';
    }
    else if (m == 'ZYJM') {
        return '佳木斯';
    }
    else if (m == 'ZYMD') {
        return '牡丹江/海浪';
    }
    else if (m == 'ZYQQ') {
        return '齐齐哈尔/三家子';
    }
    else if (m == 'ZYTL') {
        return '大连/周水子';
    }
    else if (m == 'ZYTX') {
        return '沈阳/桃仙';
    }
    else if (m == 'ZYYJ') {
        return '延吉/朝阳川';
    }
    else if (m == 'ZLDH') {
        return '敦煌/莫高';
    }
    else if (m == 'ZLIC') {
        return '银川/河东';
    }
    else if (m == 'ZLLL') {
        return '兰州/中川';
    }
    else if (m == 'ZLXN') {
        return '西宁/曹家堡';
    }
    else if (m == 'ZLXY') {
        return '西安/咸阳';
    }
    else if (m == 'ZPJH') {
        return '西双版纳/嘎洒';
    }
    else if (m == 'ZPLJ') {
        return '丽江/三义';
    }
    else if (m == 'ZPMS') {
        return '德宏/芒市';
    }
    else if (m == 'ZPPP') {
        return '昆明/长水';
    }
    else if (m == 'ZUCK') {
        return '重庆/江北';
    }
    else if (m == 'ZUGY') {
        return '贵阳/龙洞堡';
    }
    else if (m == 'ZULS') {
        return '拉萨/贡嘎';
    }
    else if (m == 'ZUUU') {
        return '成都/双流';
    }
    else if (m == 'ZUTF') {
        return '成都/天府';
    }
    else if (m == 'ZUXC') {
        return '西昌/青山';
    }
    else if (m == 'ZWSH') {
        return '喀什';
    }
    else if (m == 'ZWTN') {
        return '和田';
    }
    else if (m == 'ZWWW') {
        return '乌鲁木齐/地窝堡';
    }
    else if (m == 'ZBCF') {
        return '赤峰/玉龙';
    }
    else if (m == 'ZBCZ') {
        return '长治/王村';
    }
    else if (m == 'ZBDH') {
        return '秦皇岛/北戴河';
    }
    else if (m == 'ZBLL') {
        return '吕梁/大武';
    }
    else if (m == 'ZBTL') {
        return '通辽';
    }
    else if (m == 'ZBXZ') {
        return '忻州/五台山';
    }
    else if (m == 'ZBYC') {
        return '运城/张孝';
    }
    else if (m == 'ZBZL') {
        return '扎兰屯/成吉思汗';
    }
    else if (m == 'ZBZJ') {
        return '张家口/宁远';
    }
    else if (m == 'ZGHC') {
        return '河池/金城江';
    }
    else if (m == 'ZGHC') {
        return '惠州/平潭';
    }
    else if (m == 'ZGMX') {
        return '梅州/梅县';
    }
    else if (m == 'ZGSD') {
        return '珠海/金湾';
    }
    else if (m == 'ZBSY') {
        return '邵阳/武冈';
    }
    else if (m == 'ZGUH') {
        return '珠海/九州';
    }
    else if (m == 'ZGYL') {
        return '玉林/福绵';
    }
    else if (m == 'ZGZH') {
        return '柳州/白莲';
    }
    else if (m == 'ZHES') {
        return '恩施/徐家坪';
    }
    else if (m == 'ZHJZ') {
        return '荆州/沙市';
    }
    else if (m == 'ZHSN') {
        return '神农架/红坪';
    }
    else if (m == 'ZHSY') {
        return '十堰/武当山';
    }
    else if (m == 'ZHYC') {
        return '宜昌/三峡';
    }
    else if (m == 'ZJYX') {
        return '三沙/永兴';
    }
    else if (m == 'ZJSY') {
        return '三亚/凤凰';
    }
    else if (m == 'ZLAK') {
        return '安康/富强';
    }
    else if (m == 'ZLDL') {
        return '海西/德令哈';
    }
    else if (m == 'ZLGM') {
        return '格尔木';
    }
    else if (m == 'ZLGY') {
        return '固原/六盘山';
    }
    else if (m == 'ZLHZ') {
        return '汉中/城固';
    }
    else if (m == 'ZLJQ') {
        return '嘉峪关';
    }
    else if (m == 'ZLJC') {
        return '金昌/金川';
    }
    else if (m == 'ZLTS') {
        return '天水/麦积山';
    }
    else if (m == 'ZLYA') {
        return '延安/南泥湾';
    }
    else if (m == 'ZBYL') {
        return '榆林/榆阳';
    }
    else if (m == 'ZLYS') {
        return '玉树/巴塘';
    }
    else if (m == 'ZLZW') {
        return '中卫/沙坡头';
    }
    else if (m == 'ZPBS') {
        return '保山/云瑞';
    }
    else if (m == 'ZPDL') {
        return '大理/荒草坝';
    }
    else if (m == 'ZPML') {
        return '宁蒗/泸沽湖';
    }
    else if (m == 'ZPSM') {
        return '普洱/思茅';
    }
    else if (m == 'ZPWS') {
        return '文山/砚山';
    }
    else if (m == 'ZSAQ') {
        return '安庆';
    }
    else if (m == 'ZSGS') {
        return '井冈山';
    }
    else if (m == 'ZSHZ') {
        return '菏泽/牡丹';
    }
    else if (m == 'ZSJD') {
        return '景德镇/罗家';
    }
    else if (m == 'ZSJG') {
        return '济宁/曲阜';
    }
    else if (m == 'ZSJH') {
        return '池州/九华山';
    }
    else if (m == 'ZSWA') {
        return '芜湖/宣州';
    }
    else if (m == 'ZSWF') {
        return '潍坊';
    }
    else if (m == 'ZSWY') {
        return '武夷山';
    }
    else if (m == 'ZUAL') {
        return '阿里/昆莎';
    }
    else if (m == 'ZUAS') {
        return '安顺/黄果树';
    }
    else if (m == 'ZUDC') {
        return '稻城/亚丁';
    }
    else if (m == 'ZBGH') {
        return '广汉';
    }
    else if (m == 'ZUGU') {
        return '广元/盘龙';
    }
    else if (m == 'ZBGZ') {
        return '甘孜/格萨尔';
    }
    else if (m == 'ZUHY') {
        return '阿坝/红原';
    }
    else if (m == 'ZULZ') {
        return '泸州/云龙';
    }
    else if (m == 'ZUMT') {
        return '遵义/茅台';
    }
    else if (m == 'ZURK') {
        return '日喀则/和平';
    }
    else if (m == 'ZUYB') {
        return '宜宾/五粮液';
    }
    else if (m == 'ZUZY') {
        return '遵义/新舟';
    }
    else if (m == 'ZUNZ') {
        return '林芝/米林';
    }
    else if (m == 'ZYCH') {
        return '长海';
    }
    else if (m == 'ZYJD') {
        return '大兴安岭/鄂伦春';
    }
    else if (m == 'ZSLG') {
        return '连云港/花果山';
    }
    else if (m == 'ZYLD') {
        return '伊春/林都';
    }
    else if (m == 'ZYMH') {
        return '漠河/古莲';
    }
    else if (m == 'ZYBS') {
        return '白山/长白山';
    }
    else if (m == 'ZYJS') {
        return '建三江/湿地';
    }
    else if (m == 'ZYFY') {
        return '抚远/东极';
    }
    else if (m == 'ZWZS') {
        return '昭苏/天马';
    }
    else if (m == 'ZUDA') {
        return '达州/金垭';
    }else{
        return t == undefined ? t : t.replace('Taiwan (TWN)','Taiwan, PR of China (PRC)')
    }
}

export const getNavidName = function (ident,present,lat,lng){
    for (let i in navidList){
        let d = navidList[i]
        if (ident == d[0]){
            if (checkNavid(lat,lng,d)){
                return d[1]
            }
        }
    }
    return present
}

function checkNavid(lat,lng,data){
    let nav_lat = parseFloat(data[2])
    let nav_lng = parseFloat(data[3])
    if (Math.abs(nav_lat - lat) < 1 && Math.abs(nav_lng - lng) < 1){
        return true
    }
    return false
}