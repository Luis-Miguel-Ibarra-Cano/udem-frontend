import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonasServiceService {

  constructor(
    private _http: HttpClient
  ) { }

  private getHeaders(): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public create(formData:any): Observable<any>{
    return this._http.post<any>(
      `${environment.URL_API}/personas`,
      formData,
      { headers: this.getHeaders() }

    ).pipe(
      catchError((e: any) => {
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#b0b0b0',
          html: `<p>Algo ha salido mal!<br> <span class="text-primary">${e.message}</span> </p>`
        });
        return throwError(e);
      })
    );
  }

  public update(formData:any, id:string|number): Observable<any>{
    return this._http.put<any>(
      `${environment.URL_API}/personas/${id}`,
      formData,
      { headers: this.getHeaders() }

    ).pipe(
      catchError((e: any) => {
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#b0b0b0',
          html: `<p>Algo ha salido mal!<br> <span class="text-primary">${e.message}</span> </p>`
        });
        return throwError(e);
      })
    );
  }

  public delete(id:string|number): Observable<any>{
    return this._http.delete<any>(
      `${environment.URL_API}/personas/${id}`,
      { headers: this.getHeaders() }

    ).pipe(
      catchError((e: any) => {
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#b0b0b0',
          html: `<p>Algo ha salido mal!<br> <span class="text-primary">${e.message}</span> </p>`
        });
        return throwError(e);
      })
    );
  }

  public readAll(): Observable<any>{
    return this._http.get<any>(
      `${environment.URL_API}/personas`,
    ).pipe(
      catchError((e: any) => {
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#b0b0b0',
          html: `<p>Algo ha salido mal!<br> <span class="text-primary">${e.message}</span> </p>`
        });
        return throwError(e);
      })
    );
  }

  public read(id:string|number){
    return this._http.get<any>(
      `${environment.URL_API}/personas/${id}`,
    ).pipe(
      catchError((e: any) => {
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#b0b0b0',
          html: `<p>Algo ha salido mal!<br> <span class="text-primary">${e.message}</span> </p>`
        });
        return throwError(e);
      })
    );
  }


}
