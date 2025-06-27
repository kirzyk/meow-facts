import { CatsService } from './cats.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('CatsService', () => {
  let service: CatsService;
  let httpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClient = { get: jest.fn() } as any;
    service = new CatsService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should return a cat fact with id and fact', (done) => {
    const mockFact = 'Cats sleep 70% of their lives.';
    httpClient.get.mockReturnValueOnce(of({ data: [mockFact] }));
    service.getFact().subscribe(result => {
      expect(result.id).toBeDefined();
      expect(result.fact).toBe(mockFact);
      done();
    });
  });
});