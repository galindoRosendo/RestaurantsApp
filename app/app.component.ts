import { Component } from 'angular2/core';
import { RestaurantesListComponent } from './components/restaurantes-list.components';
import { RestauranteDetailComponent } from './components/restaurante-detail.components';
import { RestauranteAddComponent } from './components/restaurante-add.components';
import { RestauranteEditComponent } from './components/restaurante-edit.components';
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
    {path:"/restaurante/:id",name:"Restaurante", component:RestauranteDetailComponent},
    {path:"/crear-restaurante/",name:"CrearRestaurante", component:RestauranteAddComponent}, 
    {path:"/editar-restaurante/:id",name:"EditarRestaurante", component:RestauranteEditComponent},    
    {path:"/restaurante-aleatorio/:random",name:"RestauranteAleatorio", component:RestauranteDetailComponent}    
])

export class AppComponent{

    public TituloPagina:string = 'restaurantes';
}