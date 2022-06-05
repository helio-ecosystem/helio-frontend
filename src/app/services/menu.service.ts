import { Injectable } from '@angular/core';
//import jsonMenu from '../../assets/js/menu.data.js';

import { ItemMenuModel } from 'src/app/models/menu/item-menu';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

  //private data = jsonMenu;

  public buildMenu(): ItemMenuModel[] {
    //return this.data;
    return [];
  }

}


