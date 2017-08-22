export class Professor {
  constructor (
			public id:number = null,
			public nome:string = '',
			public email:string = '',
			public foto:string = ''
	) { }

	static fromJson (json:any) {
		if (!json) return;

		return new Professor (
			parseInt(json.id),
			json.nome,
			json.email,
			json.foto
		);
	}


	static toJson (professor: Professor, stringify?: boolean):any {
		var doc = {
			id: professor.id,
			nome: professor.nome,
			email: professor.email,
			foto: professor.foto
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}
}