#!/bin/bash
export $(cat .env | xargs)
prefect orion start &
prefect agent start -q "treasury" "common" &
echo $SUDO_PASSWORD | sudo -S kill -9 $($SUDO_PASSWORD | sudo -S lsof -i:5432 | awk '$8 == "TCP" { print $2 }') &
docker compose -f "Users/lohyikuang/Downloads/personal_projects/ion/docker/docker-compose.base.yml" up &
brew services start rabbitmq 

