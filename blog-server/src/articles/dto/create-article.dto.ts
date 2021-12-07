import { Tag } from 'src/tags/tags.schema';

export class CrerateArticleDto {
  title: string;
  subtitle: string;
  text: string;
  img: string;
  author: string;
  date: Date;
  updateDate: Date;
  tags: Tag[];
}
