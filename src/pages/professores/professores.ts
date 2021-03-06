import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Professor } from '../../dto/professor';
import { DetalheProfessorPage } from '../../pages/detalhe-professor/detalhe-professor';
import { ProfessorService } from '../../services/professor';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-professores',
  providers: [ProfessorService],
  templateUrl: 'professores.html'
})
export class ProfessoresPage {

	professores: Array<Professor>;
	callback :any;
  estaBuscandoProfessor: boolean = false;
	
	constructor(private professorService: ProfessorService,
				private sanitizer:DomSanitizer,
	            public navCtrl: NavController, 
              public navParams: NavParams) {
		
		this.professores = new Array<Professor>();
		this.getList();
		this.estaBuscandoProfessor = this.navParams.get('estaBuscandoProfessor');
		this.callback = this.navParams.get("callback");

	}
	
  	sanitize(url:string){
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}
	onClick(a: Professor){
		if(this.estaBuscandoProfessor){
      this.callback(a).then(()=>{
        
      });
      this.navCtrl.pop();
    } else {
		  this.navCtrl.push(DetalheProfessorPage, {callback: this.myCallbackFunction,
		                                           professor: JSON.stringify(a)});
    }

	}
	adicionarProfessor(){
		this.navCtrl.push(DetalheProfessorPage, {callback: this.myCallbackFunction} );
	} 
	
	myCallbackFunction = (professor, estaAlterando, cancelou) => {
		return new Promise((resolve, reject) => {
			
			if(!cancelou){
				if(estaAlterando){
				  this.alterarProfessorDaLista(professor);
				  this.alterarProfessorEndpoint(professor);
				} else {
				  this.adicionarProfessorEndpoint(professor);
				}
			}
			
			resolve();
		});
	}

	
	alterarProfessorDaLista(professor: Professor){
		for(var i = 0; i < this.professores.length; i++) { 

			if(this.professores[i].id == professor.id){
				this.professores[i] = professor;
			}
		}
	}
  
  
	getList() {
        let self = this;
        self.professorService.query()
            .subscribe((professores: Professor[]) => {
                self.professores = professores
            });
    }
	get() {
        let self = this;
        self.professorService.get("-1")
            .subscribe((professor: Professor) => {
                self.professores.push(professor);
            });
    }
	removerProfessor(professor: Professor) {
        var self = this;
        this.professorService.remove(String(professor.id))
            .subscribe(() => {
                self.professores = self.professores.filter((item) => {
                    return item.id != professor.id
                });
            });
    }
	adicionarProfessorEndpoint(professor: Professor){	
		this.professorService.post(professor)
                .subscribe((response) => {
                  this.getList();
                });
	}
	alterarProfessorEndpoint(professor: Professor){	
		this.professorService.patch(professor)
                .subscribe((response) => {
                });
	}
	
}
