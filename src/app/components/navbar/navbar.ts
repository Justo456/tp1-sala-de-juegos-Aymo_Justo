import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  supabase = inject(SupabaseService);
  ruta = inject(Router);

  async cerrarSesion() {
    await this.supabase.logout();
    this.ruta.navigate(['/login']);
  }
}