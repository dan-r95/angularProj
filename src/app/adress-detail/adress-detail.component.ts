import { Component, OnInit, Inject } from '@angular/core';
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

  constructor(private route: ActivatedRoute,
    private adressService: AdressManagementService,
    private location: Location) { }

  ngOnInit(): void {
    this.getEntry();
  }

  getEntry(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.adressService.getEntry(id)
      .subscribe(entry => this.entry = entry);
    console.log(this.entry)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.adressService.updateEntry(this.entry)
      .subscribe(() => this.goBack());
  }

editEntry(entry: Entry):void{

}

deleteEntry(entry: Entry):void{

}
//call other component better

//   deleteEntry(entry: Entry): void {
//     this.entries = this.entries.filter(h => h !== entry);
//     this.adressService.deleteHero(entry).subscribe();   //callback is subscribe
//   }
//
//   editEntry(entry: Entry): void {
//     let dialogRef = this.dialog.open(DialogComponent, {
//       width: '250px',
//       data: { entry: entry }
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.adressService.updateHero(result).subscribe(result =>  console.log('edit result')
// // this.snackbar.openSnackBar("Eintrag aktualisiert")
// )
//
//       }
//     });
//   }
//
//   openConfirmDialog(entry: Entry): void {
//     let dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       width: '250px'
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.deleteEntry(entry);
//         this.openSnackBar("Eintrag entfernt");
//
//       }
//       console.log('The dialog was closed');
//     });
//   }





}
