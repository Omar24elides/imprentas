package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TipoPapel;
import com.mycompany.myapp.repository.TipoPapelRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.TipoPapel}.
 */
@RestController
@RequestMapping("/api")
public class TipoPapelResource {

    private final Logger log = LoggerFactory.getLogger(TipoPapelResource.class);

    private static final String ENTITY_NAME = "tipoPapel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoPapelRepository tipoPapelRepository;

    public TipoPapelResource(TipoPapelRepository tipoPapelRepository) {
        this.tipoPapelRepository = tipoPapelRepository;
    }

    /**
     * {@code POST  /tipo-papels} : Create a new tipoPapel.
     *
     * @param tipoPapel the tipoPapel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoPapel, or with status {@code 400 (Bad Request)} if the tipoPapel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-papels")
    public ResponseEntity<TipoPapel> createTipoPapel(@RequestBody TipoPapel tipoPapel) throws URISyntaxException {
        log.debug("REST request to save TipoPapel : {}", tipoPapel);
        if (tipoPapel.getId() != null) {
            throw new BadRequestAlertException("A new tipoPapel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoPapel result = tipoPapelRepository.save(tipoPapel);
        return ResponseEntity.created(new URI("/api/tipo-papels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-papels} : Updates an existing tipoPapel.
     *
     * @param tipoPapel the tipoPapel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoPapel,
     * or with status {@code 400 (Bad Request)} if the tipoPapel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoPapel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-papels")
    public ResponseEntity<TipoPapel> updateTipoPapel(@RequestBody TipoPapel tipoPapel) throws URISyntaxException {
        log.debug("REST request to update TipoPapel : {}", tipoPapel);
        if (tipoPapel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoPapel result = tipoPapelRepository.save(tipoPapel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoPapel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-papels} : get all the tipoPapels.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoPapels in body.
     */
    @GetMapping("/tipo-papels")
    public List<TipoPapel> getAllTipoPapels() {
        log.debug("REST request to get all TipoPapels");
        return tipoPapelRepository.findAll();
    }

    /**
     * {@code GET  /tipo-papels/:id} : get the "id" tipoPapel.
     *
     * @param id the id of the tipoPapel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoPapel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-papels/{id}")
    public ResponseEntity<TipoPapel> getTipoPapel(@PathVariable Long id) {
        log.debug("REST request to get TipoPapel : {}", id);
        Optional<TipoPapel> tipoPapel = tipoPapelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoPapel);
    }

    /**
     * {@code DELETE  /tipo-papels/:id} : delete the "id" tipoPapel.
     *
     * @param id the id of the tipoPapel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-papels/{id}")
    public ResponseEntity<Void> deleteTipoPapel(@PathVariable Long id) {
        log.debug("REST request to delete TipoPapel : {}", id);
        tipoPapelRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
