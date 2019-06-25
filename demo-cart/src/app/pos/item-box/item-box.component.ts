import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.css']
})
export class ItemBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input('product') product;

}
