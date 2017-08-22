import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Curso } from '../../dto/curso';
import { AlunosDoCursoPage } from '../../pages/alunos-do-curso/alunos-do-curso';

@Component({
  selector: 'page-detalhe-curso',
  templateUrl: 'detalhe-curso.html'
})
export class DetalheCursoPage {
	
	titulo :string;
	estaAlterando     :boolean;
	cancelou		  :boolean = false;
	curso  :Curso;
	
	callback :any;
	 
	constructor(public navCtrl: NavController, 
                public navParams: NavParams ) {
		
		this.recebeParametros();
    console.log(JSON.stringify(this.curso));
	}
	ionViewWillEnter() {


	}

	ionViewWillLeave() {
		this.callback(this.curso, this.estaAlterando, this.cancelou).execute;
	}
	
	recebeParametros(){
		let c : string = this.navParams.get('curso');
		
		if(c){
			this.curso = <Curso> JSON.parse(c);
			this.titulo = this.curso.nome;
			this.estaAlterando = true;
		  
		} else {
			this.titulo =  'Novo curso...'
			this.estaAlterando = false;
			this.curso = new Curso();
		}
		this.callback = this.navParams.get("callback");
	}
	
	cancelar(){
		this.cancelou = true;
		this.navCtrl.pop();
	}
  
    onClickAlunosDoCurso(){
		
		this.navCtrl.push(AlunosDoCursoPage, {curso: JSON.stringify(this.curso)});
	}
}
