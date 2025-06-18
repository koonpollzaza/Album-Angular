import { Routes } from '@angular/router';
import { AlbumManageComponent } from './presentation/album-manage/album-manage.component';
import { CreateAlbumComponent } from './presentation/create-album/create-album.component';
import { EditAlbumComponent } from './presentation/edit-album/edit-album.component';

export const routes: Routes = [
  { path: 'album_manage', component: AlbumManageComponent },
  { path: 'create-album', component: CreateAlbumComponent },
  { path: '', redirectTo: '/album_manage', pathMatch: 'full' },
  { path: 'edit-album/:id', component: EditAlbumComponent },
];