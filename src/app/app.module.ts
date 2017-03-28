import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BattlePage } from '../pages/battle/battle';
import { ExpertPage } from '../pages/expert/expert';
import { TweetService } from '../services/tweet-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BattlePage,
    ExpertPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BattlePage,
    ExpertPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, TweetService]
})
export class AppModule {}
