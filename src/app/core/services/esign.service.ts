import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { esignProcess, KPI } from '../models/esign.model';
import { MOCK_KPIS, MOCK_PROCESSES } from '../mocks/esign.mock';

@Injectable({
  providedIn: 'root'
})
export class esignService {
  constructor() {}

  getKPIs(): Observable<KPI> {
    return of(MOCK_KPIS);
  }

  getProcesses(): Observable<esignProcess[]> {
    return of(MOCK_PROCESSES);
  }

  getProcessById(id: string): Observable<esignProcess | undefined> {
    const process = MOCK_PROCESSES.find(p => p.id === id);
    return of(process);
  }
}
