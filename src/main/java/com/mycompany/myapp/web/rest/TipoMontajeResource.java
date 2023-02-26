package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TipoMontaje;
import com.mycompany.myapp.repository.TipoMontajeRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.TipoMontaje}.
 */
@RestController
@RequestMapping("/api")
public class TipoMontajeResource {

    private final Logger log = LoggerFactory.getLogger(TipoMontajeResource.class);

    private static final String ENTITY_NAME = "tipoMontaje";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoMontajeRepository tipoMontajeRepository;

    public TipoMontajeResource(TipoMontajeRepository tipoMontajeRepository) {
        this.tipoMontajeRepository = tipoMontajeRepository;
    }

    /**
     * {@code POST  /tipo-montajes} : Create a new tipoMontaje.
     *
     * @param tipoMontaje the tipoMontaje to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoMontaje, or with status {@code 400 (Bad Request)} if the tipoMontaje has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-montajes")
    public ResponseEntity<TipoMontaje> createTipoMontaje(@RequestBody TipoMontaje tipoMontaje) throws URISyntaxException {
        log.debug("REST request to save TipoMontaje : {}", tipoMontaje);
        if (tipoMontaje.getId() != null) {
            throw new BadRequestAlertException("A new tipoMontaje cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoMontaje result = tipoMontajeRepository.save(tipoMontaje);
        return ResponseEntity.created(new URI("/api/tipo-montajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-montajes} : Updates an existing tipoMontaje.
     *
     * @param tipoMontaje the tipoMontaje to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoMontaje,
     * or with status {@code 400 (Bad Request)} if the tipoMontaje is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoMontaje couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-montajes")
    public ResponseEntity<TipoMontaje> updateTipoMontaje(@RequestBody TipoMontaje tipoMontaje) throws URISyntaxException {
        log.debug("REST request to update TipoMontaje : {}", tipoMontaje);
        if (tipoMontaje.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoMontaje result = tipoMontajeRepository.save(tipoMontaje);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoMontaje.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-montajes} : get all the tipoMontajes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoMontajes in body.
     */
    @GetMapping("/tipo-montajes")
    public List<TipoMontaje> getAllTipoMontajes() {
        log.debug("REST request to get all TipoMontajes");
        return tipoMontajeRepository.findAll();
    }

    /**
     * {@code GET  /tipo-montajes/:id} : get the "id" tipoMontaje.
     *
     * @param id the id of the tipoMontaje to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoMontaje, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-montajes/{id}")
    public ResponseEntity<TipoMontaje> getTipoMontaje(@PathVariable Long id) {
        log.debug("REST request to get TipoMontaje : {}", id);
        Optional<TipoMontaje> tipoMontaje = tipoMontajeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoMontaje);
    }

    /**
     * {@code DELETE  /tipo-montajes/:id} : delete the "id" tipoMontaje.
     *
     * @param id the id of the tipoMontaje to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-montajes/{id}")
    public ResponseEntity<Void> deleteTipoMontaje(@PathVariable Long id) {
        log.debug("REST request to delete TipoMontaje : {}", id);
        tipoMontajeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
