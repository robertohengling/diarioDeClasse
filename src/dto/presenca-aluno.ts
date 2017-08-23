import {Aluno} from './aluno';
export class PresencaAluno {
  constructor (
      public id: number = null,
			public aluno:Aluno = new Aluno(),
			public indPresente:boolean = true
	) { }

	static fromJson (json:any) {
		if (!json) return;
    let indPresente: boolean=false;
    
    if(json.ind_presente == 'S'){
      indPresente = true;
    }
    
		return new PresencaAluno (
			parseInt(json.id),
			Aluno.fromJson(json.aluno_by_id_aluno),
			indPresente
		);
	}


	static toJson (presencaAluno: PresencaAluno, idAula: number, stringify?: boolean):any {
    let ind_presente :string = 'N';
    
    if(presencaAluno.indPresente){
      ind_presente = 'S';
    }
		var doc = {
			id: presencaAluno.id,
      id_aula: idAula,
			id_aluno: presencaAluno.aluno.id,
			ind_presente: ind_presente
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}
}