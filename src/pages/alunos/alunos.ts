import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Aluno } from '../../dto/aluno';
import { DetalheAlunoPage } from '../../pages/detalhe-aluno/detalhe-aluno';

@Component({
  selector: 'page-alunos',
  templateUrl: 'alunos.html'
})
export class AlunosPage {

	alunos: Array<Aluno>;
	callback :any;
  estaBuscandoAluno: boolean = false;
  
	constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
		
		this.alunos = new Array<Aluno>();
    
    this.estaBuscandoAluno = this.navParams.get('estaBuscandoAluno');
		this.callback = this.navParams.get("callback");
	}
	
	onClick(a: Aluno){
		
    if(this.estaBuscandoAluno){
      this.callback(a).then(()=>{
        
      });
      this.navCtrl.pop();
    } else {
		  this.navCtrl.push(DetalheAlunoPage, {callback: this.myCallbackFunction,
		                                       aluno: JSON.stringify(a)});
    }
	}
	adicionarAluno(){
		this.navCtrl.push(DetalheAlunoPage, {callback: this.myCallbackFunction} );
	}
	removerAluno(aluno: Aluno){
		for(var i = this.alunos.length - 1; i >= 0; i--) { 
		  
		  if(this.alunos[i].id == aluno.id){
			this.alunos.splice(i,1);
		  }
		}
	}
	
	myCallbackFunction = (aluno, estaAlterando, cancelou) => {
		return new Promise((resolve, reject) => {
			
			if(!cancelou){
				if(estaAlterando){
				  this.alterarAlunoDaLista(aluno);
				} else {
				  this.adicionarAlunoNaLista(aluno);
				}
			}
			
			resolve();
		});
	}
	
	adicionarAlunoNaLista(aluno: Aluno){
		let maxId: number =0;
		
		for(var i = 0; i < this.alunos.length; i++) { 

			if(this.alunos[i].id > maxId){
				maxId = this.alunos[i].id;
			}
		}
		
		aluno.id = maxId+1;
		this.alunos.push(aluno);
	}
	
	alterarAlunoDaLista(aluno: Aluno){
		for(var i = 0; i < this.alunos.length; i++) { 

			if(this.alunos[i].id == aluno.id){
				this.alunos[i] = aluno;
			}
		}
	}
}
