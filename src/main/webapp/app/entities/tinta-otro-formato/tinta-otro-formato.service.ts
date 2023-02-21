import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITintaOtroFormato } from 'app/shared/model/tinta-otro-formato.model';

type EntityResponseType = HttpResponse<ITintaOtroFormato>;
type EntityArrayResponseType = HttpResponse<ITintaOtroFormato[]>;

@Injectable({ providedIn: 'root' })
export class TintaOtroFormatoService {
  public resourceUrl = SERVER_API_URL + 'api/tinta-otro-formatoes';

  constructor(protected http: HttpClient) {}

  create(tintaOtroFormato: ITintaOtroFormato): Observable<EntityResponseType> {
    return this.http.post<ITintaOtroFormato>(this.resourceUrl, tintaOtroFormato, { observe: 'response' });
  }

  update(tintaOtroFormato: ITintaOtroFormato): Observable<EntityResponseType> {
    return this.http.put<ITintaOtroFormato>(this.resourceUrl, tintaOtroFormato, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITintaOtroFormato>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITintaOtroFormato[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
