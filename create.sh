#!/usr/bin/bash
for i in 1 2 3 4 5
do 
mkdir "v"$i
touch "v"$i/countries_v$i.html
touch "v"$i/script_v$i.js
echo "<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Page de la version$i</title></head><body></body></html>" > "v"$i/countries_v$i.html
done