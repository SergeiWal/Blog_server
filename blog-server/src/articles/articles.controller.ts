import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/role.decotator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ArticlesService } from './articles.service';
import { CrerateArticleDto } from './dto/create-article.dto';

@ApiTags('articles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  findAll(@Request() req) {
    return this.articleService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CrerateArticleDto })
  @Roles(Role.USER)
  create(@Body() crerateArticleDto: CrerateArticleDto) {
    return this.articleService.create(crerateArticleDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return await this.articleService.delete(id);
  }
}
