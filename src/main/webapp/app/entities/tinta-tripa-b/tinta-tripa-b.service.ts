import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITintaTripaB } from 'app/shared/model/tinta-tripa-b.model';

type EntityResponseType = HttpResponse<ITintaTripaB>;
type EntityArrayResponseType = HttpResponse<ITintaTripaB[]>;

@Injectable({ providedIn: 'root' })
export class TintaTripaBService {
  public resourceUrl = SERVER_API_URL + 'api/tinta-tripa-bs';

  constructor(protected http: HttpClient) {}

  create(tintaTripaB: ITintaTripaB): Observable<EntityResponseType> {
    return this.http.post<ITintaTripaB>(this.resourceUrl, tintaTripaB, { observe: 'response' });
  }

  update(tintaTripaB: ITintaTripaB): Observable<EntityResponseType> {
    return this.http.put<ITintaTripaB>(this.resourceUrl, tintaTripaB, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITintaTripaB>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITintaTripaB[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
