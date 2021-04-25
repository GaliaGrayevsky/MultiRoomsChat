import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  @Input() error:string = "";

  display: boolean = false;

  constructor() { }

  ngOnChanges() {
    if (this.error && this.error.length > 0){
      this.display = true;
      setTimeout(() => { 
        this.toggleDisplay(); 
        this.error = "";
      }, 3000);
    }
  }

  toggleDisplay() {
    this.display = !this.display;
  }

}
