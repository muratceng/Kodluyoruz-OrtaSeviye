import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'

const BASE_API='https://baconipsum.com/api/?type=all-meat&'

@Injectable({
    providedIn:'root'
})
export class TextService{
    constructor(private http:HttpClient){}

    getText(param:number, type:string){
        let txt =BASE_API+ 'paras=' + param + '&format=' + type;
        console.log(txt);
        return this.http.get(txt,{responseType:'text'})
    }
}