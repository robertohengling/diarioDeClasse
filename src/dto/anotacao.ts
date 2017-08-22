import {Aluno} from './aluno';
import {Professor} from './professor';
export class Anotacao {
  constructor (
      public id: number = null,
			public assunto:string = 'S',
			public texto:string = 'S',
			public professor:Professor = null,
			public aluno:Aluno = null,
			public desempenhoTurma:number = null,
			public desempenhoAluno:number = null
	) { }

	static fromJson (json:any) {
		if (!json) return;

		return new Anotacao (
			parseInt(json.id),
      json.assunto,
      json.texto,
      Professor.fromJson(json.professor_by_id_professor),
			Aluno.fromJson(json.aluno_by_id_aluno),
			parseInt(json.desempenhoTurma),
      parseInt(json.desempenhoAluno),
		);
	}


	static toJson (anotacao: Anotacao, idAula: number, stringify?: boolean):any {
		var doc = {
			id: anotacao.id,
      assunto: anotacao.assunto,
      texto: anotacao.texto,
      id_aula: idAula,
      id_professor: anotacao.professor.id,
      id_aluno: anotacao.aluno.id,
      desempenhoTurma: anotacao.desempenhoTurma,
      desempenhoAluno: anotacao.desempenhoAluno
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}
}