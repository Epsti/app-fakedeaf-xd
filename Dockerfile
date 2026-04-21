FROM node:24-alpine as build-stage

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы и собираем проект
COPY . .
RUN npm run build

# ЭТАП 2: Раздача статики через Nginx
FROM nginx:stable-alpine as production-stage

# Копируем билд из предыдущего этапа в папку Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Экспонируем 80 порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]