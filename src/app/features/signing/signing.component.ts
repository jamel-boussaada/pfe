import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { esignService } from '../../core/services/esign.service';
import { esignProcess, ZoneType } from '../../core/models/esign.model';

@Component({
  selector: 'app-signing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="signing-shell" *ngIf="process">
      <!-- PDF viewer -->
      <div class="pdf-panel">
        <div class="pdf-toolbar">
          <span>{{ process.title }} — {{ process.reference }}</span>
          <span style="margin-left:auto; display:flex; gap:6px">
            <button class="btn" style="padding:2px 8px; font-size:11px">◀</button>
            <span>3 / 8</span>
            <button class="btn" style="padding:2px 8px; font-size:11px">▶</button>
          </span>
          <button class="btn" style="padding:2px 8px; font-size:11px">⊕</button>
          <button class="btn" style="padding:2px 8px; font-size:11px">⊖</button>
        </div>
        
        <div class="pdf-view">
          <div class="pdf-page">
            <div style="font-size:6px; color:var(--muted); text-align:center; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px">
              {{ process.title }}
            </div>
            <div class="pdf-ln l"></div><div class="pdf-ln m"></div><div class="pdf-ln"></div><div class="pdf-ln s"></div><div class="pdf-ln m"></div>
            <div style="height:8px"></div>
            <div class="pdf-ln l"></div><div class="pdf-ln"></div><div class="pdf-ln m"></div><div class="pdf-ln s"></div><div class="pdf-ln l"></div>
            <div style="height:8px"></div>
            <div class="pdf-ln m"></div><div class="pdf-ln"></div><div class="pdf-ln s"></div>
            <div style="height:10px"></div>
            <div class="pdf-ln l"></div><div class="pdf-ln m"></div><div class="pdf-ln"></div>
            <div style="height:12px"></div>

            <!-- Zones -->
            <div *ngFor="let zone of process.zones" 
                 class="zone-box" 
                 [ngClass]="getZoneClass(zone.type)"
                 [style.left.px]="zone.x * 4"
                 [style.bottom.px]="zone.y * 4"
                 [style.width.px]="zone.width * 4"
                 [style.height.px]="zone.height * 4">
              <span class="zone-lbl">{{ zone.type }}</span>
            </div>
          </div>

          <!-- OTP overlay (conditional) -->
          <div class="otp-wrap" *ngIf="showOtp">
            <div class="otp-card">
              <div style="font-size:14px; font-weight:500; color:var(--navy); margin-bottom:4px">Code SMS</div>
              <div style="font-size:11px; color:var(--muted)">Envoyé au +216 ·· ·· 14 21</div>
              <div class="otp-boxes">
                <div class="otp-b">4</div><div class="otp-b">7</div><div class="otp-b">2</div>
                <div class="otp-b empty">·</div><div class="otp-b empty">·</div><div class="otp-b empty">·</div>
              </div>
              <button class="btn btn-primary" style="width:100%; margin-bottom:6px" (click)="confirmSign()">Valider</button>
              <button class="btn" style="width:100%; font-size:11px" (click)="showOtp = false">Annuler</button>
            </div>
          </div>

          <!-- Success overlay (conditional) -->
          <div class="success-overlay" *ngIf="isSigned">
            <div style="font-size:32px">✓</div>
            <div style="font-size:14px; font-weight:500">Document signé</div>
            <div style="font-size:11px; color:rgba(255,255,255,.7)">Email de confirmation envoyé</div>
          </div>
        </div>

        <!-- Bottom info bar -->
        <div style="height:36px; background:var(--white); border-top:0.5px solid var(--border); display:flex; align-items:center; padding:0 12px; gap:12px; font-size:10px; color:var(--muted)">
          <span class="d-flex align-center gap-1">
            <span style="width:8px; height:8px; border-radius:50%; background:var(--accent); display:inline-block"></span>
            1 / 2 signataires
          </span>
          <span class="d-flex align-center gap-1">
            <span style="width:8px; height:8px; border-radius:50%; border:1.5px solid var(--border); display:inline-block"></span>
            F. Zahra — en attente
          </span>
          <span style="margin-left:auto; color:var(--danger)">⌛ Expire dans 22h 14min</span>
        </div>
      </div>

      <!-- Options panel -->
      <div class="opts-panel">
        <div class="opts-inner">
          <div style="font-size:10px; font-weight:600; color:var(--navy); text-transform:uppercase; letter-spacing:.06em">Choisir une action</div>

          <div class="opt-card" [class.active]="selectedAction === 'paraph'" (click)="selectedAction = 'paraph'">
            <div class="opt-title">Paraphe stylisé</div>
            <div class="opt-desc">Style calligraphique prédéfini</div>
          </div>
          <div class="opt-card" [class.active]="selectedAction === 'manuscrit'" (click)="selectedAction = 'manuscrit'">
            <div class="opt-title">Signature manuscrite</div>
            <div class="opt-desc">Dessin libre sur canvas</div>
          </div>
          <div class="opt-card" [class.active]="selectedAction === 'tampon'" (click)="selectedAction = 'tampon'">
            <div class="opt-title">Tampon électronique</div>
            <div class="opt-desc">Style configuré par le client</div>
          </div>
          <div class="opt-card" [class.active]="selectedAction === 'refus'" (click)="selectedAction = 'refus'" style="border-color:#FEB2B2">
            <div class="opt-title" style="color:var(--danger)">Refuser la signature</div>
            <div class="opt-desc">Avec motif optionnel</div>
          </div>

          <!-- Sub-panels -->
          <div *ngIf="selectedAction === 'paraph'" class="mt-2">
            <div class="lbl">Style de paraphe</div>
            <div class="row gap-1">
              <div class="style-pill active">
                <div style="font-family:Georgia,serif; font-style:italic; font-size:14px; color:var(--navy)">J.B.</div>
                <div style="font-size:8px; color:var(--muted)">Script</div>
              </div>
              <div class="style-pill">
                <div style="font-family:cursive; font-size:14px; color:var(--navy)">J.B.</div>
                <div style="font-size:8px; color:var(--muted)">Cursive</div>
              </div>
            </div>
          </div>

          <div *ngIf="selectedAction === 'manuscrit'" class="mt-2">
            <div class="lbl">Dessinez votre signature</div>
            <div class="canvas-box" style="background:var(--soft); height:80px; border:1px solid var(--border); border-radius:6px; display:flex; align-items:center; justify-content:center">
               <span style="font-family:cursive; font-size:24px; opacity:0.3">Signez ici</span>
            </div>
            <button class="btn mt-1" style="width:100%">Effacer</button>
          </div>

          <div style="margin-top:auto; border-top:0.5px solid var(--border); padding-top:10px">
            <button class="btn btn-primary" style="width:100%; padding:10px; justify-content:center" (click)="showOtp = true">
              Signer le document
            </button>
            <div style="font-size:10px; color:var(--muted); text-align:center; margin-top:6px">Un code SMS sera envoyé</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    .style-pill { flex:1; border:0.5px solid var(--border); border-radius:6px; padding:6px 4px; text-align:center; cursor:pointer; }
    .style-pill.active { border-color:var(--navy); border-width:1.5px; background:var(--lblue); }
  `]
})
export class SigningComponent implements OnInit {
  process?: esignProcess;
  selectedAction: string = 'paraph';
  showOtp: boolean = false;
  isSigned: boolean = false;

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

  getZoneClass(type: ZoneType): string {
    switch (type) {
      case ZoneType.SIGNATURE: return 'zone-sig';
      case ZoneType.INITIALS: return 'zone-para';
      case ZoneType.RADIO: return 'zone-radio';
      default: return '';
    }
  }

  confirmSign(): void {
    this.showOtp = false;
    this.isSigned = true;
  }
}
