package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TintaTripaB;
import com.mycompany.myapp.repository.TintaTripaBRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TintaTripaB}.
 */
@Service
@Transactional
public class TintaTripaBService {

    private final Logger log = LoggerFactory.getLogger(TintaTripaBService.class);

    private final TintaTripaBRepository tintaTripaBRepository;

    public TintaTripaBService(TintaTripaBRepository tintaTripaBRepository) {
        this.tintaTripaBRepository = tintaTripaBRepository;
    }

    /**
     * Save a tintaTripaB.
     *
     * @param tintaTripaB the entity to save.
     * @return the persisted entity.
     */
    public TintaTripaB save(TintaTripaB tintaTripaB) {
        log.debug("Request to save TintaTripaB : {}", tintaTripaB);
        return tintaTripaBRepository.save(tintaTripaB);
    }

    /**
     * Get all the tintaTripaBS.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<TintaTripaB> findAll(Pageable pageable) {
        log.debug("Request to get all TintaTripaBS");
        return tintaTripaBRepository.findAll(pageable);
    }


    /**
     * Get one tintaTripaB by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TintaTripaB> findOne(Long id) {
        log.debug("Request to get TintaTripaB : {}", id);
        return tintaTripaBRepository.findById(id);
    }

    /**
     * Delete the tintaTripaB by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TintaTripaB : {}", id);
        tintaTripaBRepository.deleteById(id);
    }
}
