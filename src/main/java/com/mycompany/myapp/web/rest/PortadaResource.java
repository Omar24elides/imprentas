package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Portada;
import com.mycompany.myapp.repository.PortadaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Portada}.
 */
@RestController
@RequestMapping("/api")
public class PortadaResource {

    private final Logger log = LoggerFactory.getLogger(PortadaResource.class);

    private static final String ENTITY_NAME = "portada";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PortadaRepository portadaRepository;

    public PortadaResource(PortadaRepository portadaRepository) {
        this.portadaRepository = portadaRepository;
    }

    /**
     * {@code POST  /portadas} : Create a new portada.
     *
     * @param portada the portada to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new portada, or with status {@code 400 (Bad Request)} if the portada has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/portadas")
    public ResponseEntity<Portada> createPortada(@RequestBody Portada portada) throws URISyntaxException {
        log.debug("REST request to save Portada : {}", portada);
        if (portada.getId() != null) {
            throw new BadRequestAlertException("A new portada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Portada result = portadaRepository.save(portada);
        return ResponseEntity.created(new URI("/api/portadas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /portadas} : Updates an existing portada.
     *
     * @param portada the portada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated portada,
     * or with status {@code 400 (Bad Request)} if the portada is not valid,
     * or with status {@code 500 (Internal Server Error)} if the portada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/portadas")
    public ResponseEntity<Portada> updatePortada(@RequestBody Portada portada) throws URISyntaxException {
        log.debug("REST request to update Portada : {}", portada);
        if (portada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Portada result = portadaRepository.save(portada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, portada.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /portadas} : get all the portadas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of portadas in body.
     */
    @GetMapping("/portadas")
    public List<Portada> getAllPortadas() {
        log.debug("REST request to get all Portadas");
        return portadaRepository.findAll();
    }

    /**
     * {@code GET  /portadas/:id} : get the "id" portada.
     *
     * @param id the id of the portada to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the portada, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/portadas/{id}")
    public ResponseEntity<Portada> getPortada(@PathVariable Long id) {
        log.debug("REST request to get Portada : {}", id);
        Optional<Portada> portada = portadaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(portada);
    }

    /**
     * {@code DELETE  /portadas/:id} : delete the "id" portada.
     *
     * @param id the id of the portada to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/portadas/{id}")
    public ResponseEntity<Void> deletePortada(@PathVariable Long id) {
        log.debug("REST request to delete Portada : {}", id);
        portadaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
