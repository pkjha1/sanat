type EnvVarConfig = {
  default?: string;
};

type EnvVarDefinitions = {
  [key: string]: EnvVarConfig;
};

export function createEnvGuard<T extends EnvVarDefinitions>(definitions: T) {
  const env: Record<string, string> = {};

  for (const [key, config] of Object.entries(definitions)) {
    const value = import.meta.env[key] || config.default;

    if (!value) {
      console.warn(`Missing environment variable: ${key}`);
    }

    env[key] = value || '';
  }

  return env as { [K in keyof T]: string };
}