import { Component } from '@angular/core';
import { TweetService } from '../..//services/tweet-service';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { OnInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})


export class AboutPage{



  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public alertCtrl:AlertController) {
  }

}
