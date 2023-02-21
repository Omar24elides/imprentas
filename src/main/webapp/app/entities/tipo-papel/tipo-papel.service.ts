import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoPapel } from 'app/shared/model/tipo-papel.model';

type EntityResponseType = HttpResponse<ITipoPapel>;
type EntityArrayResponseType = HttpResponse<ITipoPapel[]>;

@Injectable({ providedIn: 'root' })
export class TipoPapelService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-papels';

  constructor(protected http: HttpClient) {}

  create(tipoPapel: ITipoPapel): Observable<EntityResponseType> {
    return this.http.post<ITipoPapel>(this.resourceUrl, tipoPapel, { observe: 'response' });
  }

  update(tipoPapel: ITipoPapel): Observable<EntityResponseType> {
    return this.http.put<ITipoPapel>(this.resourceUrl, tipoPapel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoPapel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoPapel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
