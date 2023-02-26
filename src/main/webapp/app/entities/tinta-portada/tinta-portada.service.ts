import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITintaPortada } from 'app/shared/model/tinta-portada.model';

type EntityResponseType = HttpResponse<ITintaPortada>;
type EntityArrayResponseType = HttpResponse<ITintaPortada[]>;

@Injectable({ providedIn: 'root' })
export class TintaPortadaService {
  public resourceUrl = SERVER_API_URL + 'api/tinta-portadas';

  constructor(protected http: HttpClient) {}

  create(tintaPortada: ITintaPortada): Observable<EntityResponseType> {
    return this.http.post<ITintaPortada>(this.resourceUrl, tintaPortada, { observe: 'response' });
  }

  update(tintaPortada: ITintaPortada): Observable<EntityResponseType> {
    return this.http.put<ITintaPortada>(this.resourceUrl, tintaPortada, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITintaPortada>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITintaPortada[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
