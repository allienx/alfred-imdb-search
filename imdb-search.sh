#!/usr/bin/env bash

query=$(echo "$1" | tr "[:upper:]" "[:lower:]" | sed "s/ /_/g")
first_letter=${query:0:1}

curl --silent \
     --show-error \
     --url "https://v2.sg.media-imdb.com/suggestion/$first_letter/$query.json" \
     --header "Accept: application/json" \
     | ./alfred-imdb-search-jq-v1.6 '.d | map({uid: .id, title: "\(.l) (\(.y))", subtitle: .s, arg: .id }) | { items: . }'
