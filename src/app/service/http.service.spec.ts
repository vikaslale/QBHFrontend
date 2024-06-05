import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'console';
import { environment } from 'src/environments/environment';

describe('HttpService', () => {
  let service: HttpService;
  let http: HttpClientTestingModule;
  let httpController: HttpTestingController;
  let baseUrl = environment.baseUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
    http = TestBed.inject(HttpClientTestingModule);
    httpController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpController.verify()
  })

  it('should be created', () => {
    // expect(service).toBeTruthy();
    expect(service).toBeDefined();
  });

  it('add method test', () => {
    let result = true;
    let collection = 'user'
    let payload = {
      name: 'Shubh',
      email: 'Shubh@yopmail.com'
    }

    service.addData(collection, payload).subscribe((response) => expect(response).toEqual(result));

    const req = httpController.expectOne(`${baseUrl}user`);

    expect(req.request.method).toEqual('POST')

    req.flush(result)
  })


  it('update method test', () => {
    let result = true;
    let collection = 'user'
    let payload = {
      name: 'Shubh',
      email: 'Shubh@yopmail.com'
    }

    service.updateData(collection, payload).subscribe((response) => expect(response).toEqual(result));

    const req = httpController.expectOne(`${baseUrl}user`);

    expect(req.request.method).toEqual('PUT')

    req.flush(result)
  })

  it('delete method test', () => {
    let result = true;
    let collection = 'user'
    let id = 'errr3444'

    service.deleteData(collection, id).subscribe((response) => expect(response).toEqual(result));

    const req = httpController.expectOne(`${baseUrl}user/errr3444`);

    expect(req.request.method).toEqual('DELETE')

    req.flush(result)
  })

  //Failer Scenario

  it('add method test', () => {
    let result = 'Internal Server Error!!';
    let collection = 'user'
    let payload = {
      name: 'Shubh',
      email: 'Shubh@yopmail.com'
    }

    service.addData(collection, payload).subscribe({
      next: res => { fail('Test Case Should have failed with 500') }, error: (e: HttpErrorResponse) => {
        expect(e.status).toEqual(500);
        expect(e.error).toEqual(result)
      }
    });

    const req = httpController.expectOne(`${baseUrl}user`);

    expect(req.request.method).toEqual('POST')

    req.flush(result, {status: 500, statusText: 'Server Error'})
  })

});
