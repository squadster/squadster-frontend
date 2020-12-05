#!/bin/bash

yarn run build

echo $GITHUB_TOKEN | docker login -u $GITHUB_USER --password-stdin docker.pkg.github.com
docker build -t docker.pkg.github.com/squadster/squadster-frontend/frontend-release:$RELEASE_VERSION .
docker push docker.pkg.github.com/squadster/squadster-frontend/frontend-release:$RELEASE_VERSION
