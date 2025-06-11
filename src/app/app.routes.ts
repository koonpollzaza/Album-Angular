import { Routes } from '@angular/router';
import { HomeComponent } from './presentation/home/home.component';
import { AlbumManageComponent } from './presentation/album-manage/album-manage.component';
import { DynamicRoutePageComponent } from './presentation/dynamic-route-page/dynamic-route-page.component';

export const routes: Routes = [
    {path: 'home',component: HomeComponent},
    {path: 'dynamic_route/:route',component: DynamicRoutePageComponent},
    
    {path: 'album_manage',component: AlbumManageComponent},
    {path: 'album_manage/:id',component: AlbumManageComponent}
];
