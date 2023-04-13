import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../src/modules/auth/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CopilotRequestDto, AddUpdateCopilitAPIKeyDto } from '@dto/copilot.dto';
import { CopilotService } from '@services/copilot.service';

@Controller('copilot')
export class CopilotController {
  constructor(private copilotService: CopilotService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async getRecomendations(@User() user, @Body() body: CopilotRequestDto) {
    const userId = user.id;
    return await this.copilotService.getCopilotRecommendations(body, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('api-key')
  async addUpdateCopilotAPIKey(@User() user, @Body() body: AddUpdateCopilitAPIKeyDto) {
    const { key } = body;
    const userId = user.id;
    return await this.copilotService.addUpdateCopilotAPIKey(key, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('api-key')
  async getCopilotAPIKey(@User() user) {
    return await this.copilotService.getCopilotAPIKey(user.id);
  }
}
