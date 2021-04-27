#!/usr/bin/env bash
#shellcheck disable=SC2039

set -exuo pipefail

function log {
   echo "$(date +"%T") - INFO - $*"
}

[[ -n "${CI_TAG:=}" ]] && { echo "Skip build"; exit 0; }

CI_COMMIT="${SEMAPHORE_GIT_SHA:=local}"
CI_COMMIT="${CI_COMMIT:0:7}"
export CI_COMMIT

lein_path="${HOME}/.lein"
m2_path="${HOME}/.m2"
image_prefix="eu.gcr.io/akvo-lumen/unep-gpml"

mkdir -p "${lein_path}"
mkdir -p "${m2_path}"

dc () {
    docker-compose \
	--ansi never \
	"$@"
}
export -f dc

dci () {
    dc -f docker-compose.yml \
       -f docker-compose.ci.yml "$@"
}
export -f dci

backend_build () {
    docker run \
	   --rm \
	   --volume "$(pwd)/backend:/app" \
	   --workdir /app \
	   borkdude/clj-kondo:2020.12.12 \
	   clj-kondo --lint src --lint test

    dc run \
       --rm \
       backend \
       bash release.sh

    docker build \
	   --tag "${image_prefix}/backend:latest" \
	   --tag "${image_prefix}/backend:${CI_COMMIT}" backend
}

frontend_build () {
    dc run \
       --rm \
       --no-deps \
       frontend \
       bash release.sh

    docker build \
	   --tag "${image_prefix}/frontend:latest" \
	   --tag "${image_prefix}/frontend:${CI_COMMIT}" frontend
}

backend_build > backend.build.txt 2>&1 &

BE_BUILD_PID=$!

frontend_build > client.build.txt 2>&1 &

CLIENT_BUILD_PID=$!

log Waiting for BE build

if wait "$BE_BUILD_PID"; then
  log "BE Build worked. Skipping logs for it"
else
  cat backend.build.txt
  log "BE build failed"
  exit 1
fi

log Waiting for FE build
if wait "$CLIENT_BUILD_PID"; then
  log "Client Build worked. Skipping logs for it"
else
  cat client.build.txt
  log "Client build failed"
  exit 1
fi

dci run -T ci ./basic.sh
