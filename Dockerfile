FROM node:8

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y libzmq3-dev

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production\

ARG MQTTCLIENTPASS='sHalLnoTpaSS'
ARG OTPURL='https://api.dev.peatus.ee/routing/v1/routers/estonia/index/graphql'

#overrun when running docker package (-e)
ENV \
    OTPURL=${OPTURL}\
    MQTTCLIENTURL='mqtt://localhost:1883'\
    MQTTCLIENTUSER='publisher'\
    MQTTCLIENTPASS=${MQTTCLIENTPASS}


# Bundle app source
COPY . .

CMD npm start -- $MQTTCLIENTURL $MQTTCLIENTUSER $MQTTCLIENTPASS $OTPURL
