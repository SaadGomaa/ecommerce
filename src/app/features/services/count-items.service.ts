import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountItemsService {

  private cartItemCount: BehaviorSubject<number>;
  private wishItemCount: BehaviorSubject<number>;
  public currentCartItemCount;
  public currentWishItemCount;

  constructor() {
    const savedCount = localStorage.getItem('cartItemCount');
    const savedCountWish = localStorage.getItem('wishItemCount');

    this.cartItemCount = new BehaviorSubject<number>(savedCount ? +savedCount : 0);
    this.wishItemCount = new BehaviorSubject<number>(savedCountWish ? +savedCountWish : 0);

    this.currentCartItemCount = this.cartItemCount.asObservable();
    this.currentWishItemCount = this.wishItemCount.asObservable();
  }

  addItem() {
    const currentValue = this.cartItemCount.value;
    const newValue = currentValue + 1;
    this.cartItemCount.next(newValue);
    localStorage.setItem('cartItemCount', newValue.toString());
  }

  removeItem() {
    const currentValue = this.cartItemCount.value;
    if (currentValue > 0) {
      const newValue = currentValue - 1;
      this.cartItemCount.next(newValue);
      localStorage.setItem('cartItemCount', newValue.toString());
    }
  }

  resetCart() {
    this.cartItemCount.next(0);
    localStorage.setItem('cartItemCount', '0');
  }

  addItemWish() {
    const currentValue = this.wishItemCount.value;
    const newValue = currentValue + 1;
    this.wishItemCount.next(newValue);
    localStorage.setItem('WishItemCount', newValue.toString());
  }

  removeItemWish() {
    const currentValue = this.wishItemCount.value;
    if (currentValue > 0) {
      const newValue = currentValue - 1;
      this.wishItemCount.next(newValue);
      localStorage.setItem('wishItemCount', newValue.toString());
    }
  }

  
}
