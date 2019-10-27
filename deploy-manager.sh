#!/bin/sh
{
  docker service rm admin-front
}
{
  docker rmi -f admin-front:latest
}
{
  docker system prune -f
}

docker load < admin-front.tar
docker service create --name admin-front --replicas 3 --publish 8888:8080 admin-front:latest
