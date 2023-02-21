import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITinta } from 'app/shared/model/tinta.model';

type EntityResponseType = HttpResponse<ITinta>;
type EntityArrayResponseType = HttpResponse<ITinta[]>;

@Injectable({ providedIn: 'root' })
export class TintaService {
  public resourceUrl = SERVER_API_URL + 'api/tintas';

  constructor(protected http: HttpClient) {}

  create(tinta: ITinta): Observable<EntityResponseType> {
    return this.http.post<ITinta>(this.resourceUrl, tinta, { observe: 'response' });
  }

  update(tinta: ITinta): Observable<EntityResponseType> {
    return this.http.put<ITinta>(this.resourceUrl, tinta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITinta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITinta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
