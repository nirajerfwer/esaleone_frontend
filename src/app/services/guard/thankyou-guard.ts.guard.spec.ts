import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { thankyouGuardTsGuard } from './thankyou-guard.ts.guard';

describe('thankyouGuardTsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => thankyouGuardTsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
