package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TintaTripaB;
import com.mycompany.myapp.service.TintaTripaBService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.TintaTripaBCriteria;
import com.mycompany.myapp.service.TintaTripaBQueryService;

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
 * REST controller for managing {@link com.mycompany.myapp.domain.TintaTripaB}.
 */
@RestController
@RequestMapping("/api")
public class TintaTripaBResource {

    private final Logger log = LoggerFactory.getLogger(TintaTripaBResource.class);

    private static final String ENTITY_NAME = "tintaTripaB";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TintaTripaBService tintaTripaBService;

    private final TintaTripaBQueryService tintaTripaBQueryService;

    public TintaTripaBResource(TintaTripaBService tintaTripaBService, TintaTripaBQueryService tintaTripaBQueryService) {
        this.tintaTripaBService = tintaTripaBService;
        this.tintaTripaBQueryService = tintaTripaBQueryService;
    }

    /**
     * {@code POST  /tinta-tripa-bs} : Create a new tintaTripaB.
     *
     * @param tintaTripaB the tintaTripaB to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tintaTripaB, or with status {@code 400 (Bad Request)} if the tintaTripaB has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tinta-tripa-bs")
    public ResponseEntity<TintaTripaB> createTintaTripaB(@RequestBody TintaTripaB tintaTripaB) throws URISyntaxException {
        log.debug("REST request to save TintaTripaB : {}", tintaTripaB);
        if (tintaTripaB.getId() != null) {
            throw new BadRequestAlertException("A new tintaTripaB cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TintaTripaB result = tintaTripaBService.save(tintaTripaB);
        return ResponseEntity.created(new URI("/api/tinta-tripa-bs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tinta-tripa-bs} : Updates an existing tintaTripaB.
     *
     * @param tintaTripaB the tintaTripaB to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tintaTripaB,
     * or with status {@code 400 (Bad Request)} if the tintaTripaB is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tintaTripaB couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tinta-tripa-bs")
    public ResponseEntity<TintaTripaB> updateTintaTripaB(@RequestBody TintaTripaB tintaTripaB) throws URISyntaxException {
        log.debug("REST request to update TintaTripaB : {}", tintaTripaB);
        if (tintaTripaB.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TintaTripaB result = tintaTripaBService.save(tintaTripaB);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tintaTripaB.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tinta-tripa-bs} : get all the tintaTripaBS.
     *

     * @param pageable the pagination information.

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tintaTripaBS in body.
     */
    @GetMapping("/tinta-tripa-bs")
    public ResponseEntity<List<TintaTripaB>> getAllTintaTripaBS(TintaTripaBCriteria criteria, Pageable pageable) {
        log.debug("REST request to get TintaTripaBS by criteria: {}", criteria);
        Page<TintaTripaB> page = tintaTripaBQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * {@code GET  /tinta-tripa-bs/count} : count all the tintaTripaBS.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/tinta-tripa-bs/count")
    public ResponseEntity<Long> countTintaTripaBS(TintaTripaBCriteria criteria) {
        log.debug("REST request to count TintaTripaBS by criteria: {}", criteria);
        return ResponseEntity.ok().body(tintaTripaBQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tinta-tripa-bs/:id} : get the "id" tintaTripaB.
     *
     * @param id the id of the tintaTripaB to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tintaTripaB, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tinta-tripa-bs/{id}")
    public ResponseEntity<TintaTripaB> getTintaTripaB(@PathVariable Long id) {
        log.debug("REST request to get TintaTripaB : {}", id);
        Optional<TintaTripaB> tintaTripaB = tintaTripaBService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tintaTripaB);
    }

    /**
     * {@code DELETE  /tinta-tripa-bs/:id} : delete the "id" tintaTripaB.
     *
     * @param id the id of the tintaTripaB to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tinta-tripa-bs/{id}")
    public ResponseEntity<Void> deleteTintaTripaB(@PathVariable Long id) {
        log.debug("REST request to delete TintaTripaB : {}", id);
        tintaTripaBService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
