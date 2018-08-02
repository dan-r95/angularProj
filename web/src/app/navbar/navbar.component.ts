import { Component, ChangeDetectorRef, OnInit, ViewChildren } from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, fb: FormBuilder) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit() {
  }
  @ViewChildren('#sidenav') sidenav: any;
  toggleNav(): void {
    console.log(this.sidenav);
    //this.sidenav.toggle();
  }
  options: FormGroup;


  opened: boolean;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
