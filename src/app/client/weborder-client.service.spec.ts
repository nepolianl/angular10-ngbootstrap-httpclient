import { TestBed } from '@angular/core/testing';

import { WeborderClientService } from './weborder-client.service';

describe('WeborderClientService', () => {
  let service: WeborderClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeborderClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
