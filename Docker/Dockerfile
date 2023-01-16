FROM node:alpine
ARG type=stage

RUN apk --no-cache add curl

RUN echo Building Docker image

RUN mkdir -p /usr/src/apps/FullStack_FrontEnd

WORKDIR /usr/src/apps/FullStack_FrontEnd

RUN echo $PWD

RUN ls

COPY ./dist/$type .

EXPOSE 3100

# CMD ["cat", "package.json"]

CMD ["npm", "run", "start", "docker"]

# docker build -f Docker/Dockerfile -t mufazzal/fs_front_end:stag --progress=plain --build-arg type=stage .
# docker build -f Docker/Dockerfile -t mufazzal/fs_front_end:prod --build-arg type=prod .
# docker run -it -p 3100:3010 -e mufazzal/fs_front_end:stag
# docker push mufazzal/hellonode:local