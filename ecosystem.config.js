module.exports = {
    apps: [{
        name: 'cw-server',
        script: 'yarn start',
        watch: false,
        time: true,
        autorestart: true,
    }],
    deploy: {
        production: {
            user: 'cw-deploy',
            host: 'api.city-watch.ca',
            key: 'deploy.key',
            ref: 'origin/master',
            repo: 'https://github.com/ethanelliott/city-watch-server',
            path: '/var/www/production',
            'post-deploy': 'nvm use latest && npm i -g yarn && yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
        }
    }
};
