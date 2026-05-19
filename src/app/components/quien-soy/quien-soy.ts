import { Component, inject, signal } from '@angular/core';
import { GithubService } from '../../services/github';
import { IUsuarioGithub } from '../../interfaces/UsuarioGithub';
@Component({
  selector: 'app-quien-soy',
  imports: [],
  templateUrl: './quien-soy.html',
  styleUrl: './quien-soy.css',
})
export class QuienSoy {
  githubService = inject(GithubService);
  usuarioGithub = signal<IUsuarioGithub | null>(null);

  ngOnInit() {
    this.githubService.getUsuario('Justo456').subscribe((data: any) => {
      this.usuarioGithub.set(data);
      console.log(data)
    });
  }
}
//interfaz quien soy implementar