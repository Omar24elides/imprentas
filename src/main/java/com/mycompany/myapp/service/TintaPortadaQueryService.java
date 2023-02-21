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

import com.mycompany.myapp.domain.TintaPortada;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.TintaPortadaRepository;
import com.mycompany.myapp.service.dto.TintaPortadaCriteria;

/**
 * Service for executing complex queries for {@link TintaPortada} entities in the database.
 * The main input is a {@link TintaPortadaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TintaPortada} or a {@link Page} of {@link TintaPortada} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TintaPortadaQueryService extends QueryService<TintaPortada> {

    private final Logger log = LoggerFactory.getLogger(TintaPortadaQueryService.class);

    private final TintaPortadaRepository tintaPortadaRepository;

    public TintaPortadaQueryService(TintaPortadaRepository tintaPortadaRepository) {
        this.tintaPortadaRepository = tintaPortadaRepository;
    }

    /**
     * Return a {@link List} of {@link TintaPortada} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TintaPortada> findByCriteria(TintaPortadaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TintaPortada> specification = createSpecification(criteria);
        return tintaPortadaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TintaPortada} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TintaPortada> findByCriteria(TintaPortadaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TintaPortada> specification = createSpecification(criteria);
        return tintaPortadaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TintaPortadaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TintaPortada> specification = createSpecification(criteria);
        return tintaPortadaRepository.count(specification);
    }

    /**
     * Function to convert {@link TintaPortadaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TintaPortada> createSpecification(TintaPortadaCriteria criteria) {
        Specification<TintaPortada> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), TintaPortada_.id));
            }
            if (criteria.getTintaId() != null) {
                specification = specification.and(buildSpecification(criteria.getTintaId(),
                    root -> root.join(TintaPortada_.tinta, JoinType.LEFT).get(Tinta_.id)));
            }
            if (criteria.getPortadaId() != null) {
                specification = specification.and(buildSpecification(criteria.getPortadaId(),
                    root -> root.join(TintaPortada_.portada, JoinType.LEFT).get(Portada_.id)));
            }
        }
        return specification;
    }
}
