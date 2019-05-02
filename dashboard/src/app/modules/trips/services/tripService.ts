import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { ApiService } from '~/shared/services/apiService';

@Injectable()
export class TripService extends ApiService {
  public endPoint = '/trips';

  public messages = {
    created: 'Le trajet a bien été crée.',
    deleted: 'Le trajet a bien été supprimé.',
    updated: 'Le trajet a bien été mis à jour',
  };

  send(trip): any {
    return this.post(trip);
  }

  export(type, filters) {
    return this.get(filters, {
      headers: new HttpHeaders({
        Accept: (type === 'csv') ? 'text/csv' : 'application/json',
      }),
      responseType: 'blob',
    });
  }

}
