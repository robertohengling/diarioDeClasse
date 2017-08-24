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
    
		let alunosAux : Array<Aluno> = json.aluno_by_rel_aluno_curso;
		let alunos : Array<Aluno> = new Array<Aluno>();
		
		for(let a of alunosAux) {
		  alunos.push(Aluno.fromJson(a));
		}
		
		let aulasAux : Array<Aula> = json.aula_by_id_curso;
		let aulas  : Array<Aula> = new Array<Aula>();
		
		for(let au of aulasAux) {
		  aulas.push(Aula.fromJson(au));
		}
    
		return new Curso (
			parseInt(json.id),
			json.nome,
			json.descricao,
			alunos, //Implementar método que trata array!!!!!!
			aulas//JSON.parse(json.aula_by_id_curso)   //Implementar método que trata array!!!!!!
		);
	}


	static toJson (curso: Curso, stringify?: boolean):any {
		var doc = {
			id: String(curso.id),
			nome: curso.nome,
			descricao: curso.descricao
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}