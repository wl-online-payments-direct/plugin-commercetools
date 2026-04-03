FROM node:18-alpine AS server

ENV NODE_ENV development

RUN apk --update --no-cache add curl

WORKDIR /app

COPY ./mc .

RUN yarn install --frozen-lockfile

EXPOSE 3001
CMD ["npm", "start"]