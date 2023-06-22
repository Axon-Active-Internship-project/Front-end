# Node
FROM node:16-alpine
WORKDIR .
COPY ["package.json", "package-lock.json","./"]
RUN yarn
COPY ..
CMD ["yarn", "run", "dev"]

# Nginx
FROM nginx:1.21.0-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
