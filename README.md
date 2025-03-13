# Proyecto Angular 19 Standalone

Este es un proyecto en **Angular 19** standalone, sin módulos, que gestiona usuarios mediante una API en **Spring WebFlux con R2DBC PostgreSQL**.

## 📌 Requisitos

- **Node.js** (versión recomendada: 18+)
- **Angular CLI** (instalar con `npm install -g @angular/cli`)
- **Backend en Spring WebFlux** en funcionamiento

## 🚀 Instalación

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/AlexsDarn/angular19-crud
   cd proyecto-angular
   ```

2. Instalar dependencias:

   ```sh
   npm install
   ```

3. Configurar las variables de entorno (si aplica).

## ▶️ Ejecución

Para iniciar el servidor de desarrollo:

```sh
ng serve
```

Luego, abre el navegador en `http://localhost:4200/`.

## 🔧 Estructura del Proyecto

```BASH
/src
│── app/
│   ├── core/            # Services, Guards, etc...
│   ├── features/        # Páginas principales, componentes, etc...
│   ├── app.config.ts    # Configuración de la aplicación
│   ├── app.routes.ts    # Definición de rutas
│── assets/              # Recursos estáticos
│── environments/        # Configuración de entornos
```

## 📡 Comunicación con el Backend

El proyecto se conecta con el backend a través de un servicio HTTP en `src/app/core/services/http-provider.service.ts`:

```typescript
getUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.apiUrl}/users`);
}
```

## ✨ Funcionalidades Implementadas

✅ Listar usuarios
✅ Crear usuario
✅ Editar usuario
✅ Eliminar usuario
✅ Manejo de errores

## 📦 Construcción para Producción

Para compilar la aplicación en modo producción:

```sh
ng build --configuration=production
```

## 🛠 Tecnologías Utilizadas

- **Angular 19** (Standalone API)
- **RxJS** para programación reactiva
- **Bootstrap** para estilos
- **Angular Router** para navegación
- **HttpClient** para consumo de API

## 📜 Licencia

MIT License - Proyecto de código abierto.
