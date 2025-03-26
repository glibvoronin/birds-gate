import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform<T>(items: T[], query: string): T[] {
    if (!Array.isArray(items) || !query?.trim()) return items;

    const lower = query.toLowerCase();

    try {
      return items.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(lower)
      );
    } catch {
      return items;
    }
  }
}
