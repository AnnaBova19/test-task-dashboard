import { TestBed } from '@angular/core/testing';

import { UserAssessmentsService } from './user-assessments.service';

describe('UserAssessmentsService', () => {
  let service: UserAssessmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAssessmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
