import { Component } from 'angular2/core';
import { RestaurantesListComponent } from './components/restaurantes-list.components';
import { RestauranteDetailComponent } from './components/restaurante-detail.components';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";

@Component({
    selector:'app',
    templateUrl:'app/views/home.html',
    directives:[
        ROUTER_DIRECTIVES,
        RestaurantesListComponent        
    ]
})

@RouteConfig([
    {path:"/",name:"Home", component:RestaurantesListComponent, useAsDefault:true},
    {path:"/restaurante/:id",name:"Restaurante", component:RestauranteDetailComponent}
])

export class AppComponent{

    public TituloPagina:string = 'restaurantes';
}