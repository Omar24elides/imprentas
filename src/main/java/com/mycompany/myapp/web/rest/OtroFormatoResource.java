package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.OtroFormato;
import com.mycompany.myapp.repository.OtroFormatoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.OtroFormato}.
 */
@RestController
@RequestMapping("/api")
public class OtroFormatoResource {

    private final Logger log = LoggerFactory.getLogger(OtroFormatoResource.class);

    private static final String ENTITY_NAME = "otroFormato";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OtroFormatoRepository otroFormatoRepository;

    public OtroFormatoResource(OtroFormatoRepository otroFormatoRepository) {
        this.otroFormatoRepository = otroFormatoRepository;
    }

    /**
     * {@code POST  /otro-formatoes} : Create a new otroFormato.
     *
     * @param otroFormato the otroFormato to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new otroFormato, or with status {@code 400 (Bad Request)} if the otroFormato has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/otro-formatoes")
    public ResponseEntity<OtroFormato> createOtroFormato(@RequestBody OtroFormato otroFormato) throws URISyntaxException {
        log.debug("REST request to save OtroFormato : {}", otroFormato);
        if (otroFormato.getId() != null) {
            throw new BadRequestAlertException("A new otroFormato cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OtroFormato result = otroFormatoRepository.save(otroFormato);
        return ResponseEntity.created(new URI("/api/otro-formatoes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /otro-formatoes} : Updates an existing otroFormato.
     *
     * @param otroFormato the otroFormato to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated otroFormato,
     * or with status {@code 400 (Bad Request)} if the otroFormato is not valid,
     * or with status {@code 500 (Internal Server Error)} if the otroFormato couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/otro-formatoes")
    public ResponseEntity<OtroFormato> updateOtroFormato(@RequestBody OtroFormato otroFormato) throws URISyntaxException {
        log.debug("REST request to update OtroFormato : {}", otroFormato);
        if (otroFormato.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OtroFormato result = otroFormatoRepository.save(otroFormato);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, otroFormato.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /otro-formatoes} : get all the otroFormatoes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of otroFormatoes in body.
     */
    @GetMapping("/otro-formatoes")
    public List<OtroFormato> getAllOtroFormatoes() {
        log.debug("REST request to get all OtroFormatoes");
        return otroFormatoRepository.findAll();
    }

    /**
     * {@code GET  /otro-formatoes/:id} : get the "id" otroFormato.
     *
     * @param id the id of the otroFormato to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the otroFormato, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/otro-formatoes/{id}")
    public ResponseEntity<OtroFormato> getOtroFormato(@PathVariable Long id) {
        log.debug("REST request to get OtroFormato : {}", id);
        Optional<OtroFormato> otroFormato = otroFormatoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(otroFormato);
    }

    /**
     * {@code DELETE  /otro-formatoes/:id} : delete the "id" otroFormato.
     *
     * @param id the id of the otroFormato to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/otro-formatoes/{id}")
    public ResponseEntity<Void> deleteOtroFormato(@PathVariable Long id) {
        log.debug("REST request to delete OtroFormato : {}", id);
        otroFormatoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
