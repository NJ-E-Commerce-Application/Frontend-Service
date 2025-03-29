import {Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AddProductComponent} from "./pages/add-produts/add-product.component";
import {GetInventoryComponent} from "./pages/get-inventory/get-inventory.component";

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'add-product', component: AddProductComponent},
  {path:'get-inventry', component: GetInventoryComponent}
];