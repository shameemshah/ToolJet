import { Injectable } from '@nestjs/common';
import { CopilotRequestDto } from '@dto/copilot.dto';
import got from 'got';

type ICopilotOptions = CopilotRequestDto;

@Injectable()
export class CopilotService {
  async getCopilotRecommendations(copilotOptions: ICopilotOptions, userId: string) {
    const { query, context, language } = copilotOptions;

    const response = await got('https://0p94cxsi3g.execute-api.us-west-1.amazonaws.com/Prod/copilot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '34c1fa1a86f8aefb790542c359ad5cdb7530b8696b68e6e5cc0716f1482a1527',
      },
      body: JSON.stringify({
        query: query,
        context: context,
        language: language,
        userId: 'c4a0e6fc-f3a7-40cc-b1d2-adcd32ac16ac',
      }),
    });
    console.log('---LAMBDA API RESPONSE---', {
      body: JSON.parse(response.body),
      status: response.statusCode,
    });

    return {
      data: JSON.parse(response.body),
      status: response.statusCode,
    };
  }

  async addUpdateCopilotAPIKey(apiKey: string, userId: string) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: apiKey, userId: userId, action: 'save' }),
    };

    const response = await fetch('https://0p94cxsi3g.execute-api.us-west-1.amazonaws.com/Prod/api-key', options);
    const { data } = await response.json();

    return {
      data: data,
      status: response.status,
    };
  }

  async getCopilotAPIKey(userId: string) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId, action: 'get' }),
    };

    const response = await fetch('https://0p94cxsi3g.execute-api.us-west-1.amazonaws.com/Prod/api-key', options);
    const { apiKey } = await response.json();

    return {
      data: apiKey,
      status: response.status,
    };
  }
}
