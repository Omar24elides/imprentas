package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Plancha;
import com.mycompany.myapp.service.PlanchaService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.PlanchaCriteria;
import com.mycompany.myapp.service.PlanchaQueryService;

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
 * REST controller for managing {@link com.mycompany.myapp.domain.Plancha}.
 */
@RestController
@RequestMapping("/api")
public class PlanchaResource {

    private final Logger log = LoggerFactory.getLogger(PlanchaResource.class);

    private static final String ENTITY_NAME = "plancha";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanchaService planchaService;

    private final PlanchaQueryService planchaQueryService;

    public PlanchaResource(PlanchaService planchaService, PlanchaQueryService planchaQueryService) {
        this.planchaService = planchaService;
        this.planchaQueryService = planchaQueryService;
    }

    /**
     * {@code POST  /planchas} : Create a new plancha.
     *
     * @param plancha the plancha to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new plancha, or with status {@code 400 (Bad Request)} if the plancha has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planchas")
    public ResponseEntity<Plancha> createPlancha(@RequestBody Plancha plancha) throws URISyntaxException {
        log.debug("REST request to save Plancha : {}", plancha);
        if (plancha.getId() != null) {
            throw new BadRequestAlertException("A new plancha cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Plancha result = planchaService.save(plancha);
        return ResponseEntity.created(new URI("/api/planchas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /planchas} : Updates an existing plancha.
     *
     * @param plancha the plancha to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plancha,
     * or with status {@code 400 (Bad Request)} if the plancha is not valid,
     * or with status {@code 500 (Internal Server Error)} if the plancha couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planchas")
    public ResponseEntity<Plancha> updatePlancha(@RequestBody Plancha plancha) throws URISyntaxException {
        log.debug("REST request to update Plancha : {}", plancha);
        if (plancha.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Plancha result = planchaService.save(plancha);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, plancha.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /planchas} : get all the planchas.
     *

     * @param pageable the pagination information.

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planchas in body.
     */
    @GetMapping("/planchas")
    public ResponseEntity<List<Plancha>> getAllPlanchas(PlanchaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Planchas by criteria: {}", criteria);
        Page<Plancha> page = planchaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * {@code GET  /planchas/count} : count all the planchas.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/planchas/count")
    public ResponseEntity<Long> countPlanchas(PlanchaCriteria criteria) {
        log.debug("REST request to count Planchas by criteria: {}", criteria);
        return ResponseEntity.ok().body(planchaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /planchas/:id} : get the "id" plancha.
     *
     * @param id the id of the plancha to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the plancha, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planchas/{id}")
    public ResponseEntity<Plancha> getPlancha(@PathVariable Long id) {
        log.debug("REST request to get Plancha : {}", id);
        Optional<Plancha> plancha = planchaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(plancha);
    }

    /**
     * {@code DELETE  /planchas/:id} : delete the "id" plancha.
     *
     * @param id the id of the plancha to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planchas/{id}")
    public ResponseEntity<Void> deletePlancha(@PathVariable Long id) {
        log.debug("REST request to delete Plancha : {}", id);
        planchaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
