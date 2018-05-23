const Hapi = require('hapi')
const Inert = require('inert');

init  = async function() {
    const Server = new Hapi.Server({
        host: 'localhost',
        port: Number(process.argv[2] || 3000)
    });
    
    await Server.register(Inert);
    
    Server.route({
        path: '/',
        method: 'GET',
        handler: (req, h) => {
            return req.query;
        }
    });
    
    console.log('here___-')

    Server.route({
        method: 'GET',
        path: '/html',
        handler: {
            file: 'index.html'
        }
    });

    Server.route({
        method: ['GET', 'POST', 'PUT'],
        path: '/{name}/{guz}',
        handler: (req, h) => {
            return 'Hello ' + req.params.name + ' ' + req.params.guz;
        }
    });
    
    process.on('unhandledRejection', (err) => {

        console.log(err);
        process.exit(1);
    });

    await Server.start();
}

init();