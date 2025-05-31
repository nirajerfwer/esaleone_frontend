import { TestBed } from '@angular/core/testing';

import { CheckoutServiceTsService } from './checkout.service.ts.service';

describe('CheckoutServiceTsService', () => {
  let service: CheckoutServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
