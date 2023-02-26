import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICostosIndirectos } from 'app/shared/model/costos-indirectos.model';

type EntityResponseType = HttpResponse<ICostosIndirectos>;
type EntityArrayResponseType = HttpResponse<ICostosIndirectos[]>;

@Injectable({ providedIn: 'root' })
export class CostosIndirectosService {
  public resourceUrl = SERVER_API_URL + 'api/costos-indirectos';

  constructor(protected http: HttpClient) {}

  create(costosIndirectos: ICostosIndirectos): Observable<EntityResponseType> {
    return this.http.post<ICostosIndirectos>(this.resourceUrl, costosIndirectos, { observe: 'response' });
  }

  update(costosIndirectos: ICostosIndirectos): Observable<EntityResponseType> {
    return this.http.put<ICostosIndirectos>(this.resourceUrl, costosIndirectos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICostosIndirectos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICostosIndirectos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
