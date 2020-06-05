import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { _throw as throwError } from 'rxjs/observable/throw';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Cliente } from './cliente';



@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  //httpHeaders = new HttpHeaders().append('Access-Control-Allow-Origin', 'http://localhost:8080')
  constructor(private http: HttpClient,private router:Router) { }
private isNoAutorizado(e): boolean{
  if(e.status==401||e.status==403)
  {
    this.router.navigate(['/login'])
    return true;
  }
  return false;
}
/* getRegiones():Observable<Region[]>{
return this.http.get<Region[]>(`${this.urlEndPoint}/regiones`).pipe(
catchError(e=>{
this.isNoAutorizado(e);
return throwError(e);
})
);

}  */

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  create(cliente: Cliente) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        swal('error al crear cliente ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate
        console.error(e.error.mensaje);
        swal('error al editar ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        swal('error al crear cliente ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

}
