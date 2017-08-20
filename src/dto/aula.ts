import {Professor} from './professor';
import {PresencaAluno} from './presenca_aluno';
import {Anotacao} from './anotacao';
export class Aula {
  professor:         Professor;
  professorBackup:   Professor;
  dataHora:          Date;
  listaPresenca:     Array<PresencaAluno>;
  listaAnotacoes:    Array<Anotacao>;
}