import {Aluno} from './aluno';
export class PresencaAluno {
  constructor (
      public id: number = null,
			public aluno:Aluno = null,
			public indPresente:string = 'S'
	) { }

	static fromJson (json:any) {
		if (!json) return;

		return new PresencaAluno (
			parseInt(json.id),
			Aluno.fromJson(json.aluno_by_id_aluno),
			json.ind_presente
		);
	}


	static toJson (presencaAluno: PresencaAluno, idAula: number, stringify?: boolean):any {
		var doc = {
			id: presencaAluno.id,
      id_aula: idAula,
			id_aluno: presencaAluno.aluno.id,
			ind_presente: presencaAluno.indPresente
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}
}