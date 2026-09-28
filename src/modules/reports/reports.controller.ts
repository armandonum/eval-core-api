import { Controller, Get, Param, Query } from '@nestjs/common'
import { ReportsService } from './services/formal-reports.service'

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // D1) Pre/Post unificado
  @Get('pre-post/:projectId')
  getPrePostReport(
    @Param('projectId') projectId: string,
    @Query('semesterId') semesterId?: string,
  ) {
    return this.reportsService.getPrePostReport(projectId, semesterId)
  }

  // f) Hallazgos por requerimiento
  @Get('findings/by-requirement/:projectId')
  getFindingsByRequirement(@Param('projectId') projectId: string) {
    return this.reportsService.getFindingsByRequirement(projectId)
  }

  // g) Hallazgos por flujo
  @Get('findings/by-flow/:projectId')
  getFindingsByFlow(@Param('projectId') projectId: string) {
    return this.reportsService.getFindingsByFlow(projectId)
  }

  // h) Hallazgos por interfaz
  @Get('findings/by-screen/:projectId')
  getFindingsByScreen(@Param('projectId') projectId: string) {
    return this.reportsService.getFindingsByScreen(projectId)
  }

  // i) Hallazgos por elemento UI
  @Get('findings/by-ui-element/:projectId')
  getFindingsByUiElement(@Param('projectId') projectId: string) {
    return this.reportsService.getFindingsByUiElement(projectId)
  }

  // j) Interacciones críticas
  @Get('critical-interactions/:projectId')
  getCriticalInteractions(
    @Param('projectId') projectId: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.reportsService.getCriticalInteractions(projectId, sessionId)
  }

  // m) Afectivo por tarea
  @Get('affective/by-task/:projectId')
  getAffectiveByTask(@Param('projectId') projectId: string) {
    return this.reportsService.getAffectiveByTask(projectId)
  }

  // n) Sentimientos + hallazgo
  @Get('sentiments-with-findings/:projectId')
  getSentimentsWithFindings(@Param('projectId') projectId: string) {
    return this.reportsService.getSentimentsWithFindings(projectId)
  }

  // m2) Comentarios de expertos
  @Get('expert-comments/:projectId')
  getExpertComments(@Param('projectId') projectId: string) {
    return this.reportsService.getExpertComments(projectId)
  }

  // p) Centralizador
  @Get('centralizer/:projectId')
  getCentralizerReport(
    @Param('projectId') projectId: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.reportsService.getCentralizerReport(projectId, sessionId)
  }

  // Lista de proyectos para el filtro
  @Get('my-projects')
  getMyProjects(@Query('userId') userId: string) {
    return this.reportsService.getMyProjects(userId)
  }
}