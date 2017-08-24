import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Professor } from '../../dto/professor';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'page-detalhe-professor',
  templateUrl: 'detalhe-professor.html'
})
export class DetalheProfessorPage {
	
	titulo :string;
	estaAlterando     :boolean;
	cancelou		  :boolean = false;
	professor  :Professor;
	
	callback :any;
	 
	constructor(public navCtrl: NavController, 
                public navParams: NavParams,
				public imagePicker: ImagePicker,
				private sanitizer:DomSanitizer,
				private base64: Base64) {
		
		this.recebeParametros();

	}
	
	recebeParametros(){
		let c : string = this.navParams.get('professor');
		
		if(c){
			this.professor = JSON.parse(this.navParams.get('professor'));
			this.titulo = this.professor.nome;
			this.estaAlterando = true;
		  
		} else {
			this.titulo =  'Novo professor...'
			this.estaAlterando = false;
			this.professor = new Professor();
		}
		this.callback = this.navParams.get("callback");
	}
	
	cancelar(){
		this.cancelou = true;
		this.callback(this.professor, this.estaAlterando, this.cancelou).execute;
		this.navCtrl.pop();
	}
	salvar(){
		this.cancelou = false;
		this.callback(this.professor, this.estaAlterando, this.cancelou).execute;
		this.navCtrl.pop();
		
	}
	sanitize(url:string){
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}
	buscarFoto(){
		 let options = {
			maximumImagesCount: 1,
			width: 300,
			height: 300,
			quality : 75
		  };

		this.imagePicker.getPictures(options).then((results) => {
			this.base64.encodeFile(results[0]).then((base64File: string) => {
			  console.log(base64File);
			  
			  this.professor.foto = base64File;
			}, (err) => {
			  console.log(err);
			});
		}, (err) => { console.log(err);});
	}
}
