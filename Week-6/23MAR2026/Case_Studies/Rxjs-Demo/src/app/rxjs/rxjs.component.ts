import { Component, OnInit, AfterViewInit, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { of, fromEvent, BehaviorSubject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, mergeMap, filter, every, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent implements OnInit, AfterViewInit {
  readonly clickBtn = viewChild.required<ElementRef>('clickBtn');
  readonly searchBox = viewChild.required<ElementRef>('searchBox');

  observableOutput : any[] = [];
  mapOutput : any[] = [];
  filterOutput : any[] = [];
  multiMapOutput : any[] = [];
  behaviourOutput : any[] = [];
  clickOutput : any[] = [];
  searchOutput : any[] = [];
  mergeMapOutput : any[] = [];

  loading = false;

  constructor(private http: HttpClient) {}


  ngOnInit(): void{
    const observable$ = of(1, 2, 3, 4, 5);

    observable$.subscribe(val => this.observableOutput.push(val));

    observable$.pipe(
        map(x => x * 10)
      ).subscribe(res => this.mapOutput.push(res));

      observable$.pipe(
        map(x => x % 2 === 0 ? x * 100 : null)
      ).subscribe(res => {
        if(res !== null) {
          this.filterOutput.push(res);
        }
      });

      observable$.pipe(
        map(x => x+1),
        map(x => x*1),
        map(x => `Final : ${x}`)
      ).subscribe(res => this.multiMapOutput.push(res));

      of(1, 2, 3).pipe(
        mergeMap(id =>
          this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`)
        )
      ).subscribe(res => {
        this.mergeMapOutput.push(res);
      });
  }
  ngAfterViewInit(): void {
    // Search functionality
    fromEvent(this.searchBox().nativeElement, 'input').pipe(
      debounceTime(500),
      map((event: any) => event.target.value.trim()),
      filter(text => text.length >= 3),
      distinctUntilChanged(),
      switchMap(text => 
        this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?title_like=${text}`).pipe(
          finalize(() => this.loading = false)
        )
      )
    ).subscribe({
      next: (results) => this.searchOutput = results,
      error: (err) => { console.error('Search error:', err); this.searchOutput = []; },
      complete: () => this.loading = false
    });

    // Click button functionality
    fromEvent(this.clickBtn().nativeElement, 'click').subscribe(() => {
      this.clickOutput.push(new Date().toISOString());
    });
  }
}
