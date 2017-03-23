import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BattlePage } from '../pages/battle/battle';
import { TweetService } from '../services/tweet-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BattlePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BattlePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, TweetService]
})
export class AppModule {}
