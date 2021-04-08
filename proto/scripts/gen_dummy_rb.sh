#!/bin/bash

PROTO_ROOT=./ruby/monorepopb
DUMMY_FILE=_.rb

for dir in $(find ${PROTO_ROOT} -type d); do
  if [ $(ls -1 ${dir} | grep ".*\.rb" | wc -l) -eq 0 ]; then
    echo add $dir/${DUMMY_FILE}
    touch ${dir}/${DUMMY_FILE}
  fi
done
