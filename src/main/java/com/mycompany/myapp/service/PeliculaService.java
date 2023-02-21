package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Pelicula;
import com.mycompany.myapp.repository.PeliculaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Pelicula}.
 */
@Service
@Transactional
public class PeliculaService {

    private final Logger log = LoggerFactory.getLogger(PeliculaService.class);

    private final PeliculaRepository peliculaRepository;

    public PeliculaService(PeliculaRepository peliculaRepository) {
        this.peliculaRepository = peliculaRepository;
    }

    /**
     * Save a pelicula.
     *
     * @param pelicula the entity to save.
     * @return the persisted entity.
     */
    public Pelicula save(Pelicula pelicula) {
        log.debug("Request to save Pelicula : {}", pelicula);
        return peliculaRepository.save(pelicula);
    }

    /**
     * Get all the peliculas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Pelicula> findAll(Pageable pageable) {
        log.debug("Request to get all Peliculas");
        return peliculaRepository.findAll(pageable);
    }


    /**
     * Get one pelicula by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Pelicula> findOne(Long id) {
        log.debug("Request to get Pelicula : {}", id);
        return peliculaRepository.findById(id);
    }

    /**
     * Delete the pelicula by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Pelicula : {}", id);
        peliculaRepository.deleteById(id);
    }
}
