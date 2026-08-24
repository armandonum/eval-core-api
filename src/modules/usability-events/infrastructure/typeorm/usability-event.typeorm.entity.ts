    import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    } from 'typeorm';

    import { UsabilitySessionTypeormEntity } from '../../../usability_sessions/infrastructure/typeorm/usability-session.typeorm.entity'

    @Entity({
    schema: 'usability',
    name: 'usability_events',
    })
    export class UsabilityEventTypeormEntity {

    @PrimaryGeneratedColumn('uuid', {
        name: 'event_id',
    })
    event_id!: string;

    @Column({
        name: 'session_id',
        
        type: 'uuid',
    })
    session_id!: string;

    @ManyToOne(
        () => UsabilitySessionTypeormEntity,
        {
        onDelete: 'CASCADE',
        },
    )
    @JoinColumn({
        name: 'session_id',

        referencedColumnName: 'session_id',
    })
    session!: UsabilitySessionTypeormEntity;

    @Column({
        name: 'event_type',
        type:'varchar',
        length: 100,
    })
    event_type!: string;

    @Column({
        name: 'event_type_normalizado',
        type:'varchar',
        length: 50,
    })
    event_type_normalizado!: string;

    @Column({
        name: 'node_id',
        length: 255,
        type:'varchar',
        nullable: true,
    })
    node_id!: string | null;

    @Column({
        name: 'screen_name',
        type:'varchar',
        length: 255,
        nullable: true,
    })
    screen_name!: string | null;

    @Column({
        name: 'elapsed_minute',
        type: 'integer',
    })
    elapsed_minute!: number;

    @Column({
        name: 'elapsed_second',
        type: 'integer',
    })
    elapsed_second!: number;

    @Column({
        name: 'elapsed_ms_total',
        type: 'integer',
    })
    elapsed_ms_total!: number;

    @Column({
        name: 'timestamp_real',
        type: 'timestamp',
    })
    timestamp_real!: Date;

    @Column({
        name: 'raw_payload',
        type: 'jsonb',
        nullable: true,
    })
    raw_payload!: Record<string, any> | null;

    @CreateDateColumn({
        name: 'created_at',
    })
    created_at!: Date;

    }