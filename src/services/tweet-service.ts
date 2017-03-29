import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class TweetService{

    params: URLSearchParams
    public tweetUrl:string = "http://localhost:8080/svc/v1/tweets";
    // public tweetUrl:string = " https://project-clean-tweets.herokuapp.com/svc/v1/tweets";


    constructor(public http:Http){
        this.http = http;
    }

    getTweets(){
        return this.http.get(this.tweetUrl+"/realDonaldTrump");
    }

    search(twitterHandle){//returns a json list of tweets
        return this.http.get(this.tweetUrl+"/"+twitterHandle);
    }

    searchForScore(twitterHandle){//returns just an int
        return this.http.get(this.tweetUrl+"/"+twitterHandle+"/score");
    }

    getBattleResult(awayTwitterHandle, homeTwitterHandle){
        return this.http.get(this.tweetUrl+"/"+awayTwitterHandle+"/"+homeTwitterHandle+"/100/score");
    }

    getExpertResult(twitterHandle) {
      return this.http.get(this.tweetUrl+"/"+twitterHandle+"/score/detail");
    }

}
