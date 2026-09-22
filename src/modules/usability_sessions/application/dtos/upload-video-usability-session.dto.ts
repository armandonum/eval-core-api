import { 
    IsEnum,
    IsString
} from 'class-validator';

export class UploadVideoDto {

    @IsString()
    session_id: string;

    @IsEnum(['screen', 'face'])
    video_type: 'screen' | 'face';

}