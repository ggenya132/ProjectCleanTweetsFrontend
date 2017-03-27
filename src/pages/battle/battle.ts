import { Component } from '@angular/core';
import { TweetService } from '../..//services/tweet-service';
import { NavController } from 'ionic-angular';
import { OnInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'page-battle',
  templateUrl: 'battle.html',
  // encapsulation: ViewEncapsulation.None
})


export class BattlePage implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  // private data:any = [[0,0],[,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
  // private newData:any = [[1,100],[2,0],[3,42],[4,50],[5,142],[6,50],[7,0],[8,100]];
  private data:any = [[1,0],[2,0],[3,0],[4,0]];
  // private newData:any = [[1,100],[2,0],[3,42],[4,50],[5,142],[6,50],[7,0],[8,100]];
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any = null;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  public twitterHandle:string;
  public awayTwitterHandle:string = "";
  public homeTwitterHandle:string = "";
  public showWinnerTitle:boolean = false;
  public results:any = [{},{},{},{}];
  private newData:any = [[1,0],[2,3],[3,3],[4,4]];
  public tweets:any = [{},{}];
  // public results:any;
  // public tweets:any;


  constructor(public navCtrl: NavController, public tweetService:TweetService) {
  }

  callService(){
    this.tweetService.getTweets().subscribe(response => {
      this.tweets = response.json();
    });
  }

  // keyHasBeenPressed(e){
  //     console.log(this.awayTwitterHandle)
	// 	if(e.key === 'Enter'){
  //       // this.callKarmaService();
  //
  //
  //     };
	// 	}

  callKarmaService(){
    this.tweetService.getBattleResult(this.awayTwitterHandle, this.homeTwitterHandle).subscribe(response => {
      this.results = response.json();
      console.log(this.results);
      this.newData = [[1,0],[2,this.results[2]],[3,this.results[3]], [4,100]];
      this.showWinnerTitle = true;
      if(this.chart == null) {
      this.createChart();
      this.updateChart();
    } else
    this.newData = [[1,0],[2,0],[3,0], [4,0]];
    this.updateChart();

    this.newData = [[1,0],[2,this.results[2]],[3,this.results[3]], [4,100]];
    setTimeout(this.updateChart(),5000);
    });
  }
  ngOnInit() {
    this.createChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    let xDomain = this.data.map(d => d[0]);
    let yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart() {
    // update scales & axis
    this.xScale.domain(this.newData.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.newData, d => d[1])]);
    this.colors.domain([0, this.newData.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll('.bar')
      .data(this.newData);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', (d, i) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors(i))
      .transition()
      .delay((d, i) => i * 300)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
  }
}
