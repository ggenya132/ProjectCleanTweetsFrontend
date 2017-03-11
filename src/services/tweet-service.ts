import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TweetService{

    public tweetUrl:string = "http://localhost:8080/svc/v1/tweets/";

    constructor(public http:Http){
        this.http = http;
    }

    getTweets(){
        console.log("in the service")
        return this.http.get(this.tweetUrl);
    }

}