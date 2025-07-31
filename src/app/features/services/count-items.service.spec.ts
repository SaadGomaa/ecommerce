import { TestBed } from '@angular/core/testing';

import { CountItemsService } from '../../features/services/count-items.service';

describe('CountItemsService', () => {
  let service: CountItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
