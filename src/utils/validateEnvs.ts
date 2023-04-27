export function validateEnvs<T extends string[]>(...envs: T): { [K in T[number]]: string } {
    const result = {} as { [K in T[number]]: string };

    for (const env of envs) {
        const value = process.env[env];

        if (value === undefined) {
            throw new Error(`the env variable ${env} is not defined`);
        }
        
        result[env as T[number]] = value;
    }

    return result;
}
