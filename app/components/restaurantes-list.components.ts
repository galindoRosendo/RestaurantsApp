import { Component, OnInit } from 'angular2/core';
import {ORestaurante} from "../models/ORestaurante";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";

@Component({
    selector:'restaurantes-list',
    templateUrl:'app/views/restaurantes-list.html',
    directives:[ROUTER_DIRECTIVES],
    providers:[RestauranteService]
})

export class RestaurantesListComponent implements OnInit{

    public TituloPagina:string = 'Listado de Restaurantes';
    public restaurantes:ORestaurante[];
    public status:string;
    public errorMessage:string;
    public confirmado;

    constructor(private _restauranteService:RestauranteService){

    }

    ngOnInit(){
        this.getRestaurantes();
        console.log("restaurantesListComponent cargado");
    }

    getRestaurantes(){
        let box_restaurantes=<HTMLElement>document.querySelector("#restaurantes-list .loading");
        box_restaurantes.style.visibility="visible";

        this._restauranteService.getRestaurantes()
                                .subscribe(
                                    result=>{
                                        this.restaurantes=result.data;
                                        this.status=result.status;
                                        if(this.status!=="success"){
                                            alert("error en el servidor");
                                        }
                                        box_restaurantes.style.display="none";
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

    onBorrarConfirm(id:number){
        this.confirmado=id;
    }

    onCancelarConfirm(id:number){
        this.confirmado=null;
    }

    onBorrarRestaurante(id:number){
                this._restauranteService.deleteRestaurante(id)
                                .subscribe(
                                    result=>{
                                        this.restaurantes=result.data;
                                        this.status=result.status;
                                        if(this.status!=="success"){
                                            alert("error en el servidor");
                                        }
                                        this.getRestaurantes();
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