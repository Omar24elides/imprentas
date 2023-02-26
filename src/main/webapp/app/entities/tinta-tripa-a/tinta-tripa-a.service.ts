import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITintaTripaA } from 'app/shared/model/tinta-tripa-a.model';

type EntityResponseType = HttpResponse<ITintaTripaA>;
type EntityArrayResponseType = HttpResponse<ITintaTripaA[]>;

@Injectable({ providedIn: 'root' })
export class TintaTripaAService {
  public resourceUrl = SERVER_API_URL + 'api/tinta-tripa-as';

  constructor(protected http: HttpClient) {}

  create(tintaTripaA: ITintaTripaA): Observable<EntityResponseType> {
    return this.http.post<ITintaTripaA>(this.resourceUrl, tintaTripaA, { observe: 'response' });
  }

  update(tintaTripaA: ITintaTripaA): Observable<EntityResponseType> {
    return this.http.put<ITintaTripaA>(this.resourceUrl, tintaTripaA, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITintaTripaA>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITintaTripaA[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
