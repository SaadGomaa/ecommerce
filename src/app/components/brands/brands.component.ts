import { ICategories } from './../../core/interfaces/icategories';
import { Component, OnInit, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService);

  brandsList: ICategories[] = [];

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      },
    });
  }
}
