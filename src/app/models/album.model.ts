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
    file?: { // เพิ่ม property นี้
        id: number;
        fileName: string;
        filePath: string;
        createBy?: string;
        createDate?: Date;
        updateBy?: string;
        updateDate?: Date;
        isDelete?: boolean;
    };
}