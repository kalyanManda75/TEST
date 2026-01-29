import { Injectable } from '@angular/core';
import { ConnectorService } from './connector.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(public connector:ConnectorService, private _http: HttpClient) { }
  public masterObject: any = {};
  // public apiUrl: any = 'http://localhost:1007/api'//'https://nurstronic.doctor9.com/patients-list';
  public apiUrl: any = `${window.location.protocol === 'https:' ? 'https' : 'http'}://nurstronic.doctor9.com/patients-list`;

  /**
   * Loads the connection data from the ConnectorService
   * and assigns it to the masterObject property.
   */
  async loadConnection() {
    this.masterObject = this.connector.connectorJson;
  }

  /**
   * Retrieves the API path corresponding to the given key parameter asynchronously.
   * 
   * @param keyParam - The key used to look up the API path.
   * @returns A promise that resolves with the API path as a string.
   */
  async getApiPath(keyParam: any) {
    var me = this;
    if (Object.keys(me.masterObject).length == 0) {
      this.loadConnection();
    }
    const keys = keyParam;

    let value: any = me.masterObject;
    if (value && value.hasOwnProperty(keys)) {
      value = value[keys];
    } else {
      return '';
    }

    return value !== undefined ? value : '';
  };

  /**
   * Makes an anonymous POST request to the API endpoint identified by the urlKey.
   * 
   * @param urlKey - The key identifying the API endpoint.
   * @param payloadData - The data payload to be sent with the POST request.
   * @returns A promise resolving with the response from the API.
   */
  async postAnonymousCalls(urlKey: any, payloadData: any): Promise<any> {
    let serviceUrl = this.apiUrl + urlKey;
    let resultData: any;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    await this._http.post(serviceUrl, payloadData, { headers: headers, observe: 'response' })
      .toPromise()
      .then((res: any) => {
        resultData = res.body;
      }, (err: any) => {
        resultData = err.error
      });

    return resultData;

  }

  public reportsJSon: any = {
    "_OP": {
      // "apiPath":"/patients-list/get-op-patients",
      "apiPath":"/get-op-patients",
      "payload":{},
      "masterDataForm": [
        {
          "field": "GENDER_CD",
          "label": "Gender",
          "dataType": "string",
          "inputType": "dropdown",
          "data":[]
        },
        {
          "field": "SPECIALITY",
          "label": "Speciality",
          "dataType": "string",
          "inputType": "dropdown",
          "data":[]
        }
      ],
      "gridColumnsList": [
        // {
        //   "value": 1,
        //   "label": "S.No",
        //   "field": "sno",
        //   "header": "S.No",
        //   "dataType": "string",
        //   "isFilter": false,
        //   "isColumnResize": false,
        //   "isSort":false,
        //   "style": {
        //     "width": "50px"
        //   }
        // },
        {
           "value": 2,
          "label": "Patient Name",
          "field": "PATIENT_NAME",
          "header": "Patient Name",
          "isFilter": true,
          "isColumnResize": true,
          "isSort":true,
          "dataType": "string",
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 3,
          "label": "Doctor Name",
          "field": "DOCTOR_NAME",
          "header": "Doctor Name",
          "dataType": "string",
          "isFilter": true,
          "isColumnResize": true,
          "isSort":true,
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 4,
          "label": "Mobile Number",
          "field": "PAT_MOBILE_NO",
          "header": "Mobile Number",
          "dataType": "string",
          "isColumnResize": false,
          "isSort":true,
          "isFilter": true,
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 5,
          "label": "Treatment Type",
          "field": "PAT_TYPE",
          "isColumnResize": false,
          "isSort":false,
          "header": "Treatment Type",
          "dataType": "string",
          "style": {
            "width": "50px"
          }
        }
      ],
      "globalSearchKeys":['PATIENT_NAME','DOCTOR_NAME','PAT_MOBILE_NO','PAT_TYPE'],
      "isPagedDataSource":false,
      "showGroupHead":true,
      "rowsPerPageOptions":[5, 10, 20],
      "rows":5,
      "groupRowsBy":{
        "name":'DOCTOR_NAME'
      }
    },
    "_IP":{
      // "apiPath":"/patients-list/get-ip-patients",
      // "apiPath":"/patients-list/get-ip-patients-paginated",
      "apiPath":"/get-ip-patients-paginated",
      "payload":{
          "pageNo": 1,
          "pageSize": 10
      },
      "masterDataForm":[
         {
          "field": "GENDER",
          "label": "Gender",
          "dataType": "string",
          "inputType": "dropdown",
          "data":[]
        },
         {
          "field": "PATIENT_TYPE_CD",
          "label": "Payment Type",
          "dataType": "string",
          "inputType": "dropdown",
          "data":[]
        },
         {
          "field": "WARD_NAME",
          "label": "Ward Name",
          "dataType": "string",
          "inputType": "dropdown",
          "data":[]
        },
      ],
      "gridColumnsList": [
        {
          "value": 1,
          "label": "S.No",
          "field": "sno",
          "header": "S.No",
          "dataType": "string",
          "frozenColumn":false,
          "isFilter": false,
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 2,
          "label": "Patient Name",
          "field": "PATIENT_NAME1",
          "header": "Patient Name",
          "dataType": "string",
          "isFilter": true,
          "frozenColumn":false,
          "isColumnResize": true,
          "isSort":true,
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 3,
          "label": "Doctor Name",
          "field": "CONSULTANT",
          "header": "Doctor Name",
          "dataType": "string",
          "isColumnResize": true,
          "isSort":true,
          "isFilter": true,
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 4,
          "label": "Mobile Number",
          "field": "MOBILE_NO",
          "header": "Mobile Number",
          "dataType": "string",
          "isFilter": true,
          "isColumnResize": false,
          "isSort":true,
          "tag":"<a href='javascript:void(0)'>{{text}}</a>",
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 5,
          "label": "Treatment Type",
          "field": "PAT_TYPE",
          "header": "Treatment Type",
          "dataType": "string",
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 6,
          "label": "Admission Number",
          "field": "ADMN_NO",
          "header": "Admission Number",
          "dataType": "string",
          "isColumnResize": true,
          "isSort":true,
          "isFilter": true,
          // "tag":"<p-button label='{{text}}' />",
          "style": {
            "width": "50px"
          }
        },
        // {
        //    "value": 7,
        //   "label": "Gender",
        //   "field": "GENDER",
        //   "header": "Gender",
        //   "dataType": "string",
        //   "isFilter": true,
        //   "style": {
        //     "width": "50px"
        //   }
        // },
        
      ],
      "globalSearchKeys":['PATIENT_NAME1','CONSULTANT','MOBILE_NO','PAT_TYPE','ADMN_NO'],
      "isPagedDataSource":true,
      "showGroupHead":false,
      "rowsPerPageOptions":[5, 10, 20],
      "rows":10,
      "groupRowsBy":{
        "name":''
      }
    },
     "_ER":{
      // "apiPath":"/patients-list/get-er-patients",
      "apiPath":"/get-er-patients",
      "payload":{},
      "masterDataForm":[
         {
          "field": "GENDER",
          "label": "Gender",
          "dataType": "string",
          "inputType": "dropdown",
          "data":[]
        },
      ],
      "gridColumnsList": [
        {
          "value": 1,
          "label": "S.No",
          "field": "sno",
          "header": "S.No",
          "dataType": "string",
          "isFilter": false,
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 2,
          "label": "Patient Name",
          "field": "PATIENT_NAME1",
          "header": "Patient Name",
          "dataType": "string",
          "isFilter": true,
          "isColumnResize": true,
          "isSort":true,
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 3,
          "label": "Doctor Name",
          "field": "CONSULTANT",
          "header": "Doctor Name",
          "dataType": "string",
          "isFilter": true,
          "isColumnResize": true,
          "isSort":true,
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 4,
          "label": "Mobile Number",
          "field": "MOBILE_NO",
          "header": "Mobile Number",
          "dataType": "string",
          "isFilter": true,
          "isColumnResize": false,
          "isSort":true,
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 5,
          "label": "Treatment Type",
          "field": "PAT_TYPE",
          "header": "Treatment Type",
          "dataType": "string",
          "isColumnResize": false,
          "isSort":true,
          "style": {
            "width": "50px"
          }
        },
        {
           "value": 6,
          "label": "Admission Number",
          "field": "ADMN_NO",
          "header": "Admission Number",
          "dataType": "string",
          "isColumnResize": true,
          "isSort":true,
          "isFilter": true,
          "style": {
            "width": "50px"
          }
        }
      ],
      "globalSearchKeys":['PATIENT_NAME1','CONSULTANT','MOBILE_NO','PAT_TYPE','ADMN_NO'],
      "isPagedDataSource":false,
      "rowsPerPageOptions":[5, 10, 20],
      "rows":10,
      "showGroupHead":true,
      "groupRowsBy":{
        "name":'CONSULTANT'
      }
    }
  }


  prepairMasterData(masterDataConfig: any, responseData: any) {
    let masterData:any = [];
    // Generate unique code function
    const generateCode = (prefix: string, index: number) => `${prefix}${(index + 1).toString().padStart(3, '0')}`;

    // Process each master
    masterDataConfig.forEach((config:any) => {
      const uniqueValues = Array.from(new Set(responseData.map((d:any) => d[config.field])));
      masterData[config.field] = uniqueValues.map((val, idx) => ({
        code: generateCode(config.field.substring(0, 3).toUpperCase(), idx),
        value: val
      }));
    });
  }
}
