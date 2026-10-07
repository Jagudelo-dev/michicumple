# michicumple

Carta digital de cumpleaños para Arihanna Michel, construida como aplicación Angular standalone.

## Stack

- Angular 17 y TypeScript estricto
- SCSS y componentes standalone con OnPush
- GSAP para la apertura reversible del sobre
- typed.js para el mensaje de bienvenida
- canvas-confetti para confeti
- Node.js 18.19.1

## Desarrollo local

Usa Node 18.19.1, indicado en `.nvmrc`. Instala dependencias y levanta el servidor:

```bash
npm install
npm start
```

Abre `http://localhost:4200/`.

Para validar localmente con un consumo moderado de memoria:

```bash
NODE_OPTIONS="--max-old-space-size=1024" NG_BUILD_MAX_WORKERS=1 npx ng build --configuration development
```

## Despliegue

Netlify usa `netlify.toml` para instalar Node 18.19.1, ejecutar `npm run build` y publicar `dist/michicumple/browser`. Las rutas de la aplicación se redirigen a `index.html`.