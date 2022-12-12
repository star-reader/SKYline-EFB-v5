# SKYline-EFB-v5
SKYline 电子飞行包最新版源代码(V5.3.2 最新版更新时间截止到2022-12-11)

# 写在前面
看着EFB效果很好？这个其实是我入门vue时候的练手项目。很多代码都不规范。

代码缺点如下：

没有合理使用组件化，甚至出现了一个组件几千行，该复用不复用的情况

代码逻辑极其杂乱，各部分功能分配及其不均衡

介于以上两点，请准备好降压药再查看本项目

一来我不是科班生，二来这是我第一个比较大型的vue练手学习项目，各方面能挑出来很多毛病，还望轻喷

...(省略千言万语)

各位要是不嫌弃，欢迎克隆下来研究和使用，也欢迎各位帮忙改进我们代码

# 项目部署
使用```npm install```安装依赖

使用```npm run serve```启动开发环境

使用```npm run build```进行项目打包

# 说明
使用前请【务必】阅读“写在前面”部分

请将crypto中的加密密钥和偏移量替换为自己项目的，相应接口为https://api.skylineflyleague.cn/efb_api_v2/crypto/sign

请注意产品使用合法性，部署打包上线时请确保阅读navigraph相应开发者文档并遵守其开发规定

因为隐私原因已经删除涉及用户数据处理的personal.vue和对应路由/Personal

因为隐私原因已经删除涉及用户登录与证书逻辑的部分
