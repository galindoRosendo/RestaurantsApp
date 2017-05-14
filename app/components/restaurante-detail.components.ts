import { Component, OnInit } from 'angular2/core';
import {ORestaurante} from "../models/ORestaurante";
import {RouteParams} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";

@Component({
    selector:'restaurante-detail',
    templateUrl:'app/views/restaurante-detail.html',
    providers:[RestauranteService]
})

export class RestauranteDetailComponent implements OnInit{
    
    public restaurante:ORestaurante;
    public status:string;
    public errorMessage:string;

    constructor(
        private _restauranteService:RestauranteService,
        private _routeParams:RouteParams
        ){

    }

    ngOnInit(){
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