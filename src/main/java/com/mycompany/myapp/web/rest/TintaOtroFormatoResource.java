package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TintaOtroFormato;
import com.mycompany.myapp.service.TintaOtroFormatoService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.TintaOtroFormatoCriteria;
import com.mycompany.myapp.service.TintaOtroFormatoQueryService;

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
 * REST controller for managing {@link com.mycompany.myapp.domain.TintaOtroFormato}.
 */
@RestController
@RequestMapping("/api")
public class TintaOtroFormatoResource {

    private final Logger log = LoggerFactory.getLogger(TintaOtroFormatoResource.class);

    private static final String ENTITY_NAME = "tintaOtroFormato";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TintaOtroFormatoService tintaOtroFormatoService;

    private final TintaOtroFormatoQueryService tintaOtroFormatoQueryService;

    public TintaOtroFormatoResource(TintaOtroFormatoService tintaOtroFormatoService, TintaOtroFormatoQueryService tintaOtroFormatoQueryService) {
        this.tintaOtroFormatoService = tintaOtroFormatoService;
        this.tintaOtroFormatoQueryService = tintaOtroFormatoQueryService;
    }

    /**
     * {@code POST  /tinta-otro-formatoes} : Create a new tintaOtroFormato.
     *
     * @param tintaOtroFormato the tintaOtroFormato to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tintaOtroFormato, or with status {@code 400 (Bad Request)} if the tintaOtroFormato has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tinta-otro-formatoes")
    public ResponseEntity<TintaOtroFormato> createTintaOtroFormato(@RequestBody TintaOtroFormato tintaOtroFormato) throws URISyntaxException {
        log.debug("REST request to save TintaOtroFormato : {}", tintaOtroFormato);
        if (tintaOtroFormato.getId() != null) {
            throw new BadRequestAlertException("A new tintaOtroFormato cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TintaOtroFormato result = tintaOtroFormatoService.save(tintaOtroFormato);
        return ResponseEntity.created(new URI("/api/tinta-otro-formatoes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tinta-otro-formatoes} : Updates an existing tintaOtroFormato.
     *
     * @param tintaOtroFormato the tintaOtroFormato to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tintaOtroFormato,
     * or with status {@code 400 (Bad Request)} if the tintaOtroFormato is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tintaOtroFormato couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tinta-otro-formatoes")
    public ResponseEntity<TintaOtroFormato> updateTintaOtroFormato(@RequestBody TintaOtroFormato tintaOtroFormato) throws URISyntaxException {
        log.debug("REST request to update TintaOtroFormato : {}", tintaOtroFormato);
        if (tintaOtroFormato.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TintaOtroFormato result = tintaOtroFormatoService.save(tintaOtroFormato);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tintaOtroFormato.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tinta-otro-formatoes} : get all the tintaOtroFormatoes.
     *

     * @param pageable the pagination information.

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tintaOtroFormatoes in body.
     */
    @GetMapping("/tinta-otro-formatoes")
    public ResponseEntity<List<TintaOtroFormato>> getAllTintaOtroFormatoes(TintaOtroFormatoCriteria criteria, Pageable pageable) {
        log.debug("REST request to get TintaOtroFormatoes by criteria: {}", criteria);
        Page<TintaOtroFormato> page = tintaOtroFormatoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * {@code GET  /tinta-otro-formatoes/count} : count all the tintaOtroFormatoes.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/tinta-otro-formatoes/count")
    public ResponseEntity<Long> countTintaOtroFormatoes(TintaOtroFormatoCriteria criteria) {
        log.debug("REST request to count TintaOtroFormatoes by criteria: {}", criteria);
        return ResponseEntity.ok().body(tintaOtroFormatoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tinta-otro-formatoes/:id} : get the "id" tintaOtroFormato.
     *
     * @param id the id of the tintaOtroFormato to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tintaOtroFormato, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tinta-otro-formatoes/{id}")
    public ResponseEntity<TintaOtroFormato> getTintaOtroFormato(@PathVariable Long id) {
        log.debug("REST request to get TintaOtroFormato : {}", id);
        Optional<TintaOtroFormato> tintaOtroFormato = tintaOtroFormatoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tintaOtroFormato);
    }

    /**
     * {@code DELETE  /tinta-otro-formatoes/:id} : delete the "id" tintaOtroFormato.
     *
     * @param id the id of the tintaOtroFormato to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tinta-otro-formatoes/{id}")
    public ResponseEntity<Void> deleteTintaOtroFormato(@PathVariable Long id) {
        log.debug("REST request to delete TintaOtroFormato : {}", id);
        tintaOtroFormatoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
