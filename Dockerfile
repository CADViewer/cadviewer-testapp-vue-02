# CADViewer Vue 3 sample - static build served by nginx (Coolify build pack: Dockerfile).
# VITE_* values are read by Vite at build time.

FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

ARG VITE_SERVER_BACKEND_URL=http://localhost:3000
ARG VITE_SERVER_SUB_FOLDER=
ARG VITE_INIT_FILE_NAME=
ENV VITE_SERVER_BACKEND_URL=$VITE_SERVER_BACKEND_URL \
    VITE_SERVER_SUB_FOLDER=$VITE_SERVER_SUB_FOLDER \
    VITE_INIT_FILE_NAME=$VITE_INIT_FILE_NAME

COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
