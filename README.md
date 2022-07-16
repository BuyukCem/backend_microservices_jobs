# backend_microservices

## Cloning the repository
Clone this project into your working directory. We recommend always running the master branch as it was frequent contributions.
```
$ git clone git@gitlab.com:pa-esgi/backend_microservices.git
Cloning into 'BackSocialCosplay'
remote: Enumerating objects: 1123, done.
remote: Counting objects: 100% (1123/1123), done.
remote: Compressing objects: 100% (690/690), done.
remote: Total 1123 (delta 719), reused 774 (delta 403), pack-reused 0
Receiving objects: 100% (1123/1123), 562.67 Kio | 3.88 Mio/s, done.
Resolving deltas: 100% (719/719), done.**
```

## Start project with Docker
```
docker-compose up --build
```
## Run Company service test
```
docker-compose exec company-micro-service npm run test
docker-compose exec user-micro-service npm run test
```

## Create your gitlab runner
```
# Download the binary for your system
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

# Give it permissions to execute
sudo chmod +x /usr/local/bin/gitlab-runner

# Create a GitLab CI user
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash

# Install and run as service
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
sudo gitlab-runner start

$ gitlab-runner register --non-interactive \
  --url "$GITLAB_INSTANCE/" \
  --name $RUNNER_NAME \
  --registration-token $TOKEN \
  --executor "docker" \
  --docker-image "alpine:latest" \

$ gitlab-runner verify
```

# Create kubernetes resources
```
kubectl create ns production
kubectl apply -k ./deploy
```
