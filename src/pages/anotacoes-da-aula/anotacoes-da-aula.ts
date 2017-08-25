import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BaseHttpService } from '../../services/base-http';

import { Anotacao } from '../../dto/anotacao';
import { Aula } from '../../dto/aula';
import { DetalheAnotacaoPage } from '../../pages/detalhe-anotacao/detalhe-anotacao';
import * as constants from '../../config/constants';
import { AnotacaoService } from '../../services/anotacao';

@Component({
  selector: 'page-anotacoes-da-aula',
  providers: [AnotacaoService, BaseHttpService],
  templateUrl: 'anotacoes-da-aula.html'
})
export class AnotacoesDaAulaPage {

  aula : Aula;
  
	anotacoes: Array<Anotacao>;
	constructor(private anotacaoService: AnotacaoService,
              private httpService: BaseHttpService, 
              public navCtrl: NavController,
              public navParams: NavParams) {

		this.anotacoes = new Array<Anotacao>();
		this.aula = <Aula> JSON.parse(this.navParams.get('aula'));
    
    
	}
  
	onClick(c: Anotacao){
		
		this.navCtrl.push(DetalheAnotacaoPage, {callback: this.myCallbackFunction,
		                                     anotacao: JSON.stringify(c)});
	}
	adicionarAnotacao(){
		this.navCtrl.push(DetalheAnotacaoPage, {callback: this.myCallbackFunction} );
	}
	
	myCallbackFunction = (anotacao: Anotacao, estaAlterando: boolean, cancelou: boolean) => {
		return new Promise((resolve, reject) => {
			
			if(!cancelou){
				if(estaAlterando){
				  this.alterarAnotacaoDaLista(anotacao);
				} else {
          this.adicionarAnotacaoEndpoint(anotacao);
				}
			}
			
			resolve();
		});
	}

	alterarAnotacaoDaLista(anotacao: Anotacao){
		for(var i = 0; i < this.anotacoes.length; i++) { 

			if(this.anotacoes[i].id == anotacao.id){
				this.anotacoes[i] = anotacao;
			}
		}
		this.alterarAnotacaoEndpoint(anotacao);
	}
    
	getList() {
        let self = this;
        self.anotacaoService.query(this.aula.id)
            .subscribe((anotacoes: Anotacao[]) => {
                self.anotacoes = anotacoes
            });
    }
    
	removerAnotacao(anotacao: Anotacao) {
        var self = this;
        this.anotacaoService.remove(String(anotacao.id))
            .subscribe(() => {
                self.anotacoes = self.anotacoes.filter((item) => {
                    return item.id != anotacao.id
                });
            });
    }
    
	adicionarAnotacaoEndpoint(anotacao: Anotacao){	
		this.anotacaoService.post(this.aula.id, anotacao)
                .subscribe((response) => {
                  this.getList();
                });
	}
	alterarAnotacaoEndpoint(anotacao: Anotacao){	
		this.anotacaoService.patch(this.aula.id, anotacao)
                .subscribe((response) => {
                });
	}
	
}
