import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-esign-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="shell">
      <!-- LEFT NAV -->
      <nav class="leftnav">
        <div class="logo-mark">eS</div>
        
        <div class="nav-icon" routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          <span class="nav-tooltip">Dashboard</span>
          📊
        </div>
        
        <div class="nav-icon" routerLink="/signing/1" routerLinkActive="active">
          <span class="nav-tooltip">Page signature</span>
          ✍️
        </div>

        <div class="nav-divider"></div>

        <div class="nav-icon" routerLink="/config" routerLinkActive="active">
          <span class="nav-tooltip">Configuration</span>
          ⚙️
        </div>
      </nav>

      <!-- CONTENT AREA -->
      <div class="content-area">
        <!-- TOPBAR -->
        <div class="topbar">
          <div class="topbar-title">ODM-eSign Platform</div>
          <div style="display:flex;gap:12px;align-items:center">
            <span style="font-size:11px;color:var(--muted)">Teamwill</span>
            <div style="width:26px;height:26px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500">JB</div>
          </div>
        </div>

        <div class="screen-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
  `]
})
export class EsignLayoutComponent {}
