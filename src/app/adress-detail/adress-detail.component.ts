import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Entry } from '../entry';
import { AdressManagementService } from '../adress.service';


@Component({
  selector: 'app-adress-detail',
  templateUrl: './adress-detail.component.html',
  styleUrls: ['./adress-detail.component.css']
})
export class AdressDetailComponent implements OnInit {
  entry: Entry;
  // @Input() entry: Entry;

  constructor( private route: ActivatedRoute,
    private adressService: AdressManagementService,
    private location: Location) { }

    ngOnInit(): void {
      this.getHero();
    }

    getHero(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.adressService.getHero(id)
      .subscribe(entry => this.entry = entry);
    }

    goBack(): void {
       this.location.back();
     }

     save(): void {
        this.adressService.updateHero(this.entry)
          .subscribe(() => this.goBack());
      }




  }
