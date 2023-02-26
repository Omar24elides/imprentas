import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoMontaje } from 'app/shared/model/tipo-montaje.model';

type EntityResponseType = HttpResponse<ITipoMontaje>;
type EntityArrayResponseType = HttpResponse<ITipoMontaje[]>;

@Injectable({ providedIn: 'root' })
export class TipoMontajeService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-montajes';

  constructor(protected http: HttpClient) {}

  create(tipoMontaje: ITipoMontaje): Observable<EntityResponseType> {
    return this.http.post<ITipoMontaje>(this.resourceUrl, tipoMontaje, { observe: 'response' });
  }

  update(tipoMontaje: ITipoMontaje): Observable<EntityResponseType> {
    return this.http.put<ITipoMontaje>(this.resourceUrl, tipoMontaje, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoMontaje>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoMontaje[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
