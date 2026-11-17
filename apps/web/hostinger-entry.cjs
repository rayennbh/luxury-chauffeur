(async () => {
	try {
		await import('./server.ts');
	} catch (error) {
		console.error('[hostinger] server startup failed', error);
		process.exit(1);
	}
})();