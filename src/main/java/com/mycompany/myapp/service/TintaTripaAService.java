package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TintaTripaA;
import com.mycompany.myapp.repository.TintaTripaARepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TintaTripaA}.
 */
@Service
@Transactional
public class TintaTripaAService {

    private final Logger log = LoggerFactory.getLogger(TintaTripaAService.class);

    private final TintaTripaARepository tintaTripaARepository;

    public TintaTripaAService(TintaTripaARepository tintaTripaARepository) {
        this.tintaTripaARepository = tintaTripaARepository;
    }

    /**
     * Save a tintaTripaA.
     *
     * @param tintaTripaA the entity to save.
     * @return the persisted entity.
     */
    public TintaTripaA save(TintaTripaA tintaTripaA) {
        log.debug("Request to save TintaTripaA : {}", tintaTripaA);
        return tintaTripaARepository.save(tintaTripaA);
    }

    /**
     * Get all the tintaTripaAS.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<TintaTripaA> findAll(Pageable pageable) {
        log.debug("Request to get all TintaTripaAS");
        return tintaTripaARepository.findAll(pageable);
    }


    /**
     * Get one tintaTripaA by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TintaTripaA> findOne(Long id) {
        log.debug("Request to get TintaTripaA : {}", id);
        return tintaTripaARepository.findById(id);
    }

    /**
     * Delete the tintaTripaA by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TintaTripaA : {}", id);
        tintaTripaARepository.deleteById(id);
    }
}
