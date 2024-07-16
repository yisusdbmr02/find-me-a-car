import { Injectable } from '@angular/core';
    
@Injectable()
export class ProductDefaultService {
    getProductsData() {
        return [
            {
                name: 'FORD Ranger 2.0 Ecob 125kW 4x4 Dob Cabina Limited AT 4p.',
                description: 'Diesel',
                price: 48360,
                category: 'Pick Up',
                status:'INSTOCK',
                img:['0_1.jpg'],
                rating:3
            },
            {
                name: 'CUPRA Leon SP 1.5 eTSI 110kW 150CV DSG 5p.',
                description: 'Híbrido',
                price: 33200,
                category: 'Familiar',
                status:'LOWSTOCK',
                img:['1_1.webp'],
                rating:4
            },
            { 
                name: 'MAZDA MX5 1.5 SKYACTIVG 97kW 132CV PrimeLine',
                description: 'Gasolina',
                price: 29500,
                category: 'Coupe', 
                status:'OUTOFSTOCK',
                img:['2_1.jpg'],
                rating:5

            }
        ]
    }
    getProducts() {
        return Promise.resolve(this.getProductsData());
    }
}