import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, OnDestroy {
  supabase = inject(SupabaseService);
  mensajes = signal<any[]>([]);
  nuevoMensaje = '';
  usuarioEmail = '';
  suscripcion: any;

  async ngOnInit() {
    const { data } = await this.supabase.getSesion();
    if (data.session) {
      this.usuarioEmail = data.session.user.email!;
    }

    const { data: mensajes } = await this.supabase.getMensajes();
    this.mensajes.set(mensajes || []);

    this.suscripcion = this.supabase.suscribirseAlChat((payload) => {
      this.mensajes.update(msgs => [...msgs, payload.new]);
    });
  }

  async enviar() {
    if (!this.nuevoMensaje.trim()) return;

    await this.supabase.enviarMensaje({
      usuario_email: this.usuarioEmail,
      mensaje: this.nuevoMensaje
    });

    this.nuevoMensaje = '';
  }

  ngOnDestroy() {
    this.suscripcion?.unsubscribe();
  }
}