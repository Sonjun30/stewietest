// Simple HTTP server using Bun
const server = Bun.serve({
    port: 8080,
    async fetch(req) {
        const url = new URL(req.url);
        let pathname = url.pathname;

        // Default to index.html for root
        if (pathname === '/') {
            pathname = '/index.html';
        }

        try {
            const file = Bun.file(`/app/website${pathname}`);

            // Check if file exists
            const exists = await file.exists();
            if (!exists) {
                return new Response('404 Not Found', { status: 404 });
            }

            // Set content type based on file extension
            const ext = pathname.split('.').pop();
            const contentTypes = {
                'html': 'text/html',
                'css': 'text/css',
                'js': 'application/javascript',
                'json': 'application/json'
            };

            const contentType = contentTypes[ext] || 'text/plain';

            return new Response(file, {
                headers: {
                    'Content-Type': contentType,
                    'Access-Control-Allow-Origin': '*'
                }
            });
        } catch (error) {
            console.error('Error serving file:', error);
            return new Response('500 Internal Server Error', { status: 500 });
        }
    }
});

console.log(`🌐 Server running at http://localhost:${server.port}`);
console.log(`📁 Serving files from /app/website`);

// Keep the server running
process.on('SIGINT', () => {
    console.log('\n🛑 Server stopped');
    process.exit(0);
});