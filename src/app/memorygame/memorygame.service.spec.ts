import { TestBed } from '@angular/core/testing';

import { MemorygameService } from './memorygame.service';

describe('MemorygameService', () => {
  let service: MemorygameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemorygameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
