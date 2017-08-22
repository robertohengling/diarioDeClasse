import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Curso } from '../../dto/curso';
import { Aluno } from '../../dto/aluno';
import { AlunosPage } from '../../pages/alunos/alunos';
import { AlunosDoCursoService } from '../../services/alunos-do-curso';

@Component({
  selector: 'page-alunos-do-curso',
  providers: [AlunosDoCursoService],
  templateUrl: 'alunos-do-curso.html'
})
export class AlunosDoCursoPage {

  curso: Curso;
	
	constructor(private alunosDoCursoService: AlunosDoCursoService,
	            public navCtrl: NavController, 
              public navParams: NavParams) {
  
		this.curso = JSON.parse(this.navParams.get('curso'));
    this.getList();
	}
	
	myCallbackFunction = (aluno) => {
		return new Promise((resolve, reject) => {
			
			this.adicionarAlunoNaLista(aluno);
			resolve();
		});
	}
	
  adicionarAluno(){
    this.navCtrl.push(AlunosPage, {callback: this.myCallbackFunction,
                                   estaBuscandoAluno: true} );
                                   
  }
  
	adicionarAlunoNaLista(aluno: Aluno){
		this.curso.alunos.push(aluno);
    this.adicionarAlunoEndpoint(aluno);
	}
  
  getList() {
        let self = this;
        self.alunosDoCursoService.query(this.curso.id)
            .subscribe((alunos: Aluno[]) => {
                self.curso.alunos = alunos
            });
    }
	removerAluno(aluno: Aluno) {
        var self = this;
        this.alunosDoCursoService.remove(this.curso.id, aluno.id)
            .subscribe(() => {
                self.curso.alunos = self.curso.alunos.filter((item) => {
                    return item.id != aluno.id
                });
            });
    }
	adicionarAlunoEndpoint(aluno: Aluno){	
		this.alunosDoCursoService.post(this.curso.id, aluno.id)
                .subscribe((response) => {
                });
	}
}
