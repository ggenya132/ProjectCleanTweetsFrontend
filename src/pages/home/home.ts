import { Component } from '@angular/core';
import { TweetService } from '../..//services/tweet-service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public twitterHandle:string;

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
      console.log(this.twitterHandle)
		if(e.key === 'Enter'){
			this.tweetService.search(this.twitterHandle).subscribe(response => {
        this.tweets = response.json();
      });
        console.log(this.tweets);
		}
	}

}
