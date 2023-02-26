import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExtras } from 'app/shared/model/extras.model';

type EntityResponseType = HttpResponse<IExtras>;
type EntityArrayResponseType = HttpResponse<IExtras[]>;

@Injectable({ providedIn: 'root' })
export class ExtrasService {
  public resourceUrl = SERVER_API_URL + 'api/extras';

  constructor(protected http: HttpClient) {}

  create(extras: IExtras): Observable<EntityResponseType> {
    return this.http.post<IExtras>(this.resourceUrl, extras, { observe: 'response' });
  }

  update(extras: IExtras): Observable<EntityResponseType> {
    return this.http.put<IExtras>(this.resourceUrl, extras, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExtras>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExtras[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
