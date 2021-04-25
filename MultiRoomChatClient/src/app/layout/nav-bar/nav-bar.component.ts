import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{

  @Input() tabs: string[] = []; // test data
  @Input() selectedTab: number = 0;
  @Output() activeTab: EventEmitter<string> = new EventEmitter<string>();

  tabWidth: number = 10;

  constructor() { }

  ngOnChanges(){
    this.tabWidth = 90 / this.tabs.length;
  }

  ngOnInit() { //To Do remove
    this.tabWidth = 90 / this.tabs.length;
  }
  
  changeActiveTab(i: number){
    if (this.selectedTab != i) {
      this.selectedTab = i;
      this.activeTab.emit(this.tabs[i]);
    }
  }
}
