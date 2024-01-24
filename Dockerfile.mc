FROM node:18-alpine AS build

WORKDIR /build

COPY ./mc .

RUN yarn install --frozen-lockfile

RUN npm run build

FROM nginx:latest

COPY --from=build /build/public /usr/share/nginx/html

#copy nginx conf file
COPY ./setup/mc/docker/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
