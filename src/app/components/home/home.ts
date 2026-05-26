import { Component, inject, signal} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  supabase = inject(SupabaseService);
  ruta = inject(Router);
  usuario = signal<any>(null);

  async ngOnInit() {
    const { data } = await this.supabase.getSesion();
    if (data.session) {
      const { data: datosUsuario } = await this.supabase.getUsuario(data.session.user.id);
      this.usuario.set(datosUsuario);
    }
  }

}
