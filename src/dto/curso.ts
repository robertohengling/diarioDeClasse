import {Aluno} from './aluno';
import {Aula} from './aula';

export class Curso {
  id:           number;
  nome:         string;
  descricao:    string;
  alunos:       Array<Aluno>;
  aulas:        Array<Aula>;
}