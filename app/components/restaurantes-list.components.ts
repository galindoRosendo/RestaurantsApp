import { Component, OnInit } from 'angular2/core';
import {ORestaurante} from "../models/ORestaurante";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";

@Component({
    selector:'restaurantes-list',
    templateUrl:'app/views/restaurantes-list.html',
    providers:[RestauranteService]
})

export class RestaurantesListComponent{

    public TituloPagina:string = 'Listado de Restaurantes';
    public restaurantes:ORestaurante[];
    public status:string;
    public errorMessage:string;
    constructor(private _restauranteService:RestauranteService){

    }

    ngOnInit(){
        this.getRestaurantes();
        console.log("restaurantesListComponent cargado");
    }

    getRestaurantes(){
        this._restauranteService.getRestaurantes()
                                .subscribe(
                                    result=>{
                                        this.restaurantes=result.data;
                                        this.status=result.status;
                                        if(this.status!=="success"){
                                            alert("error en el servidor");
                                        }
                                    },
                                    error=>{
                                        this.errorMessage=<any>error;
                                        if(this.errorMessage!==null){
                                            console.log(this.errorMessage);
                                            alert("error en la peticion");
                                        }
                                    }
                                );
    }
}