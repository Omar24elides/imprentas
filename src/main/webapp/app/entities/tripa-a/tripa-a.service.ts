import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITripaA } from 'app/shared/model/tripa-a.model';

type EntityResponseType = HttpResponse<ITripaA>;
type EntityArrayResponseType = HttpResponse<ITripaA[]>;

@Injectable({ providedIn: 'root' })
export class TripaAService {
  public resourceUrl = SERVER_API_URL + 'api/tripa-as';

  constructor(protected http: HttpClient) {}

  create(tripaA: ITripaA): Observable<EntityResponseType> {
    return this.http.post<ITripaA>(this.resourceUrl, tripaA, { observe: 'response' });
  }

  update(tripaA: ITripaA): Observable<EntityResponseType> {
    return this.http.put<ITripaA>(this.resourceUrl, tripaA, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITripaA>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITripaA[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
