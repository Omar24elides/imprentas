package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Extras;
import com.mycompany.myapp.repository.ExtrasRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Extras}.
 */
@RestController
@RequestMapping("/api")
public class ExtrasResource {

    private final Logger log = LoggerFactory.getLogger(ExtrasResource.class);

    private static final String ENTITY_NAME = "extras";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtrasRepository extrasRepository;

    public ExtrasResource(ExtrasRepository extrasRepository) {
        this.extrasRepository = extrasRepository;
    }

    /**
     * {@code POST  /extras} : Create a new extras.
     *
     * @param extras the extras to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extras, or with status {@code 400 (Bad Request)} if the extras has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extras")
    public ResponseEntity<Extras> createExtras(@RequestBody Extras extras) throws URISyntaxException {
        log.debug("REST request to save Extras : {}", extras);
        if (extras.getId() != null) {
            throw new BadRequestAlertException("A new extras cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Extras result = extrasRepository.save(extras);
        return ResponseEntity.created(new URI("/api/extras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extras} : Updates an existing extras.
     *
     * @param extras the extras to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extras,
     * or with status {@code 400 (Bad Request)} if the extras is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extras couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extras")
    public ResponseEntity<Extras> updateExtras(@RequestBody Extras extras) throws URISyntaxException {
        log.debug("REST request to update Extras : {}", extras);
        if (extras.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Extras result = extrasRepository.save(extras);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, extras.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /extras} : get all the extras.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extras in body.
     */
    @GetMapping("/extras")
    public List<Extras> getAllExtras() {
        log.debug("REST request to get all Extras");
        return extrasRepository.findAll();
    }

    /**
     * {@code GET  /extras/:id} : get the "id" extras.
     *
     * @param id the id of the extras to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extras, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extras/{id}")
    public ResponseEntity<Extras> getExtras(@PathVariable Long id) {
        log.debug("REST request to get Extras : {}", id);
        Optional<Extras> extras = extrasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(extras);
    }

    /**
     * {@code DELETE  /extras/:id} : delete the "id" extras.
     *
     * @param id the id of the extras to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extras/{id}")
    public ResponseEntity<Void> deleteExtras(@PathVariable Long id) {
        log.debug("REST request to delete Extras : {}", id);
        extrasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
