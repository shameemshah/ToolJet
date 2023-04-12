import { Module } from '@nestjs/common';
import { CopilotController } from '@controllers/copilot.controller';
import { CopilotService } from '@services/copilot.service';

@Module({
  controllers: [CopilotController],
  imports: [],
  providers: [CopilotService],
})
export class CopilotModule {}
