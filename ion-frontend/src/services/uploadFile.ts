import { dataIngestionRequest } from './request';

export default class FileUploadService {
    upload(file: string | Blob, onUploadProgress: any) {
        let formData: FormData = new FormData();
        formData.append('file', file);
        return dataIngestionRequest.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
        });
    }
}
