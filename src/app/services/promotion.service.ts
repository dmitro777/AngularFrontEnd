import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})

export class PromotionService {

    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }

    getPromotions(): Observable<Promotion[]>
    {
        //Simulating server latency with 2 seconds delay
        //return of(PROMOTIONS).pipe(delay(2000));
        return this.http.get<Promotion[]>(baseURL + 'promotions')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPromotion(id: string): Observable<Promotion> 
    {
        //Simulating server latency with 2 seconds delay
        //return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
        return this.http.get<Promotion>(baseURL + 'promotions/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedPromotion(): Observable<Promotion> 
    {
        //Simulating server latency with 2 seconds delay
        //return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
        return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
        .pipe(map(promotions => promotions[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
