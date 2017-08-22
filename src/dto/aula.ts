import {Professor} from './professor';
import {PresencaAluno} from './presenca_aluno';
import {Anotacao} from './anotacao';
export class Aula {
  constructor (
      public id: number = null,
			public professor:Professor = new Professor(),
			public professorBackup:Professor = new Professor(),
			public dataHora:Date = new Date(),
			public listaPresenca:Array<PresencaAluno> = new Array<PresencaAluno>(),
			public listaAnotacoes: Array<Anotacao> = new Array<Anotacao>()
	) { }

	static fromJson (json:any) {
		if (!json) return;
    
    let presencasAlunoAux : Array<PresencaAluno> = json.presenca_aluno_by_id_aula;
    let presencasAluno : Array<PresencaAluno> = new Array<PresencaAluno>();
  
    for(let pa of presencasAlunoAux) {
      presencasAluno.push(PresencaAluno.fromJson(pa));
    }
    
    let anotacoesAux : Array<Anotacao> = json.anotacao_by_id_aula;
    let anotacoes : Array<Anotacao> = Array<Anotacao>();
    
    for(let a of anotacoesAux) {
      anotacoes.push(Anotacao.fromJson(a));
    }
    
		return new Aula (
			parseInt(json.id),
      Professor.fromJson(json.professor_by_id_professor),
      Professor.fromJson(json.professor_by_id_professor_backup),
      new Date(json.dataHora),
      presencasAluno,//JSON.parse(json.presenca_aluno_by_id_aula),//PresencaAluno.fromJson(json.presenca_aluno_by_id_aula),  Implementar método que trada array!!!!!!
      anotacoes//JSON.parse(json.anotacao_by_id_aula)//Anotacao.fromJson(json.anotacao_by_id_aula) Implementar método que trada array!!!!!!
		);
	}


	static toJson (aula: Aula, idCurso: number, stringify?: boolean):any {
		var doc = {
			id: aula.id,
      id_curso: idCurso,
      id_professor: aula.professor.id,
      id_professor_backup: aula.professorBackup.id,
      dataHora: aula.dataHora
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}
}