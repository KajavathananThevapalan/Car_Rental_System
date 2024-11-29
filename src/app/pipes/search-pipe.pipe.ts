import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../services/admin-service.service';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: Brand[], ...args: string[]): Brand[] {
    const searchInput = args[0];

    return value.filter(a => a.name.toLowerCase().includes(searchInput.toLowerCase())
      // || a.brandId.toLowerCase().includes(searchInput.toLowerCase())
    )
  }
}
