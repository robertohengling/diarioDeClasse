import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PresencaAluno } from '../../dto/presenca-aluno';
import { Aula } from '../../dto/aula';
import {PresencaAlunoService} from '../../services/presenca-aluno';

@Component({
  selector: 'page-lista-presenca',
  templateUrl: 'lista-presenca.html'
})
export class ListaPresencaPage {
	
	titulo :string= 'Lista de Presença';
  aula   : Aula;
	presencasAlunos: Array<PresencaAluno>;
	
	 
	constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public presencaAlunoService: PresencaAlunoService) {
		
		this.aula = JSON.parse(this.navParams.get('aula'));
    this.getList();

	}
  
	getList() {
        let self = this;
        self.presencaAlunoService.query(this.aula.id)
            .subscribe((presencasAlunos: PresencaAluno[]) => {
                self.presencasAlunos = presencasAlunos
            });
  }
  
	cancelar(){
		this.navCtrl.pop();
	}
  
	salvar(){
    for(let presencaAluno of this.presencasAlunos){
      this.presencaAlunoService.patch(this.aula.id, presencaAluno)
            .subscribe((response) => {
            });
    }
		this.navCtrl.pop();
		
	}
}
