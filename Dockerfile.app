FROM nginx:alpine

COPY dist/apps/birds-gate-app/browser /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
