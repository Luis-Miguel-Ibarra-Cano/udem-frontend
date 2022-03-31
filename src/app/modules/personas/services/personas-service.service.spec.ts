import { TestBed } from '@angular/core/testing';

import { PersonasServiceService } from './personas-service.service';

describe('PersonasServiceService', () => {
  let service: PersonasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
