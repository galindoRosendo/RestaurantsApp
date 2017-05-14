import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";
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
}