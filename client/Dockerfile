FROM node:10.9.0

# create react directory and use it as the workdir
RUN mkdir -p /srv/app/train-ticket-client
WORKDIR  /srv/app/train-ticket-client

COPY package.json  /srv/app/train-ticket-client
COPY package-lock.json  /srv/app/train-ticket-client

RUN npm install

COPY .  /srv/app/train-ticket-client

EXPOSE 3000

CMD ["npm", "start"]