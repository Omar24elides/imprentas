package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TripaA;
import com.mycompany.myapp.repository.TripaARepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.TripaA}.
 */
@RestController
@RequestMapping("/api")
public class TripaAResource {

    private final Logger log = LoggerFactory.getLogger(TripaAResource.class);

    private static final String ENTITY_NAME = "tripaA";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TripaARepository tripaARepository;

    public TripaAResource(TripaARepository tripaARepository) {
        this.tripaARepository = tripaARepository;
    }

    /**
     * {@code POST  /tripa-as} : Create a new tripaA.
     *
     * @param tripaA the tripaA to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tripaA, or with status {@code 400 (Bad Request)} if the tripaA has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tripa-as")
    public ResponseEntity<TripaA> createTripaA(@RequestBody TripaA tripaA) throws URISyntaxException {
        log.debug("REST request to save TripaA : {}", tripaA);
        if (tripaA.getId() != null) {
            throw new BadRequestAlertException("A new tripaA cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TripaA result = tripaARepository.save(tripaA);
        return ResponseEntity.created(new URI("/api/tripa-as/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tripa-as} : Updates an existing tripaA.
     *
     * @param tripaA the tripaA to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tripaA,
     * or with status {@code 400 (Bad Request)} if the tripaA is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tripaA couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tripa-as")
    public ResponseEntity<TripaA> updateTripaA(@RequestBody TripaA tripaA) throws URISyntaxException {
        log.debug("REST request to update TripaA : {}", tripaA);
        if (tripaA.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TripaA result = tripaARepository.save(tripaA);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tripaA.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tripa-as} : get all the tripaAS.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tripaAS in body.
     */
    @GetMapping("/tripa-as")
    public List<TripaA> getAllTripaAS() {
        log.debug("REST request to get all TripaAS");
        return tripaARepository.findAll();
    }

    /**
     * {@code GET  /tripa-as/:id} : get the "id" tripaA.
     *
     * @param id the id of the tripaA to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tripaA, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tripa-as/{id}")
    public ResponseEntity<TripaA> getTripaA(@PathVariable Long id) {
        log.debug("REST request to get TripaA : {}", id);
        Optional<TripaA> tripaA = tripaARepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tripaA);
    }

    /**
     * {@code DELETE  /tripa-as/:id} : delete the "id" tripaA.
     *
     * @param id the id of the tripaA to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tripa-as/{id}")
    public ResponseEntity<Void> deleteTripaA(@PathVariable Long id) {
        log.debug("REST request to delete TripaA : {}", id);
        tripaARepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
