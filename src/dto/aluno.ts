export class Aluno {
  
  constructor (
			public id:number = null,
			public nome:string = '',
			public foto:string = ''
	) { }

	static fromJson (json:any) {
		if (!json) return;

		return new Aluno (
			parseInt(json.id),
			json.nome,
			json.foto
		);
	}


	static toJson (aluno: Aluno, stringify?: boolean):any {
		var doc = {
			id: aluno.id,
			nome: aluno.nome,
			foto: aluno.foto
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}
}