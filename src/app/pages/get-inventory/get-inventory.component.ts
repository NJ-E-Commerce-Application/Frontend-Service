import { Component, OnInit, inject } from '@angular/core';
import { InventryService } from '../../services/inventory/inventry.service';
import { Inventory } from '../../model/inventry';

@Component({
  selector: 'app-inventory',
  templateUrl: './get-inventory.component.html',
  styleUrls: ['./get-inventory.component.css'],
})
export class GetInventoryComponent implements OnInit {
  private readonly inventoryService = inject(InventryService);
  inventory: Array<Inventory> = [];

  ngOnInit(): void {
    this.inventoryService.getInventry().subscribe(
      (items) => {
        this.inventory = items;
        console.log('Inventory:', this.inventory); // Debugging output
      },
      (error) => {
        console.error('Error fetching inventory:', error);
      }
    );
  }
  
}
