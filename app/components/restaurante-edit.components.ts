import { Component, OnInit } from 'angular2/core';
import {ORestaurante} from "../models/ORestaurante";
import {RouteParams, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";

@Component({
    selector:'restaurante-edit',
    templateUrl:'app/views/restaurante-add.html',
    providers:[RestauranteService]
})

export class RestauranteEditComponent implements OnInit{
    
    public restaurante:ORestaurante;
    public status:string;
    public errorMessage:string;
    public titulo:string="Editar Restaurante";

    constructor(
        private _restauranteService:RestauranteService,
        private _routeParams:RouteParams,
        private _router:Router
        ){

    }

    onSubmit(){
        this._restauranteService.editRestaurante(this.restaurante.id,this.restaurante)
                                .subscribe(
                                    response=>{
                                        this.status=response.status;
                                        if(this.status!="success"){
                                            alert("Error en el servidor");
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
        this._router.navigate(['Home']);
        
    }

    callPrecio(value){
        this.restaurante.precio=value;
    }

    ngOnInit(){
        this.restaurante= new ORestaurante(
            parseInt(this._routeParams.get('id')),
            this._routeParams.get('nombre'),
            this._routeParams.get('direccion'),
            this._routeParams.get('descripcion'),
            "null",
            this._routeParams.get('precio')
            );
        console.log("Componente rest edit cargado");
        this.getRestaurante();
    }

    getRestaurante(){
        let id=this._routeParams.get('id');
        this._restauranteService.getRestaurante(id)
                                .subscribe(
                                    response=>{
                                        this.restaurante= response.data;
                                        this.status=response.status;
                                        if(this.status!=="success"){
                                        this._router.navigate(["Home"]);        
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