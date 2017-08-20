import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Curso } from '../../dto/curso';

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

	}
	ionViewWillEnter() {


	}

	ionViewWillLeave() {
		this.callback(this.curso, this.estaAlterando, this.cancelou).then(()=>{
			
		});
	}
	
	recebeParametros(){
		let c : string = this.navParams.get('curso');
		
		if(c){
			this.curso = JSON.parse(this.navParams.get('curso'));
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
}
