import { Component } from '@angular/core';
import { TweetService } from '../..//services/tweet-service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tweets:any = [{},{}];

  constructor(public navCtrl: NavController, public tweetService:TweetService) {
  }

  callService(){
    this.tweetService.getTweets().subscribe(response => {
      this.tweets = response.json();
    });
  }

}
