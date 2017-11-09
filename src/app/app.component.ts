import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Adress Book';

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
}
