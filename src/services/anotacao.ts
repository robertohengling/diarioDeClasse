import {Injectable} from'@angular/core';
import {Headers, URLSearchParams,RequestOptions} from '@angular/http';
import {Anotacao} from '../dto/anotacao';
import * as constants from '../config/constants';
import {BaseHttpService} from './base-http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AnotacaoService {
	baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/mysql/_table/anotacao';
	constructor(private httpService: BaseHttpService) {

	};


	query (idAula: number, params?:URLSearchParams): Observable<Anotacao[]> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);    	
		return this.httpService.http
			.get(this.baseResourceUrl+'?filter=id_aula='+idAula, { search: params, headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let anotacoes: Array<Anotacao> = [];
				result.resource.forEach((obeservacao) => {
					anotacoes.push(Anotacao.fromJson(obeservacao));
				});
				return anotacoes;
			}).catch(this.handleError);
	};
	private handleError (error: any) {
	   let errMsg = (error.message) ? error.message :
	   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	   console.log(errMsg); // log to console instead
	   localStorage.setItem('session_token', '');       
	  return Observable.throw(errMsg);
	}


	remove (id: string) {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.delete(this.baseResourceUrl + '/' + id,{ headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				return result.id;
			});
	}

  patch (idAula: number, anotacao: Anotacao) {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });
		
		return this.httpService.http.patch(this.baseResourceUrl, Anotacao.toJson(anotacao,idAula,true),options)
			.map((data) => {
				return data;
		});
		
	}
	post(idAula: number, anotacao: Anotacao){
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });
		return this.httpService.http.post(this.baseResourceUrl, Anotacao.toJson(anotacao,idAula,true),options)
			.map((data) => {
				return data;
		});
	}
}
