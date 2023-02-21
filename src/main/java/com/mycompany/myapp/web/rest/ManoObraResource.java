package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ManoObra;
import com.mycompany.myapp.repository.ManoObraRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ManoObra}.
 */
@RestController
@RequestMapping("/api")
public class ManoObraResource {

    private final Logger log = LoggerFactory.getLogger(ManoObraResource.class);

    private static final String ENTITY_NAME = "manoObra";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ManoObraRepository manoObraRepository;

    public ManoObraResource(ManoObraRepository manoObraRepository) {
        this.manoObraRepository = manoObraRepository;
    }

    /**
     * {@code POST  /mano-obras} : Create a new manoObra.
     *
     * @param manoObra the manoObra to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new manoObra, or with status {@code 400 (Bad Request)} if the manoObra has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mano-obras")
    public ResponseEntity<ManoObra> createManoObra(@RequestBody ManoObra manoObra) throws URISyntaxException {
        log.debug("REST request to save ManoObra : {}", manoObra);
        if (manoObra.getId() != null) {
            throw new BadRequestAlertException("A new manoObra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ManoObra result = manoObraRepository.save(manoObra);
        return ResponseEntity.created(new URI("/api/mano-obras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mano-obras} : Updates an existing manoObra.
     *
     * @param manoObra the manoObra to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated manoObra,
     * or with status {@code 400 (Bad Request)} if the manoObra is not valid,
     * or with status {@code 500 (Internal Server Error)} if the manoObra couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mano-obras")
    public ResponseEntity<ManoObra> updateManoObra(@RequestBody ManoObra manoObra) throws URISyntaxException {
        log.debug("REST request to update ManoObra : {}", manoObra);
        if (manoObra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ManoObra result = manoObraRepository.save(manoObra);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, manoObra.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /mano-obras} : get all the manoObras.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of manoObras in body.
     */
    @GetMapping("/mano-obras")
    public List<ManoObra> getAllManoObras() {
        log.debug("REST request to get all ManoObras");
        return manoObraRepository.findAll();
    }

    /**
     * {@code GET  /mano-obras/:id} : get the "id" manoObra.
     *
     * @param id the id of the manoObra to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the manoObra, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mano-obras/{id}")
    public ResponseEntity<ManoObra> getManoObra(@PathVariable Long id) {
        log.debug("REST request to get ManoObra : {}", id);
        Optional<ManoObra> manoObra = manoObraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(manoObra);
    }

    /**
     * {@code DELETE  /mano-obras/:id} : delete the "id" manoObra.
     *
     * @param id the id of the manoObra to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mano-obras/{id}")
    public ResponseEntity<Void> deleteManoObra(@PathVariable Long id) {
        log.debug("REST request to delete ManoObra : {}", id);
        manoObraRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
