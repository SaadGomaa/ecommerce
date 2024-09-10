import { Component, WritableSignal, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent {
  private readonly _OrdersService = inject(OrdersService);
  private readonly _AuthService = inject(AuthService);

  idUser: string = '';
  AllOrdersList: any;

  ngOnInit(): void {
    this._AuthService.saveUserData();
    this.idUser = this._AuthService.userData.id;
    this._OrdersService.getUserOrders(this.idUser).subscribe({
      next: (res) => {
        this.AllOrdersList = res;
      },
    });
  }
}
