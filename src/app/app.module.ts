import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

import { MyApp } from './app.component';
import { CursosPage } from '../pages/cursos/cursos';
import { ProfessoresPage } from '../pages/professores/professores';
import { AlunosPage } from '../pages/alunos/alunos';

import { DetalheCursoPage } from '../pages/detalhe-curso/detalhe-curso';
import { DetalheAlunoPage } from '../pages/detalhe-aluno/detalhe-aluno';
import { DetalheProfessorPage } from '../pages/detalhe-professor/detalhe-professor';
import { AlunosDoCursoPage } from '../pages/alunos-do-curso/alunos-do-curso';

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
  AlunosDoCursoPage
  ],
  imports: [
    BrowserModule,
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
  AlunosDoCursoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	ImagePicker,
	Base64,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
