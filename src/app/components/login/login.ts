import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  supabase = inject(SupabaseService);
  ruta = inject(Router);

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  mostrarModal = signal(false);
  mensajeError = signal('');

  cerrarModal() {
    this.mostrarModal.set(false);
  }


  async ingresar() {

    const { email, password } = this.formulario.value;
    const { data, error } = await this.supabase.login({
      email: email!,
      password: password!

    })
    if (error) {

      let mensaje = '';

      if (error.message === 'User already registered') {
        mensaje = 'Este email ya está registrado';
      } else if (error.message === 'Invalid login credentials') {
        mensaje = 'Email o contraseña incorrectos';
      } else {
        mensaje = 'Ocurrió un error, intentá de nuevo';
      }

      this.mensajeError.set(mensaje);
      this.mostrarModal.set(true);
    } else {
      this.ruta.navigate(['home'])
    }

  }

  async ingresoRapido(jugador: number) {
    const usuarios = [
      { email: 'jugador1@prueba.com', password: '123456' },
      { email: 'jugador2@prueba.com', password: '123456' },
      { email: 'jugador3@prueba.com', password: '123456' },
    ];

    const { data, error } = await this.supabase.login(usuarios[jugador - 1]);

    if (error) {
      this.mensajeError.set(error.message);
      this.mostrarModal.set(true);
    } else {
      this.ruta.navigate(['/home']);
    }

  }

}
