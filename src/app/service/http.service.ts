import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };


  constructor(private http: HttpClient) { }

  addData(collectionName: string, payload: Object): Observable<any> {
    console.log(payload, "serivce")
    let data = this.http.post(
      `${environment.baseUrl}${collectionName}`,
      payload,
    );


    console.log("data", data)
    return data
  }

  getData(collectionName: string, input?: any): Observable<any> {
    console.log(input, "okok")
    let url = `${environment.baseUrl}${collectionName}`;
    if (input) {
      url += `?name=${input}`;
    }
    let data = this.http.get(url);
    return data;
  }


  downloadData(collectionName: string, input?: any) {
    let url = `${environment.baseUrl}${collectionName}`;
    if (input) {
      url += `?name=${input}`;
    }

    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });

    this.http.get(url, { headers, responseType: 'blob' }).subscribe(
      (res) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${input || 'download'}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Download error:', error);
      }
    );
  }

  updateData(collectionName: string, payload: Object): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}${collectionName}`,
      payload,
      this.httpOptions
    );
  }

  deleteData(collectionName: string, id: string): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}${collectionName}?userId=${id}`,
      this.httpOptions
    );
  }
}
