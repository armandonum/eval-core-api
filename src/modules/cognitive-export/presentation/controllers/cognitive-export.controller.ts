// presentation/controllers/cognitive-export.controller.ts
import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import { ExportCognitiveEvaluationUseCase } from '../../application/use-cases/export-cognitive-evaluation.use-case';

@ApiTags('Cognitive Export')
@ApiBearerAuth()
@Controller('cognitive-export') 
export class CognitiveExportController {
  constructor(
    private readonly exportUseCase: ExportCognitiveEvaluationUseCase,
  ) {}

  @Get(':evaluationId/excel')
  @ApiOperation({ summary: 'Exportar evaluación a Excel' })
  @ApiResponse({ status: 200, description: 'Archivo Excel generado' })
  async exportExcel(
    @Param('evaluationId') evaluationId: string,
    @Res() res: Response,
  ) {
    const data = await this.exportUseCase.execute(evaluationId);
    
    const workbook = new ExcelJS.Workbook();
    
    // Hoja 1: Resumen
    const summarySheet = workbook.addWorksheet('Resumen', {
      properties: { tabColor: { argb: 'FF4CAF50' } },
    });
    
    // Título
    summarySheet.mergeCells('A1:F1');
    const titleCell = summarySheet.getCell('A1');
    titleCell.value = `Evaluación Cognitiva: ${data.evaluationName}`;
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: 'center' };
    
    // Información general
    let row = 3;
    summarySheet.getCell(`A${row}`).value = 'Información General';
    summarySheet.getCell(`A${row}`).font = { bold: true, size: 14 };
    row += 1;
    
    summarySheet.getCell(`A${row}`).value = 'ID';
    summarySheet.getCell(`B${row}`).value = data.evaluationId;
    row += 1;
    
    summarySheet.getCell(`A${row}`).value = 'Nombre';
    summarySheet.getCell(`B${row}`).value = data.evaluationName;
    row += 1;
    
    summarySheet.getCell(`A${row}`).value = 'Estado';
    summarySheet.getCell(`B${row}`).value = data.evaluationStatus;
    row += 1;
    
    summarySheet.getCell(`A${row}`).value = 'Fecha de exportación';
    summarySheet.getCell(`B${row}`).value = data.exportedAt.toLocaleString();
    row += 2;
    
    // Hoja 2: Respuestas
    const responsesSheet = workbook.addWorksheet('Respuestas', {
      properties: { tabColor: { argb: 'FF2196F3' } },
    });
    
    // Encabezados
    const responseHeaders = [
      'Tarea', 'Evaluador', 'Descripción',
      'Q1: Intentará resultado correcto', 'Q1: Razonamiento',
      'Q2: Notará acción disponible', 'Q2: Razonamiento',
      'Q3: Asociará acción con resultado', 'Q3: Razonamiento',
      'Q4: Verá progreso', 'Q4: Razonamiento',
      'Problema Identificado', 'Sugerencia de Diseño',
      'Otros Comentarios', 'Tiempo (s)', 'Éxito', 'Estado', 'Fecha',
    ];
    
    const headerRow = responsesSheet.addRow(responseHeaders);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1976D2' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    
    // Datos
    for (const response of data.responses) {
      responsesSheet.addRow([
        response.id || 'Sin tarea',
        data.evaluator.name || 'Desconocido',
        response.description || '',
        response.q1.answer || '',
        response.q1.reasoning || '',
        response.q2.answer || '',
        response.q2.reasoning || '',
        response.q3.answer || '',
        response.q3.reasoning || '',
        response.q4.answer || '',
        response.q4.reasoning || '',
        response.problemIdentified || '',
        response.designSuggestion || '',
        response.otherComments || '',
        response.timeSpentSeconds || 0,
        response.success ? 'Sí' : 'No',
        response.status || '',
        response.createdAt?.toLocaleString() || '',
      ]);
    }
    
    // Ajustar columnas
responsesSheet.columns.forEach((column) => {
  const maxLength: number = (column.values ?? []).reduce<number>(
    (max: number, val: ExcelJS.CellValue) => {
      const str = val == null ? '' : String(val);
      return Math.max(max, str.length);
    },
    10,
  );

  column.width = Math.min(maxLength + 2, 50);
});
    
    // Generar archivo
    const buffer = await workbook.xlsx.writeBuffer();
    
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Evaluacion_Cognitiva_${evaluationId}.xlsx`,
    );
    res.send(buffer);
  }

  @Get(':evaluationId/csv')
  @ApiOperation({ summary: 'Exportar evaluación a CSV' })
  @ApiResponse({ status: 200, description: 'Archivo CSV generado' })
  async exportCSV(
    @Param('evaluationId') evaluationId: string,
    @Res() res: Response,
  ) {
    const data = await this.exportUseCase.execute(evaluationId);
    
    let csv = 'Tarea,Evaluador,Q1,Q2,Q3,Q4,Problema,Sugerencia,Éxito\n';
    
    for (const response of data.responses) {
      csv += `"${response.id || ''}","${data.evaluator.name || ''}",`;
      csv += `"${response.q1.answer || ''}","${response.q2.answer || ''}","${response.q3.answer || ''}","${response.q4.answer || ''}",`;
      csv += `"${response.problemIdentified || ''}","${response.designSuggestion || ''}",`;
      csv += `"${response.success ? 'Sí' : 'No'}"\n`;
    }
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Evaluacion_Cognitiva_${evaluationId}.csv`,
    );
    res.send(csv);
  }

  @Get(':evaluationId/json')
  @ApiOperation({ summary: 'Exportar evaluación a JSON' })
  @ApiResponse({ status: 200, description: 'Archivo JSON generado' })
  async exportJSON(
    @Param('evaluationId') evaluationId: string,
    @Res() res: Response,
  ) {
    const data = await this.exportUseCase.execute(evaluationId);
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Evaluacion_Cognitiva_${evaluationId}.json`,
    );
    res.json(data);
  }
}