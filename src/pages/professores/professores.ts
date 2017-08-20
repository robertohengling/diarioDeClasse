import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Professor } from '../../dto/professor';
import { DetalheProfessorPage } from '../../pages/detalhe-professor/detalhe-professor';

@Component({
  selector: 'page-professores',
  templateUrl: 'professores.html'
})
export class ProfessoresPage {

	professores: Array<Professor>;
	
	constructor(public navCtrl: NavController) {
		
		this.professores = new Array<Professor>();

	}
	
	onClick(a: Professor){
		
		this.navCtrl.push(DetalheProfessorPage, {callback: this.myCallbackFunction,
		                                         professor: JSON.stringify(a)});
	}
	adicionarProfessor(){
		this.navCtrl.push(DetalheProfessorPage, {callback: this.myCallbackFunction} );
	}
	removerProfessor(professor: Professor){
		for(var i = this.professores.length - 1; i >= 0; i--) { 
		  
		  if(this.professores[i].id == professor.id){
			this.professores.splice(i,1);
		  }
		}
	}
	
	myCallbackFunction = (professor, estaAlterando, cancelou) => {
		return new Promise((resolve, reject) => {
			
			if(!cancelou){
				if(estaAlterando){
				  this.alterarProfessorDaLista(professor);
				} else {
				  this.adicionarProfessorNaLista(professor);
				}
			}
			
			resolve();
		});
	}
	
	adicionarProfessorNaLista(professor: Professor){
		let maxId: number =0;
		
		for(var i = 0; i < this.professores.length; i++) { 

			if(this.professores[i].id > maxId){
				maxId = this.professores[i].id;
			}
		}
		
		professor.id = maxId+1;
		this.professores.push(professor);
	}
	
	alterarProfessorDaLista(professor: Professor){
		for(var i = 0; i < this.professores.length; i++) { 

			if(this.professores[i].id == professor.id){
				this.professores[i] = professor;
			}
		}
	}
}
