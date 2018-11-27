FROM cypress/base:8

USER root

RUN npm install -g nodemon

# Export http server port
EXPOSE 8012

# App User
RUN mkdir /app && chown -R node:node /app
USER node

