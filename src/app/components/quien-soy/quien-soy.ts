import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  imports: [],
  templateUrl: './quien-soy.html',
  styleUrl: './quien-soy.css',
})
export class QuienSoy {
  http = inject(HttpClient);
  url = "https://api.github.com/users/Justo456";
  usuarioGithub = signal<any>(null)

  ngOnInit() {
    this.http.get(this.url).subscribe((data : any)=>{
      this.usuarioGithub.set(data);
      console.log(data);
    })
  }
  
}
