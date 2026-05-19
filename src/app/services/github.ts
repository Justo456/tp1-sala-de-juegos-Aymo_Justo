import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GithubService {
  http = inject(HttpClient);

  getUsuario(username: string) {
    return this.http.get(`https://api.github.com/users/${username}`);
  }
}