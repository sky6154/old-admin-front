#!/bin/sh
{
  docker rmi -f admin-front:latest
}
{
  docker system prune -f
}

docker load < admin-front.tar
