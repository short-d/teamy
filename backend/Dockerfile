FROM golang:1.13.1-alpine AS builder

WORKDIR /teamy

RUN apk add --no-cache git bash

# Install dependencies
COPY go.mod go.sum ./
RUN go mod download

# Verify dependencies
RUN go mod verify

COPY . .

RUN go build -o build/app main.go

FROM alpine:3.10

WORKDIR /teamy

RUN apk add --no-cache bash

COPY --from=builder /teamy/build/app ./build/app
COPY --from=builder /teamy/app/adapter/gqlapi/schema.graphql ./app/adapter/gqlapi/schema.graphql