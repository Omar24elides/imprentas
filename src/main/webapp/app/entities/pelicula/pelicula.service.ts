import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPelicula } from 'app/shared/model/pelicula.model';

type EntityResponseType = HttpResponse<IPelicula>;
type EntityArrayResponseType = HttpResponse<IPelicula[]>;

@Injectable({ providedIn: 'root' })
export class PeliculaService {
  public resourceUrl = SERVER_API_URL + 'api/peliculas';

  constructor(protected http: HttpClient) {}

  create(pelicula: IPelicula): Observable<EntityResponseType> {
    return this.http.post<IPelicula>(this.resourceUrl, pelicula, { observe: 'response' });
  }

  update(pelicula: IPelicula): Observable<EntityResponseType> {
    return this.http.put<IPelicula>(this.resourceUrl, pelicula, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPelicula>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPelicula[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
