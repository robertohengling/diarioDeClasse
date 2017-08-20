import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Professor } from '../../dto/professor';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

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
				private base64: Base64) {
		
		this.recebeParametros();

	}
	ionViewWillEnter() {


	}

	ionViewWillLeave() {
		this.callback(this.professor, this.estaAlterando, this.cancelou).then(()=>{
			
		});
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
		this.navCtrl.pop();
	}
	
	buscarFoto(){
		this.imagePicker.getPictures({maximumImagesCount: 1}).then((results) => {
			for (var i = 0; i < results.length; i++) {
				//Transformar em Base64
				this.professor.foto = results[i];
				
				
			}
		}, (err) => { });
	}
}
