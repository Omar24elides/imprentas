package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Papel;
import com.mycompany.myapp.service.PapelService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.PapelCriteria;
import com.mycompany.myapp.service.PapelQueryService;

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
 * REST controller for managing {@link com.mycompany.myapp.domain.Papel}.
 */
@RestController
@RequestMapping("/api")
public class PapelResource {

    private final Logger log = LoggerFactory.getLogger(PapelResource.class);

    private static final String ENTITY_NAME = "papel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PapelService papelService;

    private final PapelQueryService papelQueryService;

    public PapelResource(PapelService papelService, PapelQueryService papelQueryService) {
        this.papelService = papelService;
        this.papelQueryService = papelQueryService;
    }

    /**
     * {@code POST  /papels} : Create a new papel.
     *
     * @param papel the papel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new papel, or with status {@code 400 (Bad Request)} if the papel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/papels")
    public ResponseEntity<Papel> createPapel(@RequestBody Papel papel) throws URISyntaxException {
        log.debug("REST request to save Papel : {}", papel);
        if (papel.getId() != null) {
            throw new BadRequestAlertException("A new papel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Papel result = papelService.save(papel);
        return ResponseEntity.created(new URI("/api/papels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /papels} : Updates an existing papel.
     *
     * @param papel the papel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated papel,
     * or with status {@code 400 (Bad Request)} if the papel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the papel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/papels")
    public ResponseEntity<Papel> updatePapel(@RequestBody Papel papel) throws URISyntaxException {
        log.debug("REST request to update Papel : {}", papel);
        if (papel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Papel result = papelService.save(papel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, papel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /papels} : get all the papels.
     *

     * @param pageable the pagination information.

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of papels in body.
     */
    @GetMapping("/papels")
    public ResponseEntity<List<Papel>> getAllPapels(PapelCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Papels by criteria: {}", criteria);
        Page<Papel> page = papelQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * {@code GET  /papels/count} : count all the papels.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/papels/count")
    public ResponseEntity<Long> countPapels(PapelCriteria criteria) {
        log.debug("REST request to count Papels by criteria: {}", criteria);
        return ResponseEntity.ok().body(papelQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /papels/:id} : get the "id" papel.
     *
     * @param id the id of the papel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the papel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/papels/{id}")
    public ResponseEntity<Papel> getPapel(@PathVariable Long id) {
        log.debug("REST request to get Papel : {}", id);
        Optional<Papel> papel = papelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(papel);
    }

    /**
     * {@code DELETE  /papels/:id} : delete the "id" papel.
     *
     * @param id the id of the papel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/papels/{id}")
    public ResponseEntity<Void> deletePapel(@PathVariable Long id) {
        log.debug("REST request to delete Papel : {}", id);
        papelService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
