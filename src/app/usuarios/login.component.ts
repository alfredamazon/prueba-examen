import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
titulo:string = 'por favor sign in!';
usuario:Usuario;
  constructor() { 
    this.usuario = new Usuario();
  }
  ngOnInit() {
  }
login(): void {

  console.log(this.usuario);
  if(this.usuario.username==null||this.usuario.password==null)
  swal('Error Login', 'Username o password vacias ','error' )
  return;
}

}
