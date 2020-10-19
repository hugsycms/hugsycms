#!/bin/bash

echo "正在发布版本中，请稍后..."

git pull origin dev
standard-version
git push --follow-tags origin dev

sleep 3s