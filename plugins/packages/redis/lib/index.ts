import { ConnectionTestResult, QueryError, QueryResult, QueryService } from '@tooljet-plugins/common';
import Redis from 'ioredis';
import { SourceOptions, QueryOptions } from './types';

export default class RedisQueryService implements QueryService {
  async run(sourceOptions: SourceOptions, queryOptions: QueryOptions, dataSourceId: string): Promise<QueryResult> {
    let result = {};
    const query = queryOptions.query;

    const client = await this.getConnection(sourceOptions);
    // Solution 1
    // const regex2 = /'([^']*)'|\s+/
    // const splitQuery = query.split(regex2).filter(Boolean);

    try {
      const [command, args] = await this.parseQueryArguments(query);
      console.log('Solution 2 Response -----', 'Command', command, 'Args', args);

      // const splitQuery = query.split(regex2).filter(Boolean);
      // const command = splitQuery[0];
      // const args = splitQuery.length > 0 ? splitQuery.slice(1) : [];

      result = await client.call(command, ...args);
      return { status: 'ok', data: result };
    } catch (err) {
      throw new QueryError('Query could not be completed', err.message, {});
    } finally {
      client.disconnect();
    }
  }

  parseQueryArguments(query: string) {
    // Regular expression pattern to match the desired values
    const regexPattern = /(\b\w+\b)|'([^']*)'|\[(.*?)\]|({.*?})/g;

    // Array to store the parsed values
    const parsedValues = [];

    let match;
    while ((match = regexPattern.exec(query)) !== null) {
      const value = match[1] || match[2] || match[3] || match[4];
      parsedValues.push(value);
    }

    const command = parsedValues.shift() as string;

    return [command, parsedValues];
  }

  // async parseQueryArguments(query: string): Promise<[string, (string | number | Buffer)[]]> {
  //   const args: (string | number | Buffer)[] = [];
  //   // Regex Solution we Found
  //   const regex = /"([^"]+)"|'([^']+)'/g;

  //   let match;
  //   let lastIndex = 0;

  //   while ((match = regex.exec(query)) !== null) {
  //     const arg = match[1] || match[2]; // Use the captured group without quotes

  //     const prefix = query.slice(lastIndex, match.index).trim();
  //     if (prefix) {
  //       const prefixArgs = prefix.split(' ');
  //       args.push(...prefixArgs);
  //     }
  //     args.push(arg);
  //     lastIndex = regex.lastIndex;
  //   }

  //   args.push(...query.slice(lastIndex).trim().split(' ').filter(Boolean));
  //   // const remainingArgs = query.slice(lastIndex).trim().split(' ');
  //   const command = args.shift() as string;

  //   return [command, args];
  // }

  async testConnection(sourceOptions: SourceOptions): Promise<ConnectionTestResult> {
    const client = await this.getConnection(sourceOptions);
    await client.ping();

    return {
      status: 'ok',
    };
  }

  async getConnection(sourceOptions: SourceOptions): Promise<any> {
    const username = sourceOptions.username;
    const host = sourceOptions.host;
    const password = sourceOptions.password;
    const port = sourceOptions.port;

    const client = new Redis(port, host, { maxRetriesPerRequest: 1, username, password });
    return client;
  }
}
