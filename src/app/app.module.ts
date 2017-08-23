import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { CursosPage } from '../pages/cursos/cursos';
import { ProfessoresPage } from '../pages/professores/professores';
import { AlunosPage } from '../pages/alunos/alunos';

import { DetalheCursoPage } from '../pages/detalhe-curso/detalhe-curso';
import { DetalheAlunoPage } from '../pages/detalhe-aluno/detalhe-aluno';
import { DetalheProfessorPage } from '../pages/detalhe-professor/detalhe-professor';
import { AlunosDoCursoPage } from '../pages/alunos-do-curso/alunos-do-curso';
import { AulasDoCursoPage } from '../pages/aulas-do-curso/aulas-do-curso';
import { DetalheAulaPage } from '../pages/detalhe-aula/detalhe-aula';
import { AnotacoesDaAulaPage } from '../pages/anotacoes-da-aula/anotacoes-da-aula';
import { DetalheAnotacaoPage } from '../pages/detalhe-anotacao/detalhe-anotacao';
import { ListaPresencaPage } from '../pages/lista-presenca/lista-presenca';

import { BaseHttpService } from '../services/base-http';
import {AlunosDoCursoService} from '../services/alunos-do-curso';
import {PresencaAlunoService} from '../services/presenca-aluno';
import {AulaService} from '../services/aula';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CursosPage,
    ProfessoresPage,
    AlunosPage,
	DetalheCursoPage,
	DetalheAlunoPage,
	DetalheProfessorPage,
	AlunosDoCursoPage,
  AulasDoCursoPage,
  DetalheAulaPage,
  AnotacoesDaAulaPage,
  DetalheAnotacaoPage,
  ListaPresencaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CursosPage,
    ProfessoresPage,
    AlunosPage,
	DetalheCursoPage,
	DetalheAlunoPage,
	DetalheProfessorPage,
	AlunosDoCursoPage,
  AulasDoCursoPage,
  DetalheAulaPage,
  AnotacoesDaAulaPage,
  DetalheAnotacaoPage,
  ListaPresencaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	ImagePicker,
	Base64,
	BaseHttpService,
  AlunosDoCursoService,
  PresencaAlunoService,
  AulaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
