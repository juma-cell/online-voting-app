# #!/usr/bin/env bash
# # exit on error
# set -o errexit

# # Build commands for front end to create the production build
# rm -rf public
# npm install --prefix client && npm run build --prefix client
# cp -a client/build/. public/

# # Build commands for back end
# gem install bundler
# bundle install
# bundle exec rails db:migrate 
# bundle exec rails db:seed # if you have seed data, run this command for the initial deploy only to avoid duplicate records

#!/bin/bash
# exit on error
set -o errexit

# Navigate to the client directory
cd client

# Install dependencies and build the front-end
npm install
npm run build

# Navigate back to the root directory
cd ..

# Build commands for back end
# Use the full path to the bundle command (replace '/path/to/bundle' with the actual path)
sudo gem install bundler
bundle install
bundle exec rake db:migrate
bundle exec rake db:seed