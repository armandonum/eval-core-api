import { Injectable } from '@nestjs/common';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

import type { FigmaFileStorage } from '../../domain/interfaces/figma-file-storage';

@Injectable()
export class FigmaJsonFileStorageService
  implements FigmaFileStorage
{
  // storage/figma en la raíz del proyecto (relativo al cwd del proceso Node).
  // Si tu server corre desde otro directorio, ajusta este valor o pásalo
  // por config (ConfigService) en vez de dejarlo fijo aquí.
  private readonly baseDir = join(
    process.cwd(),
    'storage',
    'figma',
  );

  async save(
    fileKey: string,
    data: Buffer,
  ): Promise<string> {
    await mkdir(this.baseDir, { recursive: true });

    const fileName = `fig_${fileKey}.json`;
    const absolutePath = join(this.baseDir, fileName);

    // Se escribe el buffer tal cual llegó del frontend, sin volver a
    // serializar. Esto preserva exactamente el contenido que el
    // frontend obtuvo de la API de Figma.
    await writeFile(absolutePath, data);

    // Se persiste la ruta RELATIVA en la base de datos, no la absoluta del disco.
    // Nota: usa un nombre fijo por fileKey, así que subir el archivo de nuevo
    // sobrescribe el .json anterior (no guarda historial de versiones).
    return join('storage', 'figma', fileName);
  }
}