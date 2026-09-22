import { FigmaConnection } from "../../domain/entities/figma-connection.entitie";
import { FigmaConnectionTypeormEntity } from "./figma-connection.typeorm.entity";

export class FigmaConnectionMapper {

    static toDomain(orm: FigmaConnectionTypeormEntity): FigmaConnection {
        return new FigmaConnection(
            orm.connection_id,
            orm.user_id,
            orm.name,
            orm.personal_access_token,
            orm.created_at,
        );
    }

    static toPersistence(domain: FigmaConnection): FigmaConnectionTypeormEntity {
        const orm = new FigmaConnectionTypeormEntity();
        orm.connection_id = domain.connectionId;
        orm.user_id = domain.userId;
        orm.name = domain.name;
        orm.personal_access_token = domain.personalAccessToken;
        orm.created_at = domain.createdAt;
        return orm;
    }

    static toDomainList(ormList: FigmaConnectionTypeormEntity[]): FigmaConnection[] {
        return ormList.map(this.toDomain);
    }
}