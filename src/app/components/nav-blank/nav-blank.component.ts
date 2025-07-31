import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CountItemsService } from '../../features/services/count-items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit, OnDestroy {
  // Call Services
  readonly _AuthService = inject(AuthService);
  readonly _CountItemsService = inject(CountItemsService);

  // Variable to Store Data
  cartItemCount: number = 0;
  wishItemCount: number = 0;

  // Create Variable to UnSubscribe
  cartItemSub!: Subscription;

  ngOnInit() {
    this.cartItemSub = this._CountItemsService.currentCartItemCount.subscribe(
      (count) => (this.cartItemCount = count)
    );
    this._CountItemsService.currentWishItemCount.subscribe(
      (count) => (this.wishItemCount = count)
    );
  }

  ngOnDestroy(): void {
    this.cartItemSub?.unsubscribe();
  }
}
