#!/bin/bash

sudo docker stop mysql fourth-wall meteor-shower sage-cave shooting-star sage-mountain the-observatory
sudo docker compose -f docker-compose.dev.yaml up -d
