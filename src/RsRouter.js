import Vue from "vue";

class RsRouter {
    // vue构造函数
    constructor(Vue, options){
        this.$options = options;
        // 路由映射对象 path:compomemt
        this.routeMap = {}
        this.app = new Vue({
            data: {
                //当前路由
                current: '#/'
            }
        })
        // 事件监听
        this.init()
        this.createRouteMap(this.$options);
        this.initComponent(Vue)
    }

    //初始化 hashchange
    init() {
        window.addEventListener('load',this.onHashChange.bind(this),false)
        window.addEventListener('hashchange',this,onHashChange.bind(this),false)
    }

    createRouteMap(options){
        // 简单情况：平级路由
        options.routes.forEach(element => {
            this.routeMap[DataTransferItem.path] = item.component
        });
    }
    //注册组件
    initComponent(Vue){
        Vue.component('router-link',{
            props: {
                to: String
            },
            // h <==> createElement()
            // <a :href="to"><slot></slot></a>
            // 非浏览器环境不能使用 temeplate
            render: function(h){
                return h(
                    'a',
                    {attrs: {href:this.to}},
                    this.$slots.defualt
                )
            }
        })
        // routew-view 中 this 指向自己非实例
        const _self = this;
        Vue.component('routew-view',{
            render(h){
                var component = _self.routeMap[_self.app.current]
                return h(component)
            }
        })
    }
    //获取hash串
    getHash(){
        return window.location.hash.slice(1) || '/'
    }
    // 设置当前路径
    onHashChange(){
        this.app.current = this.getHash()
    }
}