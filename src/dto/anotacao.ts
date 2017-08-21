import {Aluno} from './aluno';
export class Anotacao {
  id:              string;
  assunto:         string;
  texto:           string;
  aluno:           Aluno;
  desempenhoTurma: number;
  desempenhoAluno: number;
}