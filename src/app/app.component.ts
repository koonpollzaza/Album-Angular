import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // เพิ่ม Router ตรงนี้
import { HomeComponent } from "./presentation/home/home.component";

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'Album-Angular';
  
  goToAlbum() {
    this.router.navigate(['/album_manage']);
  }
  goToCreateAlbum() {
    this.router.navigate(['/create-album']);
  }
}