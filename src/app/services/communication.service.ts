import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Message {
  user: string;
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private internalUrl = 'api/internal-messages';
  private externalUrl = 'api/external-messages';

  constructor(private http: HttpClient) {}

  getInternalMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.internalUrl);
  }

  getExternalMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.externalUrl);
  }

  sendInternalMessage(message: Message): Observable<void> {
    return this.http.post<void>(this.internalUrl, message);
  }

  sendExternalMessage(message: Message): Observable<void> {
    return this.http.post<void>(this.externalUrl, message);
  }
}
