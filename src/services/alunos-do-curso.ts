import {Injectable} from'@angular/core';
import {Headers, URLSearchParams,RequestOptions} from '@angular/http';
import {Aluno} from '../dto/aluno';
import * as constants from '../config/constants';
import {BaseHttpService} from './base-http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {PresencaAlunoService} from './presenca-aluno';


@Injectable()
export class AlunosDoCursoService {
	baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/mysql/_table/rel_aluno_curso';
	constructor(private httpService: BaseHttpService,
              private presencaAlunoService : PresencaAlunoService) {

	};


	query (idCurso: number, params?:URLSearchParams): Observable<Aluno[]> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);    	
		return this.httpService.http
			.get(this.baseResourceUrl+'?filter=id_curso='+idCurso, { search: params, headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let alunos: Array<Aluno> = [];
				result.resource.forEach((relAlunoCurso) => {
					alunos.push(Aluno.fromJson(relAlunoCurso.aluno_by_id_aluno));
				});
				return alunos;
			}).catch(this.handleError);
	};
	private handleError (error: any) {
	   let errMsg = (error.message) ? error.message :
	   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	   console.log(errMsg); // log to console instead
	   localStorage.setItem('session_token', '');       
	  return Observable.throw(errMsg);
	}


	remove (idCurso: number, idAluno: number) {
		
    var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.delete(this.baseResourceUrl+'?filter=(id_curso='+idCurso + ')AND(id_aluno='+idAluno+')',{ headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				return result.id;
			});
	}

	post(idCurso:number, idAluno: number){
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });
		return this.httpService.http.post(this.baseResourceUrl, JSON.stringify({ resource: [{id_curso: idCurso, id_aluno: idAluno}] }),options)
			.map((data) => {
				return data;
		});
	}
}
