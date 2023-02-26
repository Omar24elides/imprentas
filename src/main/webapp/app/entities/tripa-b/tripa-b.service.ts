import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITripaB } from 'app/shared/model/tripa-b.model';

type EntityResponseType = HttpResponse<ITripaB>;
type EntityArrayResponseType = HttpResponse<ITripaB[]>;

@Injectable({ providedIn: 'root' })
export class TripaBService {
  public resourceUrl = SERVER_API_URL + 'api/tripa-bs';

  constructor(protected http: HttpClient) {}

  create(tripaB: ITripaB): Observable<EntityResponseType> {
    return this.http.post<ITripaB>(this.resourceUrl, tripaB, { observe: 'response' });
  }

  update(tripaB: ITripaB): Observable<EntityResponseType> {
    return this.http.put<ITripaB>(this.resourceUrl, tripaB, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITripaB>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITripaB[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
