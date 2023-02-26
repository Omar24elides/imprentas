package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Papel;
import com.mycompany.myapp.repository.PapelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Papel}.
 */
@Service
@Transactional
public class PapelService {

    private final Logger log = LoggerFactory.getLogger(PapelService.class);

    private final PapelRepository papelRepository;

    public PapelService(PapelRepository papelRepository) {
        this.papelRepository = papelRepository;
    }

    /**
     * Save a papel.
     *
     * @param papel the entity to save.
     * @return the persisted entity.
     */
    public Papel save(Papel papel) {
        log.debug("Request to save Papel : {}", papel);
        return papelRepository.save(papel);
    }

    /**
     * Get all the papels.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Papel> findAll(Pageable pageable) {
        log.debug("Request to get all Papels");
        return papelRepository.findAll(pageable);
    }


    /**
     * Get one papel by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Papel> findOne(Long id) {
        log.debug("Request to get Papel : {}", id);
        return papelRepository.findById(id);
    }

    /**
     * Delete the papel by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Papel : {}", id);
        papelRepository.deleteById(id);
    }
}
