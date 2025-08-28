#!/bin/bash

yarn install --production

node scripts/sync-contentful.js

yarn generate

exit 0
