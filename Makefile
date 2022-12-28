PREFECT_DEPLOYMENT_FILE_PATH = "/app/deployment.py"
PREFECT_DOCKER_COMPOSE_FILE_PATH = "/Users/lohyikuang/Downloads/personal_projects/ion/docker/docker-compose.yml"

.PHONY: docker
docker: 
	@echo "Building docker images";
	docker-compose -f $(PREFECT_DOCKER_COMPOSE_FILE_PATH) up -d --force-recreate --no-deps;
	cd docker/ && docker-compose run prefect-server python $(PREFECT_DEPLOYMENT_FILE_PATH)