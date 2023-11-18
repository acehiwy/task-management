import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariables } from 'src/common/interfaces';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { AppController } from './app.controller';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => {
        const validatedConfig = plainToInstance(EnvironmentVariables, config, {
          enableImplicitConversion: true,
        });
        const errors = validateSync(validatedConfig, {
          skipMissingProperties: false,
        });

        if (errors.length > 0) {
          throw new Error(errors.toString());
        }
        return validatedConfig;
      },
      expandVariables: true,
      isGlobal: true,
    }),
    CacheModule.register({
      ttl: 1_800_000, // 30 mins
      isGlobal: true,
    }),
    TasksModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
