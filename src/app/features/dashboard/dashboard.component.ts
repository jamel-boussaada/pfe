import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { esignService } from '../../core/services/esign.service';
import { esignProcess, KPI } from '../../core/models/esign.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="kpi-grid">
      <div class="kpi">
        <div class="kpi-val text-navy">{{ kpis?.total }}</div>
        <div class="kpi-lbl">Processus ce mois</div>
        <div class="kpi-sub text-success">▲ {{ kpis?.growth }} vs mois dernier</div>
      </div>
      <div class="kpi">
        <div class="kpi-val text-accent">{{ kpis?.inProgress }}</div>
        <div class="kpi-lbl">En cours</div>
        <div class="kpi-sub text-muted">— stable</div>
      </div>
      <div class="kpi">
        <div class="kpi-val text-success">{{ kpis?.completed }}</div>
        <div class="kpi-lbl">Complétés</div>
        <div class="kpi-sub text-success">▲ 80%</div>
      </div>
      <div class="kpi">
        <div class="kpi-val text-danger">{{ kpis?.refused }}</div>
        <div class="kpi-lbl">Refusés / Expirés</div>
        <div class="kpi-sub text-danger">▼ -2</div>
      </div>
    </div>

    <div class="card" style="padding:0; overflow:hidden">
      <div class="d-flex align-center justify-between" style="padding:10px 14px; border-bottom:0.5px solid var(--border)">
        <div style="font-size:12px; font-weight:500; color:var(--navy)">Processus récents</div>
        <div class="d-flex gap-2">
          <input class="inp" style="width:140px; padding:4px 8px" placeholder="Rechercher...">
          <select class="inp" style="width:130px; padding:4px 8px">
            <option>Tous les statuts</option>
            <option>En cours</option>
            <option>Complété</option>
            <option>Refusé</option>
          </select>
          <button class="btn btn-primary" style="padding:4px 10px; font-size:11px">+ Nouveau</button>
        </div>
      </div>
      <table class="tbl">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Document</th>
            <th>Client</th>
            <th>Signataires</th>
            <th>Statut</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let process of processes">
            <td style="font-family:monospace; color:var(--accent); font-size:11px">{{ process.reference }}</td>
            <td>{{ process.title }}</td>
            <td>{{ process.clientName }}</td>
            <td>
              <span class="badge" [ngClass]="getStatusBadgeClass(process.status)">
                {{ process.signatories.length > 0 ? '1/' + process.signatories.length : '0/0' }}
              </span>
            </td>
            <td>
              <span class="badge" [ngClass]="getStatusBadgeClass(process.status)">
                {{ process.status }}
              </span>
            </td>
            <td style="color:var(--muted); font-size:11px">{{ process.createdAt | date:'short' }}</td>
            <td>
              <button class="btn" style="padding:2px 7px; font-size:11px" [routerLink]="['/process', process.id]">Voir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  kpis?: KPI;
  processes: esignProcess[] = [];

  constructor(private esignService: esignService) {}

  ngOnInit(): void {
    this.esignService.getKPIs().subscribe(k => this.kpis = k);
    this.esignService.getProcesses().subscribe(p => this.processes = p);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'IN_PROGRESS': return 'badge-blue';
      case 'COMPLETED': return 'badge-green';
      case 'REFUSED': return 'badge-orange';
      case 'EXPIRED': return 'badge-red';
      default: return 'badge-gray';
    }
  }
}
