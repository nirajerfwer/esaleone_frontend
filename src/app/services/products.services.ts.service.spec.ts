import { TestBed } from '@angular/core/testing';

import { ProductsServicesTsService } from './products.services.ts.service';

describe('ProductsServicesTsService', () => {
  let service: ProductsServicesTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsServicesTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
