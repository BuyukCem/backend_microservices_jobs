FROM node:16-alpine
WORKDIR /usr/src/app
COPY --chown=node:node .env /usr/src/app/.env
COPY --chown=node:node build /usr/src/app/build
COPY --chown=node:node package-lock.json /usr/src/app/package-lock.json
COPY --chown=node:node package.json /usr/src/app/package.json
RUN npm install
ENV NODE_ENV=production
USER node
CMD ["node", "./build/bin/www"]
