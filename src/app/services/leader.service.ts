import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})

export class LeaderService {

    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }

    getLeaders(): Observable<Leader[]> 
    {
        //Simulating server latency with 2 seconds delay
        //return of(LEADERS).pipe(delay(2000));
        return this.http.get<Leader[]>(baseURL + 'leaders')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getLeader(id: string): Observable<Leader>
    {
        //Simulating server latency with 2 seconds delay
        //return of(LEADERS.filter((Leader) => (Leader.id === id))[0]).pipe(delay(2000));
        return this.http.get<Leader>(baseURL + 'leaders/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedLeader(): Observable<Leader> 
    {
        //Simulating server latency with 2 seconds delay
        //return of(LEADERS.filter((leader) => (leader.featured))[0]).pipe(delay(2000));
        return this.http.get<Leader[]>(baseURL + 'leaders?featured=true')
        .pipe(map(leaders => leaders[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}