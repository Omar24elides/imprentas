package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TintaPortada;
import com.mycompany.myapp.service.TintaPortadaService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.TintaPortadaCriteria;
import com.mycompany.myapp.service.TintaPortadaQueryService;

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
 * REST controller for managing {@link com.mycompany.myapp.domain.TintaPortada}.
 */
@RestController
@RequestMapping("/api")
public class TintaPortadaResource {

    private final Logger log = LoggerFactory.getLogger(TintaPortadaResource.class);

    private static final String ENTITY_NAME = "tintaPortada";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TintaPortadaService tintaPortadaService;

    private final TintaPortadaQueryService tintaPortadaQueryService;

    public TintaPortadaResource(TintaPortadaService tintaPortadaService, TintaPortadaQueryService tintaPortadaQueryService) {
        this.tintaPortadaService = tintaPortadaService;
        this.tintaPortadaQueryService = tintaPortadaQueryService;
    }

    /**
     * {@code POST  /tinta-portadas} : Create a new tintaPortada.
     *
     * @param tintaPortada the tintaPortada to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tintaPortada, or with status {@code 400 (Bad Request)} if the tintaPortada has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tinta-portadas")
    public ResponseEntity<TintaPortada> createTintaPortada(@RequestBody TintaPortada tintaPortada) throws URISyntaxException {
        log.debug("REST request to save TintaPortada : {}", tintaPortada);
        if (tintaPortada.getId() != null) {
            throw new BadRequestAlertException("A new tintaPortada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TintaPortada result = tintaPortadaService.save(tintaPortada);
        return ResponseEntity.created(new URI("/api/tinta-portadas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tinta-portadas} : Updates an existing tintaPortada.
     *
     * @param tintaPortada the tintaPortada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tintaPortada,
     * or with status {@code 400 (Bad Request)} if the tintaPortada is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tintaPortada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tinta-portadas")
    public ResponseEntity<TintaPortada> updateTintaPortada(@RequestBody TintaPortada tintaPortada) throws URISyntaxException {
        log.debug("REST request to update TintaPortada : {}", tintaPortada);
        if (tintaPortada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TintaPortada result = tintaPortadaService.save(tintaPortada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tintaPortada.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tinta-portadas} : get all the tintaPortadas.
     *

     * @param pageable the pagination information.

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tintaPortadas in body.
     */
    @GetMapping("/tinta-portadas")
    public ResponseEntity<List<TintaPortada>> getAllTintaPortadas(TintaPortadaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get TintaPortadas by criteria: {}", criteria);
        Page<TintaPortada> page = tintaPortadaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * {@code GET  /tinta-portadas/count} : count all the tintaPortadas.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/tinta-portadas/count")
    public ResponseEntity<Long> countTintaPortadas(TintaPortadaCriteria criteria) {
        log.debug("REST request to count TintaPortadas by criteria: {}", criteria);
        return ResponseEntity.ok().body(tintaPortadaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tinta-portadas/:id} : get the "id" tintaPortada.
     *
     * @param id the id of the tintaPortada to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tintaPortada, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tinta-portadas/{id}")
    public ResponseEntity<TintaPortada> getTintaPortada(@PathVariable Long id) {
        log.debug("REST request to get TintaPortada : {}", id);
        Optional<TintaPortada> tintaPortada = tintaPortadaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tintaPortada);
    }

    /**
     * {@code DELETE  /tinta-portadas/:id} : delete the "id" tintaPortada.
     *
     * @param id the id of the tintaPortada to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tinta-portadas/{id}")
    public ResponseEntity<Void> deleteTintaPortada(@PathVariable Long id) {
        log.debug("REST request to delete TintaPortada : {}", id);
        tintaPortadaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
