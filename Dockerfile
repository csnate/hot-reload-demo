FROM node:12-alpine as base

WORKDIR /var/build

#---------- PRE-REQS ----------
FROM base as prereq

COPY package*.json .npmrc package-scripts.js ./
COPY client/package*.json client/.npmrc client/package-scripts.js client/ts*.json client/angular.json client/
COPY server/package*.json server/.npmrc server/package-scripts.js server/ts*.json server/

RUN npm install --quiet --unsafe-perm --no-progress --only=production

#---------- DEVELOPMENT ----------
FROM prereq as development

RUN npm install --quiet --unsafe-perm --no-progress --only=development

## All files will be volume mounted into this container

EXPOSE 6543
EXPOSE 8100
EXPOSE 9229

#---------- BUILD ----------
FROM development as build

COPY . .

RUN npm run build

#---------- TEST ----------
FROM build as test

#---------- PRODUCTION ----------
FROM node:12-alpine as production

WORKDIR /var/build

COPY --from=prereq /var/build/server/node_modules/ node_modules
COPY --from=build /var/build/package.json ./
COPY --from=build /var/build/server/config/ config
COPY --from=build /var/build/server/dist/ dist
COPY --from=build /var/build/server/client-dist/ client-dist

CMD [ "node", "-r", "module-alias/register", "dist/server/src/server.js" ]

EXPOSE 8100