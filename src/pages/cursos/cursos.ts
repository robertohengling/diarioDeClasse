import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Headers,RequestOptions } from '@angular/http';

import { BaseHttpService } from '../../services/base-http';

import { Curso } from '../../dto/curso';
import { DetalheCursoPage } from '../../pages/detalhe-curso/detalhe-curso';
import * as constants from '../../config/constants';
import { CursoService } from '../../services/curso';

@Component({
  selector: 'page-cursos',
  providers: [CursoService, BaseHttpService],
  templateUrl: 'cursos.html'
})
export class CursosPage {

	cursos: Array<Curso>;
	constructor(private cursoService: CursoService,private httpService: BaseHttpService, public navCtrl: NavController) {

		this.cursos = new Array<Curso>();
		this.login();
	}
	
	  
	onClick(c: Curso){
		
		this.navCtrl.push(DetalheCursoPage, {callback: this.myCallbackFunction,
		                                     curso: JSON.stringify(c)});
	}
	adicionarCurso(){
		this.navCtrl.push(DetalheCursoPage, {callback: this.myCallbackFunction} );
	}
	
	myCallbackFunction = (curso: Curso, estaAlterando: boolean, cancelou: boolean) => {
		return new Promise((resolve, reject) => {
			
			if(!cancelou){
				if(estaAlterando){
				  this.alterarCursoDaLista(curso);
				} else {
				  this.adicionarCursoNaLista(curso);
				}
			}
			
			resolve();
		});
	}
	
	adicionarCursoNaLista(curso: Curso){
		let maxId: number =0;
		
		for(var i = 0; i < this.cursos.length; i++) { 

			if(this.cursos[i].id > maxId){
				maxId = this.cursos[i].id;
			}
		}
		
		curso.id = maxId+1;
		this.cursos.push(curso);
		this.adicionarCursoEndpoint(curso);
	}
	
	alterarCursoDaLista(curso: Curso){
		for(var i = 0; i < this.cursos.length; i++) { 

			if(this.cursos[i].id == curso.id){
				this.cursos[i] = curso;
			}
		}
		this.alterarCursoEndpoint(curso);
	}
    storeToken(data) {
        //this.httpService.http._defaultOptions.headers.set('X-Dreamfactory-Session-Token', data && data.session_token);
        localStorage.setItem('session_token', data.session_token);
    }
	login(){
		var queryHeaders = new Headers();
		queryHeaders.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: queryHeaders });
		this.httpService.http.post(constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/user/session', {email: 'aplicativo@teste.com',password: 123456},options).subscribe((data) => {
				this.storeToken(data.json());
				this.getList();
			}, (error) => {
        });
	}
	getList() {
        let self = this;
        self.cursoService.query()
            .subscribe((cursos: Curso[]) => {
                self.cursos = cursos
            });
    }
	get() {
        let self = this;
        self.cursoService.get("-1")
            .subscribe((curso: Curso) => {
                self.cursos.push(curso);
            });
    }
	removerCurso(curso: Curso) {
        var self = this;
        this.cursoService.remove(String(curso.id))
            .subscribe(() => {
                self.cursos = self.cursos.filter((item) => {
                    return item.id != curso.id
                });
            });
    }
	adicionarCursoEndpoint(curso: Curso){	
		this.cursoService.post(curso)
                .subscribe((response) => {
                });
	}
	alterarCursoEndpoint(curso: Curso){	
		this.cursoService.patch(curso)
                .subscribe((response) => {
                });
	}
	
}
