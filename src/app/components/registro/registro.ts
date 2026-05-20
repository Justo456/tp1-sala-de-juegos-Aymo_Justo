import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  supabase = inject(SupabaseService);
  ruta = inject(Router)

  formulario = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    nombre: new FormControl("", [Validators.required]),
    apellido: new FormControl("", [Validators.required]),
    edad: new FormControl("", [Validators.required, Validators.maxLength(2)]),
  })
  mostrarModal = signal(false);
  mensajeError = signal('');

  cerrarModal() {
    this.mostrarModal.set(false);
  }

  async registrar() {
    const { email, password, nombre, apellido, edad } = this.formulario.value;
    const { data, error } = await this.supabase.registrar({
      email: email!,
      password: password!,
      nombre: nombre!,
      apellido: apellido!,
      edad: edad!,
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

}
