import {Injectable} from "angular2/core";
import {Http, Response,Headers} from "angular2/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {ORestaurante} from "../models/ORestaurante";

@Injectable()
export class RestauranteService{
    public webApi='http://nld.bdtdevelop.com/apiAngular2/index.php/';

    constructor(private _http:Http){

    }

    getRestaurantes(){
        return this._http.get(this.webApi + 'restaurantes')
                         .map(res=>res.json());
    }

    getRestaurante(id:string){
        return this._http.get(this.webApi + 'restaurante/'+id)
                         .map(res=>res.json());
    }

    addRestaurante(restaurante:ORestaurante){
        let json =JSON.stringify(restaurante);
        let params="json="+json;
        let headers= new Headers({"Content-Type":"application/x-www-form-urlencoded"});

        return this._http.post(
                                this.webApi + "restaurantes", 
                                params, 
                                {
                                    headers:headers
                                }
                            ).map(res=>res.json());
    }

    editRestaurante(id:number,restaurante:ORestaurante){
        let json =JSON.stringify(restaurante);
        let params="json="+json;
        let headers= new Headers({"Content-Type":"application/x-www-form-urlencoded"});

        return this._http.post(
                                this.webApi + "update-restaurante/"+id, 
                                params, 
                                {
                                    headers:headers
                                }
                            ).map(res=>res.json());
    }

    deleteRestaurante(id:number){
                return this._http.get(this.webApi + 'delete-restaurante/'+id)
                         .map(res=>res.json());
    }
}