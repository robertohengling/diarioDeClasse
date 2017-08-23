import {Injectable} from'@angular/core';
import {Headers, URLSearchParams,RequestOptions} from '@angular/http';
import {PresencaAluno} from '../dto/presenca-aluno';
import {Aluno} from '../dto/aluno';
import {Aula} from '../dto/aula';
import * as constants from '../config/constants';
import {BaseHttpService} from './base-http';
import {AlunosDoCursoService} from './alunos-do-curso';
import {AulaService} from './aula';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PresencaAlunoService {
	baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/mysql/_table/presenca_aluno';
	constructor(private httpService: BaseHttpService,
              private alunosDoCursoService: AlunosDoCursoService,
              private aulaService: AulaService)  {

	};


	query (idAula: number, params?:URLSearchParams): Observable<PresencaAluno[]> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);    	
		return this.httpService.http
			.get(this.baseResourceUrl+'?filter=id_aula='+idAula, { search: params, headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let presencasAlunos: Array<PresencaAluno> = [];
				result.resource.forEach((presencaAluno) => {
					presencasAlunos.push(PresencaAluno.fromJson(presencaAluno));
				});
				return presencasAlunos;
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
  
  patch (idAula: number, presencaAluno: PresencaAluno) {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });
		
		return this.httpService.http.patch(this.baseResourceUrl, PresencaAluno.toJson(presencaAluno,idAula,true),options)
			.map((data) => {
				return data;
		});
		
	}
	post(idAula: number, presencaAluno: PresencaAluno){
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });
      return this.httpService.http.post(this.baseResourceUrl, PresencaAluno.toJson(presencaAluno,idAula,true),options)
        .map((data) => {
          return data;
		});
	}
  
  postByAula(idCurso: number, idAula: number){
    this.alunosDoCursoService.query(idCurso)
    .subscribe((alunos: Aluno[]) => {
        for(let aluno of alunos){
          let presencaAluno = new PresencaAluno(parseInt(String(idAula)+String(aluno.id)),aluno,false);
          this.post(idAula, presencaAluno)
            .subscribe((response) => {
          });
        }
    });
  }
  
  postByAluno(idCurso: number, aluno: Aluno){
    this.aulaService.query(idCurso)
    .subscribe((aulas: Aula[]) => {
        for(let aula of aulas){
          let presencaAluno = new PresencaAluno(parseInt(String(aula.id)+String(aluno.id)),aluno,false);
          this.post(aula.id, presencaAluno)
            .subscribe((response) => {
          });
        }
    });
  }
}
