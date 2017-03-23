import { Component } from '@angular/core';
import { TweetService } from '../..//services/tweet-service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-battle',
  templateUrl: 'battle.html'
})
export class BattlePage {
  public twitterHandle:string;
  public awayTwitterHandle:string;
  public homeTwitterHandle:string;
  public results:any = [{},{},{}];

  public tweets:any = [{},{}];

  constructor(public navCtrl: NavController, public tweetService:TweetService) {
  }

  callService(){
    this.tweetService.getTweets().subscribe(response => {
      this.tweets = response.json();
    });
  }

  userPressedCancel(){
    this.twitterHandle = '';
  }

  keyHasBeenPressed(e){
      console.log(this.awayTwitterHandle)
		if(e.key === 'Enter'){
        this.callKarmaService();
      };
		}

  callKarmaService(){
    this.tweetService.getBattleResult(this.awayTwitterHandle, this.homeTwitterHandle).subscribe(response => {
      this.results = response.json();
    });
  }
}

