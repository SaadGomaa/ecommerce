import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CountItemsService } from '../../services/count-items.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  // Call Services
  private readonly _OrdersService = inject(OrdersService);
  private readonly _AuthService = inject(AuthService);
  private readonly _CountItemsService = inject(CountItemsService);

  // Variable to Store Data
  idUser: string = '';
  AllOrdersList: any;

  ngOnInit(): void {
    this._AuthService.saveUserData();
    this._CountItemsService.resetCart();
    this.idUser = this._AuthService.userData.id;
    this._OrdersService.getUserOrders(this.idUser).subscribe({
      next: (res) => {
        this.AllOrdersList = res;
      },
    });
  }
}
