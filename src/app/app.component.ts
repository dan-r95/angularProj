import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [MatIconRegistry]
})
export class AppComponent {
  title = 'Adress Book';
//   constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
//         iconRegistry.addSvgIconSetInNamespace( "add", sanitizer.
//         bypassSecurityTrustResourceUrl("assets/svg/ic_add_black_24px.svg"));
//         iconRegistry.addSvgIconSetInNamespace( "delete", sanitizer.
//         bypassSecurityTrustResourceUrl("assets/svg/ic_delete_black_24px.svg"));
//         iconRegistry.addSvgIconSetInNamespace( "edit", sanitizer.
//         bypassSecurityTrustResourceUrl("assets/svg/ic_mode_edit_black_24px.svg"));
// }
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
}
