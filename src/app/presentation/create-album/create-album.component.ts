import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../domain/services/album.service';

@Component({
  selector: 'app-create-album',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent {
  album = { name: '', description: '' };
  newSong = '';
  songs: string[] = [];
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(private albumService: AlbumService) {}

  addSong() {
    if (this.newSong.trim()) {
      this.songs.push(this.newSong.trim());
      this.newSong = '';
    }
  }

  removeSong(index: number) {
    this.songs.splice(index, 1);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.imageUrl = null;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('Name', this.album.name);
    formData.append('Description', this.album.description);
    if (this.selectedFile) {
      formData.append('File', this.selectedFile);
    }
    this.songs.forEach(song => formData.append('SongNames', song));

    this.albumService.create(formData).subscribe({
      next: () => alert('Album created!'),
      error: err => alert('Error: ' + err.message)
    });
  }
}
