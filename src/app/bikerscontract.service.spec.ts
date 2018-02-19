import { TestBed, inject } from '@angular/core/testing';

import { BikerscontractService } from './bikerscontract.service';

describe('BikerscontractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BikerscontractService]
    });
  });

  it('should be created', inject([BikerscontractService], (service: BikerscontractService) => {
    expect(service).toBeTruthy();
  }));
});
