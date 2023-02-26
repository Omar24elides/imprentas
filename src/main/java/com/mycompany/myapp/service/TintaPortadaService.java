package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TintaPortada;
import com.mycompany.myapp.repository.TintaPortadaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TintaPortada}.
 */
@Service
@Transactional
public class TintaPortadaService {

    private final Logger log = LoggerFactory.getLogger(TintaPortadaService.class);

    private final TintaPortadaRepository tintaPortadaRepository;

    public TintaPortadaService(TintaPortadaRepository tintaPortadaRepository) {
        this.tintaPortadaRepository = tintaPortadaRepository;
    }

    /**
     * Save a tintaPortada.
     *
     * @param tintaPortada the entity to save.
     * @return the persisted entity.
     */
    public TintaPortada save(TintaPortada tintaPortada) {
        log.debug("Request to save TintaPortada : {}", tintaPortada);
        return tintaPortadaRepository.save(tintaPortada);
    }

    /**
     * Get all the tintaPortadas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<TintaPortada> findAll(Pageable pageable) {
        log.debug("Request to get all TintaPortadas");
        return tintaPortadaRepository.findAll(pageable);
    }


    /**
     * Get one tintaPortada by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TintaPortada> findOne(Long id) {
        log.debug("Request to get TintaPortada : {}", id);
        return tintaPortadaRepository.findById(id);
    }

    /**
     * Delete the tintaPortada by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TintaPortada : {}", id);
        tintaPortadaRepository.deleteById(id);
    }
}
