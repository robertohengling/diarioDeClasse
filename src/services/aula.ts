import {Injectable} from'@angular/core';
import {Headers, URLSearchParams,RequestOptions} from '@angular/http';
import {Aula} from '../dto/aula';
import * as constants from '../config/constants';
import {BaseHttpService} from './base-http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AulaService {
	baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/mysql/_table/aula';
	constructor(private httpService: BaseHttpService) {

	};


	query (idCurso: number, params?:URLSearchParams): Observable<Aula[]> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);    	
		return this.httpService.http
			.get(this.baseResourceUrl+'?filter=id_curso='+idCurso, { search: params, headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let aulas: Array<Aula> = [];
				result.resource.forEach((aula) => {
					aulas.push(Aula.fromJson(aula));
				});
				return aulas;
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
        .delete(constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/mysql/_table/presenca_aluno?filter=id_aula='+id,{ headers: queryHeaders})
        .map((response) => {
        
          this.httpService.http
          .delete(this.baseResourceUrl + '/' + id,{ headers: queryHeaders})
          .map((response) => {
            
            var result: any = response.json();
            return result.id;
          }).subscribe((response) => {
          });
          
          var result: any = response.json();
          return result.id;
          
        });
	}

	patch (idCurso: number, aula: Aula) {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });
		
		return this.httpService.http.patch(constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/mysql/_table/aula', Aula.toJson(aula,idCurso,true),options)
			.map((data) => {
				return data;
		});
		
	}
	
	post(idCurso: number, aula: Aula){
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });
		return this.httpService.http.post(constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/mysql/_table/aula', Aula.toJsonSemId(aula,idCurso,true),options)
			.map((data) => {
				console.log('Passou aqui');
				return data;
		});
	}
}
