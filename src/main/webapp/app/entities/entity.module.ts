import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tipo-documento',
        loadChildren: () => import('./tipo-documento/tipo-documento.module').then(m => m.ImprentaTipoDocumentoModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ImprentaClienteModule)
      },
      {
        path: 'libro',
        loadChildren: () => import('./libro/libro.module').then(m => m.ImprentaLibroModule)
      },
      {
        path: 'tinta',
        loadChildren: () => import('./tinta/tinta.module').then(m => m.ImprentaTintaModule)
      },
      {
        path: 'tipo-papel',
        loadChildren: () => import('./tipo-papel/tipo-papel.module').then(m => m.ImprentaTipoPapelModule)
      },
      {
        path: 'maquina',
        loadChildren: () => import('./maquina/maquina.module').then(m => m.ImprentaMaquinaModule)
      },
      {
        path: 'tipo-montaje',
        loadChildren: () => import('./tipo-montaje/tipo-montaje.module').then(m => m.ImprentaTipoMontajeModule)
      },
      {
        path: 'tripa-a',
        loadChildren: () => import('./tripa-a/tripa-a.module').then(m => m.ImprentaTripaAModule)
      },
      {
        path: 'tripa-b',
        loadChildren: () => import('./tripa-b/tripa-b.module').then(m => m.ImprentaTripaBModule)
      },
      {
        path: 'portada',
        loadChildren: () => import('./portada/portada.module').then(m => m.ImprentaPortadaModule)
      },
      {
        path: 'otro-formato',
        loadChildren: () => import('./otro-formato/otro-formato.module').then(m => m.ImprentaOtroFormatoModule)
      },
      {
        path: 'mano-obra',
        loadChildren: () => import('./mano-obra/mano-obra.module').then(m => m.ImprentaManoObraModule)
      },
      {
        path: 'costos-indirectos',
        loadChildren: () => import('./costos-indirectos/costos-indirectos.module').then(m => m.ImprentaCostosIndirectosModule)
      },
      {
        path: 'extras',
        loadChildren: () => import('./extras/extras.module').then(m => m.ImprentaExtrasModule)
      },
      {
        path: 'plancha',
        loadChildren: () => import('./plancha/plancha.module').then(m => m.ImprentaPlanchaModule)
      },
      {
        path: 'pelicula',
        loadChildren: () => import('./pelicula/pelicula.module').then(m => m.ImprentaPeliculaModule)
      },
      {
        path: 'papel',
        loadChildren: () => import('./papel/papel.module').then(m => m.ImprentaPapelModule)
      },
      {
        path: 'tinta-otro-formato',
        loadChildren: () => import('./tinta-otro-formato/tinta-otro-formato.module').then(m => m.ImprentaTintaOtroFormatoModule)
      },
      {
        path: 'tinta-portada',
        loadChildren: () => import('./tinta-portada/tinta-portada.module').then(m => m.ImprentaTintaPortadaModule)
      },
      {
        path: 'tinta-tripa-a',
        loadChildren: () => import('./tinta-tripa-a/tinta-tripa-a.module').then(m => m.ImprentaTintaTripaAModule)
      },
      {
        path: 'tinta-tripa-b',
        loadChildren: () => import('./tinta-tripa-b/tinta-tripa-b.module').then(m => m.ImprentaTintaTripaBModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ImprentaEntityModule {}
