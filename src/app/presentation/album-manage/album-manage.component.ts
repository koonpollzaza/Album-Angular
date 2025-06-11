import { Component, OnInit } from '@angular/core';
import Album from '../../models/album.model';
import { AlbumService } from '../../domain/services/album.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'album-manage-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-manage.component.html',
  styleUrl: './album-manage.component.css'
})
export class AlbumManageComponent implements OnInit {
  allAlbums: Album[] = [];
  id: number | null = null;
  mode: string = 'view';
  constructor(private albumService: AlbumService) {}

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() { 
  this.albumService.getAll().subscribe(albums => {
    console.log('API result:', albums);
    this.allAlbums = albums;
  });
}

  addAlbum(album: Album) {
    this.albumService.create(album).subscribe(() => this.getAlbums());
  }

  updateAlbum(album: Album) {
  this.albumService.update(album.id, album).subscribe(() => this.getAlbums());
}

  deleteAlbum(id: number) {
    this.albumService.delete(id).subscribe(() => this.getAlbums());
  }
}