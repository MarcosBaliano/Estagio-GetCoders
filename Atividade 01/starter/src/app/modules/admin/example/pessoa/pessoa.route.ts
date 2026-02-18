import { Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

export default [
    {
        path     : '',
        component: ListaComponent,
    },
    {
        path     : 'novo',
        component: FormularioComponent,
    }
] as Routes;
