#!/bin/bash

# add crontab entry to renew the letsencrypt certificate
# this cron job will run every day 11.00 P.M
certbot renew --quiet --webroot -w /var/www/finflow.cloud/html
