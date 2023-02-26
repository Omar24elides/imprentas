package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Plancha;
import com.mycompany.myapp.repository.PlanchaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Plancha}.
 */
@Service
@Transactional
public class PlanchaService {

    private final Logger log = LoggerFactory.getLogger(PlanchaService.class);

    private final PlanchaRepository planchaRepository;

    public PlanchaService(PlanchaRepository planchaRepository) {
        this.planchaRepository = planchaRepository;
    }

    /**
     * Save a plancha.
     *
     * @param plancha the entity to save.
     * @return the persisted entity.
     */
    public Plancha save(Plancha plancha) {
        log.debug("Request to save Plancha : {}", plancha);
        return planchaRepository.save(plancha);
    }

    /**
     * Get all the planchas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Plancha> findAll(Pageable pageable) {
        log.debug("Request to get all Planchas");
        return planchaRepository.findAll(pageable);
    }


    /**
     * Get one plancha by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Plancha> findOne(Long id) {
        log.debug("Request to get Plancha : {}", id);
        return planchaRepository.findById(id);
    }

    /**
     * Delete the plancha by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Plancha : {}", id);
        planchaRepository.deleteById(id);
    }
}
