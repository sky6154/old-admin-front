FROM nginx:latest
MAINTAINER <sky6154@gmail.com>

COPY ./build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
