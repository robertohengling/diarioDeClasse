import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Anotacao } from '../../dto/anotacao';
import { ProfessoresPage } from '../../pages/professores/professores';
import { AlunosPage } from '../../pages/alunos/alunos';

@Component({
  selector: 'page-detalhe-anotacao',
  templateUrl: 'detalhe-anotacao.html'
})
export class DetalheAnotacaoPage {
	
	titulo :string;
	estaAlterando     :boolean;
	cancelou		  :boolean = false;
	anotacao  :Anotacao;
	
	callback :any;
	 
	constructor(public navCtrl: NavController, 
              public navParams: NavParams ) {
		
		this.recebeParametros();
	}
  
  myCallbackFunctionProfessor = (professor) => {
		return new Promise((resolve, reject) => {
			
			this.anotacao.professor = professor;
		});
	}
  
  myCallbackFunctionAluno = (aluno) => {
		return new Promise((resolve, reject) => {
			
			this.anotacao.aluno = aluno;
		});
	}
	cancelar(){
		this.cancelou = true;
		this.callback(this.anotacao, this.estaAlterando, this.cancelou).execute;
		this.navCtrl.pop();
	}
	salvar(){
		this.cancelou = false;
		this.callback(this.anotacao, this.estaAlterando, this.cancelou).execute;
		this.navCtrl.pop();
		
	}
	recebeParametros(){
		let c : string = this.navParams.get('anotacao');
		
		if(c){
			this.anotacao = <Anotacao> JSON.parse(c);
			this.titulo = this.anotacao.assunto;
			this.estaAlterando = true;
		  
		} else {
			this.titulo =  'Nova anotacao...'
			this.estaAlterando = false;
			this.anotacao = new Anotacao();
		}
		this.callback = this.navParams.get("callback");
	}
	
  onClickProfessor(){
      this.navCtrl.push(ProfessoresPage, {callback: this.myCallbackFunctionProfessor,
                                          estaBuscandoProfessor: true} );
  }
  onClickAluno(){
      this.navCtrl.push(AlunosPage, {callback: this.myCallbackFunctionAluno,
                                          estaBuscandoAluno: true} );
  }
}
