#!/bin/bash

echo "Publishing version, waiting..."

git pull origin dev
standard-version
git push --follow-tags origin dev

sleep 3s