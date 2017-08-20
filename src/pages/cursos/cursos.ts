import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Curso } from '../../dto/curso';
import { DetalheCursoPage } from '../../pages/detalhe-curso/detalhe-curso';

@Component({
  selector: 'page-cursos',
  templateUrl: 'cursos.html'
})
export class CursosPage {

	cursos: Array<Curso>;
	
	constructor(public navCtrl: NavController) {
		let curso = {
		              id:           1,
		              nome:         'Nome Teste',
                      descricao:     'Descricao Teste',
                      alunos:       new Array(),
                      aulas:        new Array()
					};
		this.cursos = new Array<Curso>();
		this.cursos.push(curso);
	}
	
	  
	onClick(c: Curso){
		
		this.navCtrl.push(DetalheCursoPage, {callback: this.myCallbackFunction,
		                                     curso: JSON.stringify(c)});
	}
	adicionarCurso(){
		this.navCtrl.push(DetalheCursoPage, {callback: this.myCallbackFunction} );
	}
	removerCurso(curso: Curso){
		for(var i = this.cursos.length - 1; i >= 0; i--) { 
		  
		  if(this.cursos[i].id == curso.id){
			this.cursos.splice(i,1);
		  }
		}
	}
	
	myCallbackFunction = (curso, estaAlterando, cancelou) => {
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
	}
	
	alterarCursoDaLista(curso: Curso){
		for(var i = 0; i < this.cursos.length; i++) { 

			if(this.cursos[i].id == curso.id){
				this.cursos[i] = curso;
			}
		}
	}
}
