import { Component, ChangeDetectorRef, OnInit, ViewChildren, OnDestroy, ViewChild } from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('snav', { static: false }) public snav: MatSidenav;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, fb: FormBuilder, private navigationService: SidenavService) {
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

  color = '#fff'

  opened: boolean;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  ngOnInit() {
  }

  public toggleSidenav() {
    this.navigationService
      .toggle()
      .then(() => { });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
