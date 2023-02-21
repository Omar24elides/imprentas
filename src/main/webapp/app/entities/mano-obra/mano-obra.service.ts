import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IManoObra } from 'app/shared/model/mano-obra.model';

type EntityResponseType = HttpResponse<IManoObra>;
type EntityArrayResponseType = HttpResponse<IManoObra[]>;

@Injectable({ providedIn: 'root' })
export class ManoObraService {
  public resourceUrl = SERVER_API_URL + 'api/mano-obras';

  constructor(protected http: HttpClient) {}

  create(manoObra: IManoObra): Observable<EntityResponseType> {
    return this.http.post<IManoObra>(this.resourceUrl, manoObra, { observe: 'response' });
  }

  update(manoObra: IManoObra): Observable<EntityResponseType> {
    return this.http.put<IManoObra>(this.resourceUrl, manoObra, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IManoObra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IManoObra[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
