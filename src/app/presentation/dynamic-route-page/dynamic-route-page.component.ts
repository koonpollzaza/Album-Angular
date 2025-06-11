import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic-route-page',
  imports: [],
  templateUrl: './dynamic-route-page.component.html',
  styleUrl: './dynamic-route-page.component.css'
})
export class DynamicRoutePageComponent {
  routeValue:string|null = ""

  constructor(private route:ActivatedRoute) {}

  ngOnInit(){
    this.routeValue = this.route.snapshot.paramMap.get('route')
  }
}
