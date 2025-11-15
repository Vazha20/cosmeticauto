import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { ProductsModule } from './product/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || undefined, // თუ PROD, Render DB URL
      host: process.env.NODE_ENV === 'production' ? undefined : 'localhost',
      port: process.env.NODE_ENV === 'production' ? undefined : 5432,
      username: process.env.NODE_ENV === 'production' ? undefined : 'chupstore',
      password: process.env.NODE_ENV === 'production' ? undefined : 'chup2025',
      database: process.env.NODE_ENV === 'production' ? undefined : 'chupstoredb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      autoLoadEntities: true,
    }),
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
