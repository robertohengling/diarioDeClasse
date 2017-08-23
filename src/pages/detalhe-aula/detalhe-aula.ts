import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Aula } from '../../dto/aula';
import { ProfessoresPage } from '../../pages/professores/professores';
import { AnotacoesDaAulaPage } from '../../pages/anotacoes-da-aula/anotacoes-da-aula';
import { ListaPresencaPage } from '../../pages/lista-presenca/lista-presenca';

@Component({
  selector: 'page-detalhe-aula',
  templateUrl: 'detalhe-aula.html'
})
export class DetalheAulaPage {
	
	titulo :string;
	estaAlterando     :boolean;
	cancelou		  :boolean = false;
	aula  :Aula;
	
	callback :any;
	 
	constructor(public navCtrl: NavController, 
              public navParams: NavParams ) {
		
		this.recebeParametros();
	}
  
  myCallbackFunctionProfessor = (professor) => {
		return new Promise((resolve, reject) => {
			
			this.aula.professor = professor;
		});
	}
  myCallbackFunctionProfessorBackup = (professor) => {
		return new Promise((resolve, reject) => {
			
			this.aula.professorBackup = professor;
		});
	}
		
	cancelar(){
		this.cancelou = true;
		this.callback(this.aula, this.estaAlterando, this.cancelou).execute;
		this.navCtrl.pop();
	}
	salvar(){
		this.cancelou = false;
		this.callback(this.aula, this.estaAlterando, this.cancelou).execute;
		this.navCtrl.pop();
		
	}
	recebeParametros(){
		let c : string = this.navParams.get('aula');
		
		if(c){
			this.aula = <Aula> JSON.parse(c);
			this.titulo = this.aula.dataHora.toLocaleString();
			this.estaAlterando = true;
		  
		} else {
			this.titulo =  'Novo aula...'
			this.estaAlterando = false;
			this.aula = new Aula();
		}
		this.callback = this.navParams.get("callback");
	}
	
  onClickProfessor(){
      this.navCtrl.push(ProfessoresPage, {callback: this.myCallbackFunctionProfessor,
                                          estaBuscandoProfessor: true} );
  }
  
  onClickProfessorBackup(){
      this.navCtrl.push(ProfessoresPage, {callback: this.myCallbackFunctionProfessorBackup,
                                          estaBuscandoProfessor: true} );
  }
  
  onClickAnotacoesDaAula(){
		
		this.navCtrl.push(AnotacoesDaAulaPage, {aula: JSON.stringify(this.aula)});
	}  
  
  onClickPresencaDaAula(){
		
		this.navCtrl.push(ListaPresencaPage, {aula: JSON.stringify(this.aula)});
	}
}
