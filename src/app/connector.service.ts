import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  constructor() { }

  public connectorJson = {
    "_OP":"/patients-list/get-op-patients",
    "_IP":"/patients-list/get-ip-patients",
    "_ER":"/patients-list/get-er-patients"
  }
}
