FROM node:22-alpine3.22
RUN apk add --no-cache \
    postgresql-client \
    postgresql-dev \
    gcc \
    g++ \
    make \
    cmake \
    libc-dev \
    linux-headers \
    bash \
    git \
    && rm -rf /var/cache/apk/*
WORKDIR /app
COPY ./frontend .
RUN npm install -g pnpm && pnpm install
EXPOSE ${APP_PORT}
COPY ./entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]