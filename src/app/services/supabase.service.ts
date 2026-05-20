import { inject, Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../enviroments/enviroments'
import { ILogin,IRegistro } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase : SupabaseClient;

  constructor(){
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
      
    )
  }

  async registrar(datos_registro : IRegistro){
      const {data, error} =  await this.supabase.auth.signUp({   
        email:datos_registro.email,
        password:datos_registro.password   

      });
      if(data.user && !error){
        return await this.supabase.from("usuarios").insert({
          id : data.user.id,
          email : datos_registro.email,
          nombre : datos_registro.nombre,
          apellido : datos_registro.apellido,
          edad : datos_registro.edad
        })
      }else{
         return {data,error}};
      }
  


  async login(datos_login:ILogin){
    return await this.supabase.auth.signInWithPassword({
      email: datos_login.email,
      password:datos_login.password
    })
  }
  async logout(){
    return await this.supabase.auth.signOut()
  }


  async getSesion(){
    return await this.supabase.auth.getSession()
  }
  async getUsuario(id: string) {
  return await this.supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .single();
}

 }
