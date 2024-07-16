import { Component } from '@angular/core';
import { ProductDefault } from 'src/app/model/productsdefault';
import { ProductDefaultService } from 'src/app/services/productsdefault.service';

@Component({
  selector: 'app-list-default',
  templateUrl: './list-default.component.html',
  styleUrls: ['./list-default.component.css']
})
export class ListDefaultComponent {
  products: ProductDefault[]=[];

  constructor(private productService: ProductDefaultService) {}


  ngOnInit() {
    this.productService.getProducts()
    .then((data) => {
      this.products = data.slice(0, 3);
    })
    .catch((error) => {
      console.error('Error al obtener los productos:', error);
    });

  }
  
  getSeverity (products: ProductDefault) {
    switch (products.status) {
        case 'INSTOCK':
            return 'success';
            
        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
  }
}
