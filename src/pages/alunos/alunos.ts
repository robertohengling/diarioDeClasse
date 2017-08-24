import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Aluno } from '../../dto/aluno';
import { DetalheAlunoPage } from '../../pages/detalhe-aluno/detalhe-aluno';
import { AlunoService } from '../../services/aluno';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-alunos',
  providers: [AlunoService],
  templateUrl: 'alunos.html'
})
export class AlunosPage {

	alunos: Array<Aluno>;
	callback :any;
  estaBuscandoAluno: boolean = false;
  
	constructor(private alunoService: AlunoService,
	            public navCtrl: NavController, 
				private sanitizer:DomSanitizer,
                public navParams: NavParams) {
		
		this.alunos = new Array<Aluno>();
		this.getList();
		this.estaBuscandoAluno = this.navParams.get('estaBuscandoAluno');
		this.callback = this.navParams.get("callback");
	}
	
	onClick(a: Aluno){
		
    if(this.estaBuscandoAluno){
      this.callback(a).then(()=>{
        
      });
      this.navCtrl.pop();
    } else {
		  this.navCtrl.push(DetalheAlunoPage, {callback: this.myCallbackFunction,
		                                       aluno: JSON.stringify(a)});
    }
	}
	adicionarAluno(){
		this.navCtrl.push(DetalheAlunoPage, {callback: this.myCallbackFunction} );
	}
	sanitize(url:string){
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}
	myCallbackFunction = (aluno, estaAlterando, cancelou) => {
		return new Promise((resolve, reject) => {
			
			if(!cancelou){
				if(estaAlterando){
				  this.alterarAlunoDaLista(aluno);
				  this.alterarAlunoEndpoint(aluno);
				} else {
				  this.adicionarAlunoNaLista(aluno);
				  this.adicionarAlunoEndpoint(aluno);
				}
			}
			
			resolve();
		});
	}
	
	adicionarAlunoNaLista(aluno: Aluno){
		let maxId: number =0;
		
		for(var i = 0; i < this.alunos.length; i++) { 

			if(this.alunos[i].id > maxId){
				maxId = this.alunos[i].id;
			}
		}
		
		aluno.id = maxId+1;
		this.alunos.push(aluno);
	}
	
	alterarAlunoDaLista(aluno: Aluno){
		for(var i = 0; i < this.alunos.length; i++) { 

			if(this.alunos[i].id == aluno.id){
				this.alunos[i] = aluno;
			}
		}
	}
	
	getList() {
        let self = this;
        self.alunoService.query()
            .subscribe((alunos: Aluno[]) => {
                self.alunos = alunos
            });
    }
	get() {
        let self = this;
        self.alunoService.get("-1")
            .subscribe((aluno: Aluno) => {
                self.alunos.push(aluno);
            });
    }
	removerAluno(aluno: Aluno) {
        var self = this;
        this.alunoService.remove(String(aluno.id))
            .subscribe(() => {
                self.alunos = self.alunos.filter((item) => {
                    return item.id != aluno.id
                });
            });
    }
	adicionarAlunoEndpoint(aluno: Aluno){	
		this.alunoService.post(aluno)
                .subscribe((response) => {
                });
	}
	alterarAlunoEndpoint(aluno: Aluno){	
		this.alunoService.patch(aluno)
                .subscribe((response) => {
                });
	}
	
}
