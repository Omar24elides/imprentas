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

import com.mycompany.myapp.domain.TintaOtroFormato;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.TintaOtroFormatoRepository;
import com.mycompany.myapp.service.dto.TintaOtroFormatoCriteria;

/**
 * Service for executing complex queries for {@link TintaOtroFormato} entities in the database.
 * The main input is a {@link TintaOtroFormatoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TintaOtroFormato} or a {@link Page} of {@link TintaOtroFormato} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TintaOtroFormatoQueryService extends QueryService<TintaOtroFormato> {

    private final Logger log = LoggerFactory.getLogger(TintaOtroFormatoQueryService.class);

    private final TintaOtroFormatoRepository tintaOtroFormatoRepository;

    public TintaOtroFormatoQueryService(TintaOtroFormatoRepository tintaOtroFormatoRepository) {
        this.tintaOtroFormatoRepository = tintaOtroFormatoRepository;
    }

    /**
     * Return a {@link List} of {@link TintaOtroFormato} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TintaOtroFormato> findByCriteria(TintaOtroFormatoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TintaOtroFormato> specification = createSpecification(criteria);
        return tintaOtroFormatoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TintaOtroFormato} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TintaOtroFormato> findByCriteria(TintaOtroFormatoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TintaOtroFormato> specification = createSpecification(criteria);
        return tintaOtroFormatoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TintaOtroFormatoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TintaOtroFormato> specification = createSpecification(criteria);
        return tintaOtroFormatoRepository.count(specification);
    }

    /**
     * Function to convert {@link TintaOtroFormatoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TintaOtroFormato> createSpecification(TintaOtroFormatoCriteria criteria) {
        Specification<TintaOtroFormato> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), TintaOtroFormato_.id));
            }
            if (criteria.getTintaId() != null) {
                specification = specification.and(buildSpecification(criteria.getTintaId(),
                    root -> root.join(TintaOtroFormato_.tinta, JoinType.LEFT).get(Tinta_.id)));
            }
            if (criteria.getOtroFormatoId() != null) {
                specification = specification.and(buildSpecification(criteria.getOtroFormatoId(),
                    root -> root.join(TintaOtroFormato_.otroFormato, JoinType.LEFT).get(OtroFormato_.id)));
            }
        }
        return specification;
    }
}
