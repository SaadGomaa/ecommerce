import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { ICategories } from '../../core/interfaces/icategories';

@Component({
  selector: 'app-catdetials',
  standalone: true,
  imports: [],
  templateUrl: './catdetials.component.html',
  styleUrl: './catdetials.component.scss'
})
export class CatdetialsComponent implements OnInit {
  // Call Services
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  catDetails: ICategories[] = [];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idCategories = p.get('id');
        this._CategoriesService.getSpecificCategories(idCategories).subscribe({
          next: (res) => {
            this.catDetails = res.data;
          }
        })
      }
    })
  }

}
