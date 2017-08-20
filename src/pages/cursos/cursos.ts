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
		this.cursos = [];
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
		  
		  if(this.cursos[i].nome == curso.nome){
			this.cursos.splice(i,1);
		  }
		}
	}
	
	myCallbackFunction = (curso, estaAlterando) => {
		return new Promise((resolve, reject) => {
			let c : Curso = curso;
			let e : boolean = estaAlterando;
			
			console.log(JSON.stringify(c));
			console.log(e);
			resolve();
		});
	}
}
