import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() titleCard: any;
  @Input() contentList: any;
  @Input() headerList: any;
  @Input() varContentList: any;
  @Input() tableCount?: boolean;
  @Input() headerTableCount?: any;

  constructor() { }

  ngOnInit() { }

}
