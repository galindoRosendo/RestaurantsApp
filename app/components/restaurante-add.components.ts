import { Component, OnInit } from 'angular2/core';
import {ORestaurante} from "../models/ORestaurante";
import {RouteParams, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";

@Component({
    selector:'restaurante-add',
    templateUrl:'app/views/restaurante-add.html',
    providers:[RestauranteService]
})

export class RestauranteAddComponent implements OnInit{
    
    public restaurante:ORestaurante;
    public status:string;
    public errorMessage:string;

    constructor(
        private _restauranteService:RestauranteService,
        private _routeParams:RouteParams,
        private _router:Router
        ){

    }

    ngOnInit(){
        this.restaurante= new ORestaurante(
            0,
            this._routeParams.get('nombre'),
            this._routeParams.get('direccion'),
            this._routeParams.get('descripcion'),
            "null",
            "bajo"
            );
        console.log("Componente rest add cargado")
    }
    
}