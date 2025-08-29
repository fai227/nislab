#!/bin/bash

yarn install --production

NODE_OPTIONS="--max-old-space-size=4096" yarn generate

exit 0
