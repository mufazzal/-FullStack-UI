FROM node:alpine
ARG type=stage

# RUN apk --no-cache add curl

RUN echo Building Docker image

RUN mkdir -p /usr/src/apps/FullStack_FrontEnd

WORKDIR /usr/src/apps/FullStack_FrontEnd

COPY ./dist/$type .

RUN echo cotent in $PWD
RUN ls

EXPOSE 3100

# CMD ["cat", "package.json"]

CMD ["npm", "run", "start", "docker"]

# docker build -f Docker/Dockerfile -t mufazzal/fs_front_end:stage --progress=plain --build-arg type=stage .
# docker build -f Docker/Dockerfile -t mufazzal/fs_front_end:prod --progress=plain --build-arg type=prod .
# docker run -it -p 3100:3100 -e mufazzal/fs_front_end:stage
# docker push mufazzal/hellonode:local