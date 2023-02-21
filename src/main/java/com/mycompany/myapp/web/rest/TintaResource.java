package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Tinta;
import com.mycompany.myapp.repository.TintaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Tinta}.
 */
@RestController
@RequestMapping("/api")
public class TintaResource {

    private final Logger log = LoggerFactory.getLogger(TintaResource.class);

    private static final String ENTITY_NAME = "tinta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TintaRepository tintaRepository;

    public TintaResource(TintaRepository tintaRepository) {
        this.tintaRepository = tintaRepository;
    }

    /**
     * {@code POST  /tintas} : Create a new tinta.
     *
     * @param tinta the tinta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tinta, or with status {@code 400 (Bad Request)} if the tinta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tintas")
    public ResponseEntity<Tinta> createTinta(@RequestBody Tinta tinta) throws URISyntaxException {
        log.debug("REST request to save Tinta : {}", tinta);
        if (tinta.getId() != null) {
            throw new BadRequestAlertException("A new tinta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tinta result = tintaRepository.save(tinta);
        return ResponseEntity.created(new URI("/api/tintas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tintas} : Updates an existing tinta.
     *
     * @param tinta the tinta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tinta,
     * or with status {@code 400 (Bad Request)} if the tinta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tinta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tintas")
    public ResponseEntity<Tinta> updateTinta(@RequestBody Tinta tinta) throws URISyntaxException {
        log.debug("REST request to update Tinta : {}", tinta);
        if (tinta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tinta result = tintaRepository.save(tinta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tinta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tintas} : get all the tintas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tintas in body.
     */
    @GetMapping("/tintas")
    public List<Tinta> getAllTintas() {
        log.debug("REST request to get all Tintas");
        return tintaRepository.findAll();
    }

    /**
     * {@code GET  /tintas/:id} : get the "id" tinta.
     *
     * @param id the id of the tinta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tinta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tintas/{id}")
    public ResponseEntity<Tinta> getTinta(@PathVariable Long id) {
        log.debug("REST request to get Tinta : {}", id);
        Optional<Tinta> tinta = tintaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tinta);
    }

    /**
     * {@code DELETE  /tintas/:id} : delete the "id" tinta.
     *
     * @param id the id of the tinta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tintas/{id}")
    public ResponseEntity<Void> deleteTinta(@PathVariable Long id) {
        log.debug("REST request to delete Tinta : {}", id);
        tintaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
