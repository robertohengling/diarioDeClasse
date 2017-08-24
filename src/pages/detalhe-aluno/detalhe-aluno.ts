import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Aluno } from '../../dto/aluno';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-detalhe-aluno',
  templateUrl: 'detalhe-aluno.html'
})
export class DetalheAlunoPage {
	
	titulo :string;
	estaAlterando     :boolean;
	cancelou		  :boolean = false;
	aluno  :Aluno;
	
	callback :any;
	 
	constructor(public navCtrl: NavController, 
                public navParams: NavParams,
				public imagePicker: ImagePicker,
				private sanitizer:DomSanitizer,
				private base64: Base64) {
		
		this.recebeParametros();

	}
	ionViewWillEnter() {


	}

	ionViewWillLeave() {
		
	}
	
	recebeParametros(){
		let c : string = this.navParams.get('aluno');
		
		if(c){
			this.aluno = JSON.parse(this.navParams.get('aluno'));
			this.titulo = this.aluno.nome;
			this.estaAlterando = true;
		  
		} else {
			this.titulo =  'Novo aluno...'
			this.estaAlterando = false;
			this.aluno = new Aluno();
		}
		this.callback = this.navParams.get("callback");
	}
	sanitize(url:string){
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}
	cancelar(){
		this.cancelou = true;
		this.callback(this.aluno, this.estaAlterando, this.cancelou).execute;
		this.navCtrl.pop();
	}
	salvar(){
		this.cancelou = false;
		this.callback(this.aluno, this.estaAlterando, this.cancelou).execute;
		this.navCtrl.pop();
		
	}
	buscarFoto(){
		this.imagePicker.getPictures({maximumImagesCount: 1}).then((results) => {
			for (var i = 0; i < results.length; i++) {
				//Transformar em Base64
				this.aluno.foto = results[i];
				
				
			}
		}, (err) => { });
	}
}
