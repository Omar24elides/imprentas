package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TintaOtroFormato;
import com.mycompany.myapp.repository.TintaOtroFormatoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TintaOtroFormato}.
 */
@Service
@Transactional
public class TintaOtroFormatoService {

    private final Logger log = LoggerFactory.getLogger(TintaOtroFormatoService.class);

    private final TintaOtroFormatoRepository tintaOtroFormatoRepository;

    public TintaOtroFormatoService(TintaOtroFormatoRepository tintaOtroFormatoRepository) {
        this.tintaOtroFormatoRepository = tintaOtroFormatoRepository;
    }

    /**
     * Save a tintaOtroFormato.
     *
     * @param tintaOtroFormato the entity to save.
     * @return the persisted entity.
     */
    public TintaOtroFormato save(TintaOtroFormato tintaOtroFormato) {
        log.debug("Request to save TintaOtroFormato : {}", tintaOtroFormato);
        return tintaOtroFormatoRepository.save(tintaOtroFormato);
    }

    /**
     * Get all the tintaOtroFormatoes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<TintaOtroFormato> findAll(Pageable pageable) {
        log.debug("Request to get all TintaOtroFormatoes");
        return tintaOtroFormatoRepository.findAll(pageable);
    }


    /**
     * Get one tintaOtroFormato by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TintaOtroFormato> findOne(Long id) {
        log.debug("Request to get TintaOtroFormato : {}", id);
        return tintaOtroFormatoRepository.findById(id);
    }

    /**
     * Delete the tintaOtroFormato by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TintaOtroFormato : {}", id);
        tintaOtroFormatoRepository.deleteById(id);
    }
}
