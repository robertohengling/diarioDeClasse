import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { CursosPage } from '../pages/cursos/cursos';
import { ProfessoresPage } from '../pages/professores/professores';
import { AlunosPage } from '../pages/alunos/alunos';

import { DetalheCursoPage } from '../pages/detalhe-curso/detalhe-curso';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CursosPage,
    ProfessoresPage,
    AlunosPage,
	DetalheCursoPage
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
	DetalheCursoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
