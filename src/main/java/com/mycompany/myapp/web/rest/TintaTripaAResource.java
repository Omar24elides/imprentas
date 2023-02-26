package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TintaTripaA;
import com.mycompany.myapp.service.TintaTripaAService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.TintaTripaACriteria;
import com.mycompany.myapp.service.TintaTripaAQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.TintaTripaA}.
 */
@RestController
@RequestMapping("/api")
public class TintaTripaAResource {

    private final Logger log = LoggerFactory.getLogger(TintaTripaAResource.class);

    private static final String ENTITY_NAME = "tintaTripaA";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TintaTripaAService tintaTripaAService;

    private final TintaTripaAQueryService tintaTripaAQueryService;

    public TintaTripaAResource(TintaTripaAService tintaTripaAService, TintaTripaAQueryService tintaTripaAQueryService) {
        this.tintaTripaAService = tintaTripaAService;
        this.tintaTripaAQueryService = tintaTripaAQueryService;
    }

    /**
     * {@code POST  /tinta-tripa-as} : Create a new tintaTripaA.
     *
     * @param tintaTripaA the tintaTripaA to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tintaTripaA, or with status {@code 400 (Bad Request)} if the tintaTripaA has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tinta-tripa-as")
    public ResponseEntity<TintaTripaA> createTintaTripaA(@RequestBody TintaTripaA tintaTripaA) throws URISyntaxException {
        log.debug("REST request to save TintaTripaA : {}", tintaTripaA);
        if (tintaTripaA.getId() != null) {
            throw new BadRequestAlertException("A new tintaTripaA cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TintaTripaA result = tintaTripaAService.save(tintaTripaA);
        return ResponseEntity.created(new URI("/api/tinta-tripa-as/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tinta-tripa-as} : Updates an existing tintaTripaA.
     *
     * @param tintaTripaA the tintaTripaA to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tintaTripaA,
     * or with status {@code 400 (Bad Request)} if the tintaTripaA is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tintaTripaA couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tinta-tripa-as")
    public ResponseEntity<TintaTripaA> updateTintaTripaA(@RequestBody TintaTripaA tintaTripaA) throws URISyntaxException {
        log.debug("REST request to update TintaTripaA : {}", tintaTripaA);
        if (tintaTripaA.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TintaTripaA result = tintaTripaAService.save(tintaTripaA);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tintaTripaA.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tinta-tripa-as} : get all the tintaTripaAS.
     *

     * @param pageable the pagination information.

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tintaTripaAS in body.
     */
    @GetMapping("/tinta-tripa-as")
    public ResponseEntity<List<TintaTripaA>> getAllTintaTripaAS(TintaTripaACriteria criteria, Pageable pageable) {
        log.debug("REST request to get TintaTripaAS by criteria: {}", criteria);
        Page<TintaTripaA> page = tintaTripaAQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * {@code GET  /tinta-tripa-as/count} : count all the tintaTripaAS.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/tinta-tripa-as/count")
    public ResponseEntity<Long> countTintaTripaAS(TintaTripaACriteria criteria) {
        log.debug("REST request to count TintaTripaAS by criteria: {}", criteria);
        return ResponseEntity.ok().body(tintaTripaAQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tinta-tripa-as/:id} : get the "id" tintaTripaA.
     *
     * @param id the id of the tintaTripaA to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tintaTripaA, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tinta-tripa-as/{id}")
    public ResponseEntity<TintaTripaA> getTintaTripaA(@PathVariable Long id) {
        log.debug("REST request to get TintaTripaA : {}", id);
        Optional<TintaTripaA> tintaTripaA = tintaTripaAService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tintaTripaA);
    }

    /**
     * {@code DELETE  /tinta-tripa-as/:id} : delete the "id" tintaTripaA.
     *
     * @param id the id of the tintaTripaA to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tinta-tripa-as/{id}")
    public ResponseEntity<Void> deleteTintaTripaA(@PathVariable Long id) {
        log.debug("REST request to delete TintaTripaA : {}", id);
        tintaTripaAService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
