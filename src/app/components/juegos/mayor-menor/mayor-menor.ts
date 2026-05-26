import { Component, inject, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-mayor-menor',
  imports: [RouterLink],
  templateUrl: './mayor-menor.html',
  styleUrl: './mayor-menor.css',
})
export class MayorMenor implements OnInit {
  supabase = inject(SupabaseService);

  palos = ['♠', '♥', '♦', '♣'];
  cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  cartaActual = this.cartaAleatoria();
  cartaSiguiente: number | null = null;
  aciertos = 0;
  juegoTerminado = signal(false);
  usuarioEmail = '';
  mensaje = '';
  mensajeModal = signal('');

  async ngOnInit() {
    const { data } = await this.supabase.getSesion();
    if (data.session) {
      this.usuarioEmail = data.session.user.email!;
    }
  }

  cartaAleatoria() {
    return {
      numero: this.cartas[Math.floor(Math.random() * this.cartas.length)],
      palo: this.palos[Math.floor(Math.random() * this.palos.length)]
    };
  }

  async adivinar(eleccion: 'mayor' | 'menor') {
    if (this.juegoTerminado()) return;

    this.cartaSiguiente = this.cartaAleatoria().numero;

    const esMayor = this.cartaSiguiente > this.cartaActual.numero;
    const esMenor = this.cartaSiguiente < this.cartaActual.numero;

    if (
      (eleccion === 'mayor' && esMayor) ||
      (eleccion === 'menor' && esMenor)
    ) {
      this.aciertos++;
      this.mensaje = '¡Correcto!';
      this.cartaActual = { numero: this.cartaSiguiente, palo: this.palos[Math.floor(Math.random() * this.palos.length)] };
      this.cartaSiguiente = null;
    } else {
      this.juegoTerminado.set(true);
      this.mensajeModal.set('¡PERDISTE! 💀');
      await this.guardarResultado();
    }
  }

  async guardarResultado() {
    await this.supabase.guardarMayorMenor({
      usuarios_email: this.usuarioEmail,
      aciertos: this.aciertos
    });
    
  }

  reiniciar() {
    this.cartaActual = this.cartaAleatoria();
    this.cartaSiguiente = null;
    this.aciertos = 0;
    this.juegoTerminado.set(false);
    this.mensaje = '';
  }
}