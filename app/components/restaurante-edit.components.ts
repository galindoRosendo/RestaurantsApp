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
    public filesToUpload:Array<File>;
    public resultUpload;
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

    fileChangeEvent(fileInput:any){
        this.filesToUpload=<Array<File>>fileInput.target.files;

        this.makeFileRequest("http://nld.bdtdevelop.com/apiAngular2/index.php/upload-file", [],this.filesToUpload).then((result)=>{
            this.resultUpload=result;
            this.restaurante.imagen=this.resultUpload.filename;
            console.log(this.resultUpload.filename);
        },(error)=>{
            console.log(error);
        });
    }

    makeFileRequest(URL:string, params:Array<string>, files:Array<File>){
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