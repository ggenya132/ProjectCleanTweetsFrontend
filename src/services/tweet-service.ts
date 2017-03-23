import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class TweetService{

    params: URLSearchParams
    public tweetUrl:string = "http://localhost:8080/svc/v1/tweets";

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
}