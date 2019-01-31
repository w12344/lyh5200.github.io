import Vue from "vue";
import Router from "vue-router";


Router.prototype.goBack = function(){
    this.isBac = true;
    window.history.go(-1)
}

vue.use(Router)


const router = new Route({
    routes:[
        {
            path:"/",
            name:'BaseTransition',
            component:BaseTransition,
            children:[
                {
                    path:"",
                    name:"index",
                    component:Index
                }
            ]
        }
    ]
})