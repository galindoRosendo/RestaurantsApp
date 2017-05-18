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
    public titulo:string="Añadir restaurante";
    constructor(
        private _restauranteService:RestauranteService,
        private _routeParams:RouteParams,
        private _router:Router
        ){

    }

    onSubmit(){
        this._restauranteService.addRestaurante(this.restaurante)
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
            0,
            this._routeParams.get('nombre'),
            this._routeParams.get('direccion'),
            this._routeParams.get('descripcion'),
            "null",
            "bajo"
            );
        console.log("Componente rest add cargado")
    }

    makeFileRequest(URL:string, params:Array<string>, files:Array<string>){
        return new Promise((resolve, reject)=>{
            var formData: any= new FormData();
            var xhr= new XMLHttpRequest();
            for(var i =0;i<files.length;i++){
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange= function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        resolve(JSON.parse(xhr.response))
                    }else{
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST",URL,true);
            xhr.send(formData);
        });
    }
    
}