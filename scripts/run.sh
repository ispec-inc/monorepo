#!/bin/bash

docker-compose up -d mysql
docker-compose run dockerize -wait tcp://mysql:3306 -timeout 20s
docker-compose up api
