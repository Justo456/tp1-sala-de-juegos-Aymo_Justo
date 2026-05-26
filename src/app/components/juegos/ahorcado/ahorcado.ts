import { Component, inject, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-ahorcado',
  imports: [RouterLink ],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css',
})
export class Ahorcado implements OnInit {
  supabase = inject(SupabaseService);

  palabras = [
    { palabra: 'ANGULAR', pista: 'Framework de frontend de Google' },
    { palabra: 'TYPESCRIPT', pista: 'Lenguaje tipado basado en JavaScript' },
    { palabra: 'SUPABASE', pista: 'Backend serverless con base de datos' },
    { palabra: 'COMPONENTE', pista: 'Bloque fundamental de Angular' },
    { palabra: 'SERVICIO', pista: 'Clase que comparte lógica entre componentes' },
    { palabra: 'TECLADO', pista: 'Periférico de entrada de texto' },
    { palabra: 'MONITOR', pista: 'Dispositivo de salida visual' },
    { palabra: 'ALGORITMO', pista: 'Secuencia de pasos para resolver un problema' },
    { palabra: 'VARIABLE', pista: 'Contenedor de datos en programación' },
    { palabra: 'INTERNET', pista: 'Red global de computadoras' },
    { palabra: 'JAVASCRIPT', pista: 'Lenguaje de programación web' },
    { palabra: 'PROGRAMA', pista: 'Conjunto de instrucciones para una computadora' },
    { palabra: 'PANTALLA', pista: 'Superficie donde se muestra la imagen' },
    { palabra: 'MEMORIA', pista: 'Almacenamiento temporal del sistema' },
    { palabra: 'CURSOR', pista: 'Indicador de posición en la pantalla' },
  ];

  palabraActual = this.palabras[Math.floor(Math.random() * this.palabras.length)];
  palabraActualArray = this.palabraActual.palabra.split('');
  palabraVacias = this.palabraActualArray.map(() => '_');
  letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  letrasUsadas: string[] = [];
  errores = 0;
  maxErrores = 6;
  juegoTerminado = false;
  gano = false;
  tiempoInicio = Date.now();
  usuarioEmail = '';
  mensajeModal = signal('');

  async ngOnInit() {
    const { data } = await this.supabase.getSesion();
    if (data.session) {
      this.usuarioEmail = data.session.user.email!;
    }
  }

  async seleccionarLetra(letra: string) {
    if (this.letrasUsadas.includes(letra) || this.juegoTerminado) return;

    this.letrasUsadas.push(letra);

    if (this.palabraActualArray.includes(letra)) {
      this.palabraActualArray.forEach((l, i) => {
        if (l === letra) this.palabraVacias[i] = letra;
      });

      if (!this.palabraVacias.includes('_')) {
        this.juegoTerminado = true;
        this.mensajeModal.set('¡GANASTE! 🎉');
        this.gano = true;
        await this.guardarResultado();
      }
    } else {
      this.errores++;
      if (this.errores >= this.maxErrores) {
        this.juegoTerminado = true;
        this.mensajeModal.set(`PERDISTE 💀 La palabra era: ${this.palabraActual.palabra}`);
        
        await this.guardarResultado();
      }
    }
  }

  async guardarResultado() {
    const tiempo = Math.floor((Date.now() - this.tiempoInicio) / 1000);
    await this.supabase.guardarAhorcado({
      usuario_email: this.usuarioEmail,
      palabra: this.palabraActual.palabra,
      errores: this.errores,
      gano: this.gano,
      tiempo: tiempo
    });
  }

  reiniciar() {
    this.palabraActual = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraActualArray = this.palabraActual.palabra.split('');
    this.palabraVacias = this.palabraActualArray.map(() => '_');
    this.letrasUsadas = [];
    this.errores = 0;
    this.juegoTerminado = false;
    this.gano = false;
    this.tiempoInicio = Date.now();
  }
}