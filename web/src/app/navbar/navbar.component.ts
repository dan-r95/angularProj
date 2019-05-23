import { Component, ChangeDetectorRef, OnInit, ViewChildren, OnDestroy } from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

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
  @ViewChildren('#sidenav') sidenav: any;
  options: FormGroup;


  opened: boolean;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  ngOnInit() {
  }
  toggleNav(): void {
    console.log(this.sidenav);
    // this.sidenav.toggle();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
