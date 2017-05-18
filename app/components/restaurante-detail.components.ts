import { Component, OnInit } from 'angular2/core';
import {ORestaurante} from "../models/ORestaurante";
import {RouteParams, Router} from "angular2/router";
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
        private _routeParams:RouteParams,
        private _router:Router
        ){

    }

    ngOnInit(){
        this.getRestaurante();
    }

    getRestaurante(){
        let id=this._routeParams.get('id');
        let random=this._routeParams.get('random');
        this._restauranteService.getRestaurante(id, random)
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