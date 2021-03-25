import { TestBed } from '@angular/core/testing';

import { WeborderService } from './weborder.service';

describe('WeborderService', () => {
  let service: WeborderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeborderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
