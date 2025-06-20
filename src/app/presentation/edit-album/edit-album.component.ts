import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '../../domain/services/album.service';

interface Song {
  id?: number;
  name: string;
  isDelete?: boolean;
}

interface Album {
  id: number;
  name: string;
  description: string;
  songs: Song[];
  // เพิ่ม property อื่นๆ ถ้าต้องการ เช่น file
}

@Component({
  selector: 'app-edit-album',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-album.component.html',
  styleUrl: './edit-album.component.css'
})
export class EditAlbumComponent implements OnInit {
  albumId!: number;
  album: Album = { id: 0, name: '', description: '', songs: [] };
  newSong = '';
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  loading = true;
  showJson = false;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));
    this.albumService.get(this.albumId).subscribe({
      next: (data: any) => {
        this.album = {
          id: data.id,
          name: data.name,
          description: data.description,
          songs: (data.songs || []).map((s: any) => ({
            id: s.id,
            name: s.name,
            isDelete: s.isDelete || false
          }))
        };
        this.imageUrl = data.file?.filePath
          ? this.albumService.baseURL.replace('/Album', '') + '/' + data.file.filePath
          : null;
        this.loading = false;
      },
      error: () => {
        alert('Album not found');
        this.router.navigate(['/album_manage']);
      }
    });
  }

  addSong() {
    if (this.newSong.trim()) {
      this.album.songs.push({ name: this.newSong.trim(), isDelete: false });
      this.newSong = '';
    }
  }

  removeSong(index: number) {
    this.album.songs[index].isDelete = true;
  }

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    // แสดง preview ภาพใหม่
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  } else {
    this.selectedFile = null;
  }
}

  onSubmit() {
    const formData = new FormData();
    formData.append('Id', this.album.id.toString());
    formData.append('Name', this.album.name);
    formData.append('Description', this.album.description);
    if (this.selectedFile) {
      formData.append('File', this.selectedFile);
    }
    // ส่ง songs ทั้งหมด (รวม isDelete) เป็น JSON string
    formData.append('SongNames', JSON.stringify(this.album.songs));
    this.albumService.update(formData).subscribe({
      next: () => {
        alert('Album updated!');
        this.router.navigate(['/album_manage']);
      },
      error: err => alert('Error: ' + err.message)
    });
  }
}