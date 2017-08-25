import {Aluno} from './aluno';
import {Aula} from './aula';

export class Curso {
  	constructor (
			public id:number = null,
			public nome:string = '',
			public descricao:string = '',
			public alunos:Array<Aluno> = new Array<Aluno>(),
			public aulas:Array<Aula> = new Array<Aula>()
	) { }

	static fromJson (json:any) {

		return new Curso (
			parseInt(json.id),
			json.nome,
			json.descricao,
			new Array<Aluno>(), //Implementar método que trata array!!!!!!
			new Array<Aula>()//JSON.parse(json.aula_by_id_curso)   //Implementar método que trata array!!!!!!
		);
	}


	static toJson (curso: Curso, stringify?: boolean):any {
		var doc = {
			id: curso.id,
			nome: curso.nome,
			descricao: curso.descricao
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}
   static toJsonSemId (curso: Curso, stringify?: boolean):any {
		var doc = {
			nome: curso.nome,
			descricao: curso.descricao
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}