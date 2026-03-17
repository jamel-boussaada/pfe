import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex align-center justify-center" style="height: 100vh; background: var(--navy2)">
      <div class="card" style="width: 320px; padding: 30px">
        <div class="logo-mark" style="width: 48px; height: 48px; font-size: 20px; margin: 0 auto 20px">eS</div>
        <h2 style="text-align: center; color: var(--navy); margin-bottom: 20px">Connexion</h2>
        
        <div class="form-group mb-2">
          <label class="lbl">Email</label>
          <input class="inp" type="email" placeholder="nom@exemple.com">
        </div>
        
        <div class="form-group mb-2">
          <label class="lbl">Mot de passe</label>
          <input class="inp" type="password" placeholder="••••••••">
        </div>
        
        <button class="btn btn-primary" style="width: 100%; padding: 10px; justify-content: center; margin-top: 10px" (click)="login()">
          Se connecter
        </button>
        
        <div style="text-align: center; margin-top: 15px; font-size: 11px; color: var(--muted)">
          Plateforme de Signature Électronique Avancée
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    localStorage.setItem('token', 'mock-jwt-token');
    this.router.navigate(['/dashboard']);
  }
}
