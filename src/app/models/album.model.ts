import { Injectable } from '@angular/core';     
export default class Album {
    id = 0;
    name = "";
    fileId?: number;
    description = "";
    createBy?: string;
    createDate?: Date;
    updateBy?: string;
    updateDate?: Date;
    isDelete?: boolean;
    songs: any[] = [];
    file?: {
        id: number;
        fileName: string;
        filePath: string;
        createBy?: string;
        createDate?: Date;
        updateBy?: string;
        updateDate?: Date;
        isDelete?: boolean;
    };

    get songNames(): string {
        return this.songs && this.songs.length
            ? this.songs.map(song => song.name).join(', ')
            : '-';
    }
}