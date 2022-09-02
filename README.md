# fiapi-profile-proxy
azure web application proxy for the fiapi service endpoints

## getting started (local)

- clone this repo
- make sure you have node.js installed (14 or later)
- install dependencies via ```npm install
- use env.sample to create your own .env file (do not check this into the repo)
- update .env with the correct settings
- start local server via ```npm start run
- anything at localhost:{PORT}/api will be proxied to the FIAPI using the key you specified in .env

## deploying to azure

the main branch of this repo is configured to auto deploy to azure under our utsa resource group
