import {
    Column, 
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn
} from 'typeorm';

import { Entity } from 'typeorm';


@Entity({
    schema: 'usability',
    name: 'figma_connections'
})

export class FigmaConnectionTypeormEntity {

    @PrimaryColumn('uuid')
    connection_id: string;

    @Column()
    user_id: string;

    @Column()
    name: string;

    @Column()
    personal_access_token: string;

    @CreateDateColumn()
    created_at: Date;


}