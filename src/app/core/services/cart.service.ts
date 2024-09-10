import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Call Services
  constructor(private _HttpClient: HttpClient) {}

  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/cart`,
      {
        productId: id,
      }
    );
  }

  getProductsCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  deleteSpecificCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }

  updataProductQuantity(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/cart/${id}`,
      {
        count: newCount,
      }
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,{
      headers:{token:localStorage.getItem('userToken')!}
    })
  }
}
