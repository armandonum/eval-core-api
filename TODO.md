# TODO - Swagger en el proyecto

- [ ] Agregar configuración de Swagger en `src/main.ts` (SwaggerModule, DocumentBuilder, ruta `/api/docs`).
- [x] Activar `ApiBearerAuth` para endpoints protegidos con `JwtAuthGuard`.
- [ ] Agregar `@ApiTags` y `@ApiOperation`/`@ApiResponse` básicos en controllers `AuthController`, `UsersController`, `RolesController`.
- [ ] (Opcional) Ajustar decoradores en DTO para mejorar esquemas si hace falta.
- [ ] Probar: levantar servidor y confirmar que `/api/docs` muestra endpoints y modelos.

