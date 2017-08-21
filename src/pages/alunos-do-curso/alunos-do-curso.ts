import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Curso } from '../../dto/curso';
import { Aluno } from '../../dto/aluno';
import { AlunosPage } from '../../pages/alunos/alunos';

@Component({
  selector: 'page-alunos-do-curso',
  templateUrl: 'alunos-do-curso.html'
})
export class AlunosDoCursoPage {

  curso: Curso;
	
	constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  
		this.curso = JSON.parse(this.navParams.get('curso'));

	}
  
	removerAluno(aluno: Aluno){
		for(var i = this.curso.alunos.length - 1; i >= 0; i--) { 
		  
		  if(this.curso.alunos[i].id == aluno.id){
			this.curso.alunos.splice(i,1);
		  }
		}
	}
	
	myCallbackFunction = (aluno) => {
		return new Promise((resolve, reject) => {
			
			this.adicionarAlunoNaLista(aluno);
			console.log('Passou aqui');
			resolve();
		});
	}
	
  adicionarAluno(){
    this.navCtrl.push(AlunosPage, {callback: this.myCallbackFunction,
                                   estaBuscandoAluno: true} );
  }
  
	adicionarAlunoNaLista(aluno: Aluno){
		this.curso.alunos.push(aluno);
	}
}
