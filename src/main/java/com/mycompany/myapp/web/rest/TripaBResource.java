package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TripaB;
import com.mycompany.myapp.repository.TripaBRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.TripaB}.
 */
@RestController
@RequestMapping("/api")
public class TripaBResource {

    private final Logger log = LoggerFactory.getLogger(TripaBResource.class);

    private static final String ENTITY_NAME = "tripaB";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TripaBRepository tripaBRepository;

    public TripaBResource(TripaBRepository tripaBRepository) {
        this.tripaBRepository = tripaBRepository;
    }

    /**
     * {@code POST  /tripa-bs} : Create a new tripaB.
     *
     * @param tripaB the tripaB to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tripaB, or with status {@code 400 (Bad Request)} if the tripaB has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tripa-bs")
    public ResponseEntity<TripaB> createTripaB(@RequestBody TripaB tripaB) throws URISyntaxException {
        log.debug("REST request to save TripaB : {}", tripaB);
        if (tripaB.getId() != null) {
            throw new BadRequestAlertException("A new tripaB cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TripaB result = tripaBRepository.save(tripaB);
        return ResponseEntity.created(new URI("/api/tripa-bs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tripa-bs} : Updates an existing tripaB.
     *
     * @param tripaB the tripaB to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tripaB,
     * or with status {@code 400 (Bad Request)} if the tripaB is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tripaB couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tripa-bs")
    public ResponseEntity<TripaB> updateTripaB(@RequestBody TripaB tripaB) throws URISyntaxException {
        log.debug("REST request to update TripaB : {}", tripaB);
        if (tripaB.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TripaB result = tripaBRepository.save(tripaB);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tripaB.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tripa-bs} : get all the tripaBS.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tripaBS in body.
     */
    @GetMapping("/tripa-bs")
    public List<TripaB> getAllTripaBS() {
        log.debug("REST request to get all TripaBS");
        return tripaBRepository.findAll();
    }

    /**
     * {@code GET  /tripa-bs/:id} : get the "id" tripaB.
     *
     * @param id the id of the tripaB to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tripaB, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tripa-bs/{id}")
    public ResponseEntity<TripaB> getTripaB(@PathVariable Long id) {
        log.debug("REST request to get TripaB : {}", id);
        Optional<TripaB> tripaB = tripaBRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tripaB);
    }

    /**
     * {@code DELETE  /tripa-bs/:id} : delete the "id" tripaB.
     *
     * @param id the id of the tripaB to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tripa-bs/{id}")
    public ResponseEntity<Void> deleteTripaB(@PathVariable Long id) {
        log.debug("REST request to delete TripaB : {}", id);
        tripaBRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
