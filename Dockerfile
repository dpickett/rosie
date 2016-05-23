FROM node:5-onbuild
EXPOSE 3000

MAINTAINER Dan Pickett <dan.pickett@gmail.com>

ENV INSTALL_PATH /rosie
ENV NODE_ENV production

RUN echo "America/New_York" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH
ENV PATH $PATH:$INSTALL_PATH/node_modules/.bin

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run compile
CMD npm start
