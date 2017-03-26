import { Component } from '@angular/core';
import { TweetService } from '../../services/tweet-service';
import { NavController } from 'ionic-angular';
import { BattlePage } from '../battle/battle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public twitterHandle:string;
  public score:any = 0;

  public tweets:any = [{},{}];

  constructor(public navCtrl: NavController, public tweetService:TweetService) {
  }

  callService(){
    this.tweetService.getTweets().subscribe(response => {
      this.tweets = response.json();
    });
  }

  callServiceForScore(){
    this.tweetService.searchForScore(this.twitterHandle).subscribe(response => {
      this.score = response.text;
    });
  }


  userPressedCancel(){
    this.twitterHandle = '';
  }

  keyHasBeenPressed(e){
      console.log(this.twitterHandle)
		if(e.key === 'Enter'){
			this.tweetService.searchForScore(this.twitterHandle).subscribe(response => {
        this.score = response.json();
      });
		}
	}

  goToBattle(){
    this.navCtrl.push(BattlePage)
  }

}
