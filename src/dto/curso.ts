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
		if (!json) return;

		return new Curso (
			parseInt(json.id),
			json.nome,
			json.descricao,
			new Array<Aluno>(),
			new Array<Aula>()
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

}