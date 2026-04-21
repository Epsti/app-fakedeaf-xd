FROM node:24-alpine as build-stage

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
RUN npm install

# Копируем остальные файлы и собираем проект
COPY . .
RUN npm run build

# ЭТАП 2: Раздача статики через Nginx
FROM node:24-alpine as production-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем билд из предыдущего этапа в папку Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]