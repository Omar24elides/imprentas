package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CostosIndirectos;
import com.mycompany.myapp.repository.CostosIndirectosRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.CostosIndirectos}.
 */
@RestController
@RequestMapping("/api")
public class CostosIndirectosResource {

    private final Logger log = LoggerFactory.getLogger(CostosIndirectosResource.class);

    private static final String ENTITY_NAME = "costosIndirectos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CostosIndirectosRepository costosIndirectosRepository;

    public CostosIndirectosResource(CostosIndirectosRepository costosIndirectosRepository) {
        this.costosIndirectosRepository = costosIndirectosRepository;
    }

    /**
     * {@code POST  /costos-indirectos} : Create a new costosIndirectos.
     *
     * @param costosIndirectos the costosIndirectos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new costosIndirectos, or with status {@code 400 (Bad Request)} if the costosIndirectos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/costos-indirectos")
    public ResponseEntity<CostosIndirectos> createCostosIndirectos(@RequestBody CostosIndirectos costosIndirectos) throws URISyntaxException {
        log.debug("REST request to save CostosIndirectos : {}", costosIndirectos);
        if (costosIndirectos.getId() != null) {
            throw new BadRequestAlertException("A new costosIndirectos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CostosIndirectos result = costosIndirectosRepository.save(costosIndirectos);
        return ResponseEntity.created(new URI("/api/costos-indirectos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /costos-indirectos} : Updates an existing costosIndirectos.
     *
     * @param costosIndirectos the costosIndirectos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated costosIndirectos,
     * or with status {@code 400 (Bad Request)} if the costosIndirectos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the costosIndirectos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/costos-indirectos")
    public ResponseEntity<CostosIndirectos> updateCostosIndirectos(@RequestBody CostosIndirectos costosIndirectos) throws URISyntaxException {
        log.debug("REST request to update CostosIndirectos : {}", costosIndirectos);
        if (costosIndirectos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CostosIndirectos result = costosIndirectosRepository.save(costosIndirectos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, costosIndirectos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /costos-indirectos} : get all the costosIndirectos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of costosIndirectos in body.
     */
    @GetMapping("/costos-indirectos")
    public List<CostosIndirectos> getAllCostosIndirectos() {
        log.debug("REST request to get all CostosIndirectos");
        return costosIndirectosRepository.findAll();
    }

    /**
     * {@code GET  /costos-indirectos/:id} : get the "id" costosIndirectos.
     *
     * @param id the id of the costosIndirectos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the costosIndirectos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/costos-indirectos/{id}")
    public ResponseEntity<CostosIndirectos> getCostosIndirectos(@PathVariable Long id) {
        log.debug("REST request to get CostosIndirectos : {}", id);
        Optional<CostosIndirectos> costosIndirectos = costosIndirectosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(costosIndirectos);
    }

    /**
     * {@code DELETE  /costos-indirectos/:id} : delete the "id" costosIndirectos.
     *
     * @param id the id of the costosIndirectos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/costos-indirectos/{id}")
    public ResponseEntity<Void> deleteCostosIndirectos(@PathVariable Long id) {
        log.debug("REST request to delete CostosIndirectos : {}", id);
        costosIndirectosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
