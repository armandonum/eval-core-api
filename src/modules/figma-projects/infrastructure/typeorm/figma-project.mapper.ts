import { FigmaProject } from '../../domain/entities/figma-project.entity';
import { FigmaProjectTypeormEntity } from './figma-project.typeorm.entity';

export class FigmaProjectMapper {

  static toDomain(
    orm: FigmaProjectTypeormEntity,
  ): FigmaProject {

    return new FigmaProject(
      orm.project_id,
      orm.file_key,
      orm.project_name,
      orm.last_modified,
      orm.version,
      orm.thumbnail_url,
      orm.fetched_at,
      orm.raw_json_path,
      orm.created_at,
    );
  }

  static toPersistence(
    domain: FigmaProject,
  ): FigmaProjectTypeormEntity {

    const orm = new FigmaProjectTypeormEntity();

    orm.project_id = domain.projectId;
    orm.file_key = domain.fileKey;
    orm.project_name = domain.projectName;
    orm.last_modified = domain.lastModified;
    orm.version = domain.version;
    orm.thumbnail_url = domain.thumbnailUrl ?? '';
    orm.fetched_at = domain.fetchedAt;
    orm.raw_json_path = domain.rawJsonPath;

    return orm;
  }

  static toDomainList(
    list: FigmaProjectTypeormEntity[],
  ): FigmaProject[] {

    return list.map(this.toDomain);
  }
}