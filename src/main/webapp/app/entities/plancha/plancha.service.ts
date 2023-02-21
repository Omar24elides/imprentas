import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlancha } from 'app/shared/model/plancha.model';

type EntityResponseType = HttpResponse<IPlancha>;
type EntityArrayResponseType = HttpResponse<IPlancha[]>;

@Injectable({ providedIn: 'root' })
export class PlanchaService {
  public resourceUrl = SERVER_API_URL + 'api/planchas';

  constructor(protected http: HttpClient) {}

  create(plancha: IPlancha): Observable<EntityResponseType> {
    return this.http.post<IPlancha>(this.resourceUrl, plancha, { observe: 'response' });
  }

  update(plancha: IPlancha): Observable<EntityResponseType> {
    return this.http.put<IPlancha>(this.resourceUrl, plancha, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlancha>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlancha[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
