import { TestBed } from '@angular/core/testing';

import { PathInterceptorService } from './path-interceptor.service';

describe('PathInterceptorService', () => {
  let service: PathInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
