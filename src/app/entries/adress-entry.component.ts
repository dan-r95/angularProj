import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { AdressManagementService } from '../adress.service';

@Component({
  selector: 'selector',
  templateUrl: 'adress-entry.component.html',
})
export class adressEntriesComponent implements OnInit {
  entries: Entry[];
  selectedEntry: Entry;
  searchBar: string;

  constructor(private adressService: AdressManagementService) {  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.adressService.getHeroes()
    .subscribe(entries => this.entries = entries.slice(1,5));
  }


  selectEntry(entry: Entry) { this.selectedEntry = entry; }
}
