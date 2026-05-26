import { Component, inject, OnInit,signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-resultados',
  imports: [],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css',
})
export class Resultados implements OnInit {
  supabase = inject(SupabaseService);


ahorcado = signal<any[]>([]);
mayorMenor = signal<any[]>([]);
preguntados = signal<any[]>([]);
adivinaNumero = signal<any[]>([]);

async ngOnInit() {
  const { data: a } = await this.supabase.getResultadosAhorcado();
  const { data: m } = await this.supabase.getResultadosMayorMenor();
  const { data: p } = await this.supabase.getResultadosPreguntados();
  const { data: an } = await this.supabase.getResultadosAdivinaNumero();

  this.ahorcado.set(a || []);
  this.mayorMenor.set(m || []);
  this.preguntados.set(p || []);
  this.adivinaNumero.set(an || []);
}
}