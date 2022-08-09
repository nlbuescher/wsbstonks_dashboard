#!/bin/bash
docker build -t wsbstonks_dashboard .
docker run -d -p 8084:3000 --network=proxy --ip="172.23.0.4" -v /mnt/user/mycontainers/wsbstonks/dashboard:/src --name wsbstonks_dashboard wsbstonks_dashboard
