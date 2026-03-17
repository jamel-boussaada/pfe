import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { esignService } from '../../core/services/esign.service';
import { esignProcess } from '../../core/models/esign.model';

@Component({
  selector: 'app-process-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="process">
      <div class="d-flex align-center gap-2 mb-2">
        <span class="badge badge-blue" style="font-size:12px; padding:4px 10px">{{ process.status }}</span>
        <span style="font-family:monospace; color:var(--accent); font-weight:500">{{ process.reference }}</span>
        <span style="color:var(--muted)">—</span>
        <span style="font-size:12px">{{ process.title }} — {{ process.clientName }}</span>
        <div style="margin-left:auto; display:flex; gap:6px">
          <button class="btn" style="font-size:11px">Télécharger PDF</button>
          <button class="btn btn-danger" style="font-size:11px">Annuler processus</button>
        </div>
      </div>

      <div class="row">
        <div class="col" style="max-width:300px; flex:0 0 300px">
          <div class="card">
            <div class="card-hd">Informations</div>
            <div class="d-flex flex-direction-column gap-2" style="font-size:12px; flex-direction:column">
              <div class="row gap-2"><span class="text-muted" style="min-width:80px">Document</span><span>{{ process.title }}.pdf</span></div>
              <div class="row gap-2"><span class="text-muted" style="min-width:80px">Client</span><span>{{ process.clientName }}</span></div>
              <div class="row gap-2"><span class="text-muted" style="min-width:80px">Mode</span><span><span class="badge badge-blue">{{ process.mode }}</span></span></div>
              <div class="row gap-2"><span class="text-muted" style="min-width:80px">Créé le</span><span>{{ process.createdAt | date:'short' }}</span></div>
              <div class="row gap-2"><span class="text-muted" style="min-width:80px">Expire le</span><span class="text-danger">{{ process.expiresAt | date:'short' }}</span></div>
            </div>
          </div>

          <div class="card mt-2">
            <div class="card-hd">Signataires</div>
            <div class="d-flex flex-direction-column gap-2" style="flex-direction:column">
              <div *ngFor="let sig of process.signatories" class="d-flex gap-2 align-start" [style.opacity]="sig.status === 'PENDING' ? 0.5 : 1">
                <div style="width:32px; height:32px; border-radius:50%; background:var(--navy); color:#fff; display:flex; align-items:center; justify-content:center; font-size:12px">
                  {{ sig.name.substring(0,2).toUpperCase() }}
                </div>
                <div class="flex-1">
                  <div style="font-size:12px; font-weight:500">{{ sig.name }}</div>
                  <div style="font-size:10px; color:var(--muted)">{{ sig.email }}</div>
                  <div class="mt-1"><span class="badge" [ngClass]="sig.status === 'COMPLETED' ? 'badge-green' : 'badge-blue'">{{ sig.status }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card" style="height:100%">
            <div class="card-hd">Journal d'audit / Timeline</div>
            <div class="tl mt-2">
              <div class="tl-item done">
                <div style="font-size:12px; font-weight:500">Processus créé</div>
                <div style="font-size:10px; color:var(--muted)">Par Jamel Ben Ali le 17/03/2026 à 12:04</div>
              </div>
              <div class="tl-item done">
                <div style="font-size:12px; font-weight:500">Email envoyé à Jamel Ben Ali</div>
                <div style="font-size:10px; color:var(--muted)">Le 17/03/2026 à 12:05</div>
              </div>
              <div class="tl-item current">
                <div style="font-size:12px; font-weight:500">Document en cours de lecture</div>
                <div style="font-size:10px; color:var(--muted)">Par Jamel Ben Ali (IP: 196.203.12.45)</div>
              </div>
              <div class="tl-item">
                <div style="font-size:12px; font-weight:500">En attente de Fatima Zahra</div>
                <div style="font-size:10px; color:var(--muted)">Étape suivante (Mode séquentiel)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProcessDetailComponent implements OnInit {
  process?: esignProcess;

  constructor(
    private route: ActivatedRoute,
    private esignService: esignService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esignService.getProcessById(id).subscribe(p => this.process = p);
    }
  }
}
