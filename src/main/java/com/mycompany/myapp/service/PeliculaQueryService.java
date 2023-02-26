package com.mycompany.myapp.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.mycompany.myapp.domain.Pelicula;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.PeliculaRepository;
import com.mycompany.myapp.service.dto.PeliculaCriteria;

/**
 * Service for executing complex queries for {@link Pelicula} entities in the database.
 * The main input is a {@link PeliculaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Pelicula} or a {@link Page} of {@link Pelicula} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PeliculaQueryService extends QueryService<Pelicula> {

    private final Logger log = LoggerFactory.getLogger(PeliculaQueryService.class);

    private final PeliculaRepository peliculaRepository;

    public PeliculaQueryService(PeliculaRepository peliculaRepository) {
        this.peliculaRepository = peliculaRepository;
    }

    /**
     * Return a {@link List} of {@link Pelicula} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Pelicula> findByCriteria(PeliculaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Pelicula> specification = createSpecification(criteria);
        return peliculaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Pelicula} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Pelicula> findByCriteria(PeliculaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Pelicula> specification = createSpecification(criteria);
        return peliculaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PeliculaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Pelicula> specification = createSpecification(criteria);
        return peliculaRepository.count(specification);
    }

    /**
     * Function to convert {@link PeliculaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Pelicula> createSpecification(PeliculaCriteria criteria) {
        Specification<Pelicula> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Pelicula_.id));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Pelicula_.nombre));
            }
            if (criteria.getPrecio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPrecio(), Pelicula_.precio));
            }
        }
        return specification;
    }
}
