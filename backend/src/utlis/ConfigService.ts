import 'dotenv/config';

class ConfigService {
  get<T = string>(key: string): T {
    const value = process.env[key];

    if (value === undefined) {
      throw new Error(`Key ${key} is not present in env files`);
    }

    return process.env[key] as T;
  }
}

export const configService = new ConfigService();
