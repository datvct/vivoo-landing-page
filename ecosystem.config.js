module.exports = {
  apps: [
    {
      name: "vivoo-frontend",
      script: "server.js",
      instances: "max",        // Use all CPU cores
      exec_mode: "cluster",    // Cluster mode for load balancing
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      // Logging
      out_file: "/app/logs/out.log",
      error_file: "/app/logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
};
