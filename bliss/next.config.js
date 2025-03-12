const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle missing modules
    config.resolve.alias = {
      ...config.resolve.alias,
      "@radix-ui/react-progress": require.resolve("./node_modules/@radix-ui/react-progress"),
      "@radix-ui/react-toast": require.resolve("./node_modules/@radix-ui/react-toast"),
    }

    return config
  },
}

module.exports = nextConfig

