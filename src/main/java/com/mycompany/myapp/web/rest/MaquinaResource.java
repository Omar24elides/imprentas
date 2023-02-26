package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Maquina;
import com.mycompany.myapp.repository.MaquinaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Maquina}.
 */
@RestController
@RequestMapping("/api")
public class MaquinaResource {

    private final Logger log = LoggerFactory.getLogger(MaquinaResource.class);

    private static final String ENTITY_NAME = "maquina";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaquinaRepository maquinaRepository;

    public MaquinaResource(MaquinaRepository maquinaRepository) {
        this.maquinaRepository = maquinaRepository;
    }

    /**
     * {@code POST  /maquinas} : Create a new maquina.
     *
     * @param maquina the maquina to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new maquina, or with status {@code 400 (Bad Request)} if the maquina has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/maquinas")
    public ResponseEntity<Maquina> createMaquina(@RequestBody Maquina maquina) throws URISyntaxException {
        log.debug("REST request to save Maquina : {}", maquina);
        if (maquina.getId() != null) {
            throw new BadRequestAlertException("A new maquina cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Maquina result = maquinaRepository.save(maquina);
        return ResponseEntity.created(new URI("/api/maquinas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /maquinas} : Updates an existing maquina.
     *
     * @param maquina the maquina to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated maquina,
     * or with status {@code 400 (Bad Request)} if the maquina is not valid,
     * or with status {@code 500 (Internal Server Error)} if the maquina couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/maquinas")
    public ResponseEntity<Maquina> updateMaquina(@RequestBody Maquina maquina) throws URISyntaxException {
        log.debug("REST request to update Maquina : {}", maquina);
        if (maquina.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Maquina result = maquinaRepository.save(maquina);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, maquina.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /maquinas} : get all the maquinas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of maquinas in body.
     */
    @GetMapping("/maquinas")
    public List<Maquina> getAllMaquinas() {
        log.debug("REST request to get all Maquinas");
        return maquinaRepository.findAll();
    }

    /**
     * {@code GET  /maquinas/:id} : get the "id" maquina.
     *
     * @param id the id of the maquina to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the maquina, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/maquinas/{id}")
    public ResponseEntity<Maquina> getMaquina(@PathVariable Long id) {
        log.debug("REST request to get Maquina : {}", id);
        Optional<Maquina> maquina = maquinaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(maquina);
    }

    /**
     * {@code DELETE  /maquinas/:id} : delete the "id" maquina.
     *
     * @param id the id of the maquina to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/maquinas/{id}")
    public ResponseEntity<Void> deleteMaquina(@PathVariable Long id) {
        log.debug("REST request to delete Maquina : {}", id);
        maquinaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
