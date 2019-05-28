// nodejs 代码
module.exports = {
    /**
     * ! 坑：部署项目根目录变化
     * ? 页面所有路径都会加入此路径
     */
    publicPath: '/',
    /**
     * * webpack配置
     */
    configureWebpack : {
        // 开发服务器
        devServer: {
            // 服务器启动之前的一个钩子函数，对服务器的实例提前做一些处理
            before(app){
                // app 是 experss 实例 ：：node接口
                app.get('/goods', (reg, res) => {
                    res.json([
                        {id:1,text:'qwe'},
                        {id:2,text:'asd'},
                    ])
                })
            }
        }
    }
}