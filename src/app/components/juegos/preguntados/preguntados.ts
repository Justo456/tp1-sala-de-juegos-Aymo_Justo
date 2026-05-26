import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupabaseService } from '../../../services/supabase.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-preguntados',
  imports: [RouterLink],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css',
})
export class Preguntados implements OnInit {
  supabase = inject(SupabaseService);
  http = inject(HttpClient);

  preguntas: any[] = [];
  preguntaActual = signal<any>(null);
  opciones = signal<string[]>([]);
  indicePregunta = 0;
  aciertos = 0;
  juegoTerminado = signal(false);
  respuestaSeleccionada: string | null = null;
  usuarioEmail = '';

  async ngOnInit() {
    const { data } = await this.supabase.getSesion();
    if (data.session) {
      this.usuarioEmail = data.session.user.email!;
    }
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.http.get<any>('https://opentdb.com/api.php?amount=10&type=multiple').subscribe({
      next: (data) => {
        this.preguntas = data.results;
        this.mostrarPregunta();
      },
      error: (err) => {
        console.log('error:', err);
      }
    });
  }

  mostrarPregunta() {
    console.log('indice:', this.indicePregunta, 'largo:', this.preguntas.length);
    if (this.indicePregunta >= this.preguntas.length) {
      this.juegoTerminado.set(true);
      this.guardarResultado();
      return;
    }

    const pregunta = this.preguntas[this.indicePregunta];
    this.preguntaActual.set(pregunta);
    this.respuestaSeleccionada = null;
    this.opciones.set([
      ...pregunta.incorrect_answers,
      pregunta.correct_answer
    ].sort(() => Math.random() - 0.5));
  }

  seleccionarRespuesta(opcion: string) {
    if (this.respuestaSeleccionada) return;

    this.respuestaSeleccionada = opcion;

    if (opcion === this.preguntaActual().correct_answer) {
      this.aciertos++;
    }

    setTimeout(() => {
      this.indicePregunta++;
      this.mostrarPregunta();
    }, 1000);
  }

  async guardarResultado() {
    await this.supabase.guardarPreguntados({
      usuario_email: this.usuarioEmail,
      aciertos: this.aciertos,
      total_preguntas: this.preguntas.length
    });
  }

  reiniciar() {
    this.preguntas = [];
    this.indicePregunta = 0;
    this.aciertos = 0;
    this.juegoTerminado.set(true);
    this.respuestaSeleccionada = null;
    this.cargarPreguntas();
  }
}