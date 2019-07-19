# cqrs event sourcing made in node (incomplete):
exemple of cqrs event sourcing made in node, docker, docker-compose, elasticsearch and message queue

# dependencies:
- docker
- docker-compose

# run:

mkdir ./data
mkdir ./data/elasticseach
chmod g+rwx ./data/elasticseach
docker-compose up


# send message of product

send post to localhost:8081/message