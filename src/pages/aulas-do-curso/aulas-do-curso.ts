import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BaseHttpService } from '../../services/base-http';

import { Aula } from '../../dto/aula';
import { Curso } from '../../dto/curso';
import { DetalheAulaPage } from '../../pages/detalhe-aula/detalhe-aula';
import * as constants from '../../config/constants';
import { AulaService } from '../../services/aula';
import { PresencaAlunoService } from '../../services/presenca-aluno';

@Component({
  selector: 'page-aulas-do-curso',
  providers: [AulaService, BaseHttpService, PresencaAlunoService],
  templateUrl: 'aulas-do-curso.html'
})
export class AulasDoCursoPage {

  curso : Curso;
  
	aulas: Array<Aula>;
	constructor(private aulaService: AulaService,
              private presencaAlunoService: PresencaAlunoService,
              private httpService: BaseHttpService, 
              public navCtrl: NavController,
              public navParams: NavParams) {

		this.aulas = new Array<Aula>();
		this.curso = <Curso> JSON.parse(this.navParams.get('curso'));
    
    this.getList();
	}
  
	onClick(c: Aula){
		
		this.navCtrl.push(DetalheAulaPage, {callback: this.myCallbackFunction,
		                                     aula: JSON.stringify(c)});
	}
	adicionarAula(){
		this.navCtrl.push(DetalheAulaPage, {callback: this.myCallbackFunction} );
	}
	
	myCallbackFunction = (aula: Aula, estaAlterando: boolean, cancelou: boolean) => {
		return new Promise((resolve, reject) => {
			
			if(!cancelou){
				if(estaAlterando){
				  this.alterarAulaDaLista(aula);
				} else {
				  this.adicionarAulaEndpoint(aula);
				}
			}
			
			resolve();
		});
	}

	formataData(data: Date): string{
		return data.toLocaleString();
	}

	alterarAulaDaLista(aula: Aula){
		for(var i = 0; i < this.aulas.length; i++) { 

			if(this.aulas[i].id == aula.id){
				this.aulas[i] = aula;
			}
		}
		this.alterarAulaEndpoint(aula);
	}
    
	getList() {
        let self = this;
        self.aulaService.query(this.curso.id)
            .subscribe((aulas: Aula[]) => {
                self.aulas = aulas
            });
    }
    
	removerAula(aula: Aula) {
        var self = this;
        this.aulaService.remove(String(aula.id)).subscribe((response) => {
                });;
        self.aulas = self.aulas.filter((item) => {
            return item.id != aula.id
        });
    }
    
	adicionarAulaEndpoint(aula: Aula){	
		this.aulaService.post(this.curso.id, aula)
                .subscribe((response) => {
                  this.getList();
                  console.log(response.json());
                  
                  this.presencaAlunoService.postByAula(this.curso.id, response.json().resource[0].id);
                });
                
	}
	alterarAulaEndpoint(aula: Aula){	
		this.aulaService.patch(this.curso.id, aula)
                .subscribe((response) => {
                });
	}
	
}
