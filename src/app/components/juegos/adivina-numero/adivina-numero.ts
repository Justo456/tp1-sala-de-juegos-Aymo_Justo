import { Component, inject, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adivina-numero',
  imports: [RouterLink],
  templateUrl: './adivina-numero.html',
  styleUrl: './adivina-numero.css',
})
export class AdivinaNumero implements OnInit {
  supabase = inject(SupabaseService);

  numeroSecreto = 0;
  intentos = signal(0);
  maxIntentos = 10;
  pista = signal('');
  juegoTerminado = signal(false);
  gano = signal(false);
  mensajeModal = signal('');
  usuarioEmail = '';

  opciones = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
              21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
              41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
              61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
              81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];

  async ngOnInit() {
    const { data } = await this.supabase.getSesion();
    if (data.session) {
      this.usuarioEmail = data.session.user.email!;
    }
    this.iniciar();
  }

  iniciar() {
    this.numeroSecreto = Math.floor(Math.random() * 100) + 1;
    this.intentos.set(0);
    this.pista.set('');
    this.juegoTerminado.set(false);
    this.gano.set(false);
    this.mensajeModal.set('');
  }

  async adivinar(numero: number) {
    if (this.juegoTerminado()) return;

    this.intentos.update(i => i + 1);

    if (numero === this.numeroSecreto) {
      this.gano.set(true);
      this.juegoTerminado.set(true);
      this.mensajeModal.set(`¡GANASTE! Era el ${this.numeroSecreto}. Usaste ${this.intentos()} intentos 🎉`);
      await this.guardarResultado();
    } else if (numero < this.numeroSecreto) {
      this.pista.set(`El número es MAYOR que ${numero}`);
    } else {
      this.pista.set(`El número es MENOR que ${numero}`);
    }

    if (this.intentos() >= this.maxIntentos && !this.juegoTerminado()) {
      this.juegoTerminado.set(true);
      this.gano.set(false);
      this.mensajeModal.set(`PERDISTE 💀 El número era ${this.numeroSecreto}`);
      await this.guardarResultado();
    }
  }

  async guardarResultado() {
    await this.supabase.guardarAdivinaNumero({
      usuario_email: this.usuarioEmail,
      puntaje: this.intentos()
    });
  }

  reiniciar() {
    this.iniciar();
  }
}