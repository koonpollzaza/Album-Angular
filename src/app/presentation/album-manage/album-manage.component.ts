import { Component, OnInit } from '@angular/core';
import Album from '../../models/album.model';
import { AlbumService } from '../../domain/services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'album-manage-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
      this.allAlbums = albums;
    });
  }

  addAlbum(formData: FormData) {
    this.albumService.create(formData).subscribe(() => this.getAlbums());
  }

  updateAlbum(formData: FormData) {
    this.albumService.update(formData).subscribe(() => this.getAlbums());
  }

  confirmDelete(id: number) {
    if (confirm('คุณต้องการลบอัลบั้มนี้หรือไม่?')) {
      this.deleteAlbum(id);
    }
  }

  deleteAlbum(id: number) {
    this.albumService.delete(id).subscribe(() => this.getAlbums());
  }

  getActiveSongs(songs: any[]) {
    return songs?.filter(song => !song.isDelete);
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return 'https://localhost:7058/' + path.replace(/^\/+/, '');
  }
}