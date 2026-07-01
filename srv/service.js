module.exports = srv => {
  srv.on('ping', () => {
    return 'pong from CAP backend';
  });

  srv.on('triggerIntegration', async () => {
    try {
      const response = await executeHttpRequest(
        { destinationName: 'RPT_INTEGRATION_SUITE' },
        {
          method: 'GET',
          url: '/http/erp-product-details/batch-request'
        }
      );

      return typeof response.data === 'string'
        ? response.data
        : JSON.stringify(response.data);

    } catch (error) {
      return `Integration Suite Fehler: ${error.message}`;
    }
  });
};
