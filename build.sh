#!/bin/bash

echo "Deploying JS"

mkdir -p ./site/lib/js/

cp ./node_modules/bootstrap/dist/js/bootstrap.min.js ./site/lib/js/
cp ./node_modules/jquery/dist/jquery.min.js ./site/lib/js/
cp ./node_modules/backbone/backbone-min.js ./site/lib/js/
cp ./node_modules/backbone/backbone-min.map ./site/lib/js/
cp ./node_modules/requirejs/require.js ./site/lib/js/
cp ./node_modules/underscore/underscore-min.js ./site/lib/js/
cp ./node_modules/underscore/underscore-min.map ./site/lib/js/
cp ./node_modules/mustache/mustache.min.map ./site/lib/js/

echo "JS Deployed"

echo "Deploying CSS"

mkdir -p ./site/lib/css/

cp ./node_modules/bootstrap/dist/css/bootstrap.min.css ./site/lib/css/
cp ./node_modules/bootstrap/dist/css/bootstrap.min.css.map ./site/lib/css/
cp ./node_modules/bootstrap/dist/css/bootstrap-theme.min.css ./site/lib/css/
cp ./node_modules/bootstrap/dist/css/bootstrap-theme.min.css.map ./site/lib/css/

echo "CSS Deployed"

echo "Deploying Fonts"

mkdir -p ./site/lib/fonts/

cp ./node_modules/bootstrap/dist/fonts/* ./site/lib/fonts/

echo "Fonts Deployed"